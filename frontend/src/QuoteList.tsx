import { useEffect, useState } from "react";
import Quote from './components/Quote';
import { RawQuoteType, QuoteType } from './model/mongoTypes';
import { sendRequest } from "./UseAxios";
import { Container, Row, Col, FormSelect, FormControl } from "react-bootstrap";
import './QuoteList.css';

const QuoteList = () => {
    const [quotes, setQuotes] = useState<QuoteType[]>([]);
    const [displayQuotes, setDisplayQuotes] = useState<QuoteType[]>(quotes);
    const [authors, setAuthors] = useState<string[]>([]);
    const [searchFilter, setSearchFilter] = useState<string>('');
    const [authorFilter, setAuthorFilter] = useState<string>('all');
    const [attachmentFilter, setAttachmentFilter] = useState<string>('any');
    const [fromFilter, setFromFilter] = useState<string>('');
    const [toFilter, setToFilter] = useState<string>('');
    const [sortBy, setSortBy] = useState<string>('');

    useEffect(() => console.log(fromFilter), [fromFilter]);
    useEffect(() => console.log(toFilter), [toFilter]);

    const debugPrintAttachments = (quotes: QuoteType[]) => {
        for (var quote of quotes)
            if (quote.attachments.length > 0)
                console.log(quote);
    };

    useEffect(() => {
        sendRequest<RawQuoteType[]>({
            method: 'get',
            url: '/api/getQuoteList',
        }, (response) => {
            console.log('received quote list data');
            // console.log(response.data);
            // debugPrintAttachments(response.data);
            var betterData = scrubData(response.data);

            setQuotes(betterData);
            console.log('finished mapping data');
        });
    }, []);

    const applySearchFilter = (qs: QuoteType[]): QuoteType[] => {
        if (searchFilter === '') return qs;
        return qs.filter(q => q.content.toLowerCase().includes(searchFilter.toLowerCase()));
    };

    const applyAuthorFilter = (qs: QuoteType[]): QuoteType[] => {
        if (authorFilter === 'all') return qs;
        return qs.filter(q => q.author.username.toLowerCase() === authorFilter);
    };

    const applyAttachmentFilter = (qs: QuoteType[]): QuoteType[] => {
        switch (attachmentFilter) {
            case 'none':
                return qs.filter(q => q.attachments.length === 0);
            case 'image':
                return qs.filter(q => {
                    return ['.jpg', '.jpeg', '.png', '.gif', 'apng', 'avif', 'webp'].some(format => {
                        return q.attachments.some(attachment => attachment.url.includes(format));
                    });
                });
            case 'video':
                return qs.filter(q => {
                    return ['.mp4', '.mov', '.webm', '.ogg'].some(format => {
                        return q.attachments.some(attachment => attachment.url.includes(format));
                    });
                });
            case 'audio':
                return qs.filter(q => {
                    return ['.mp3', '.ogg', '.wav'].some(format => {
                        return q.attachments.some(attachment => attachment.url.includes(format));
                    });
                });
            default:
                return qs;
        }
    };

    const applyFromFilter = (qs: QuoteType[]): QuoteType[] => {
        if (!fromFilter) return qs;
        return qs.filter(q => q.timestamp >= new Date(fromFilter));
    };
    
    const applyToFilter = (qs: QuoteType[]): QuoteType[] => {
        if (!toFilter) return qs;
        // add one to filter for end of selected day
        const toDate = new Date(toFilter);
        toDate.setDate(toDate.getDate() + 1);
        return qs.filter(q => q.timestamp <= toDate);
    };

    const applySortBy = (qs: QuoteType[]): QuoteType[] => {
        switch (sortBy) {
            case 'date':
                return Array<QuoteType>().concat(qs).sort((a, b) => {
                    return a.timestamp.getTime() - b.timestamp.getTime();
                });
            case 'author':
                return Array<QuoteType>().concat(qs).sort((a, b) => {
                    return a.author.username.toLowerCase().localeCompare(b.author.username.toLowerCase());
                });
            default:
                return qs;
        }
    };

    const applyAllFiltersSort = () => {
        const quotesCopy = new Array().concat(quotes);
        const filteredSortedQuotes = 
            applySortBy(
            applySearchFilter(
            applyAuthorFilter(
            applyAttachmentFilter(
            applyFromFilter(
            applyToFilter(
                quotesCopy
            ))))));
        setDisplayQuotes(filteredSortedQuotes);
    };

    useEffect(() => {
        if (!quotes) return;
        applyAllFiltersSort();
    }, [quotes, searchFilter, authorFilter, attachmentFilter, fromFilter, toFilter, sortBy]);

    const deleteQuote = (quote: QuoteType) => {
        sendRequest<void>({
            method: 'post',
            url: `/api/deleteQuote?id=${quote._id}`,
        }, (response) => {
            if (response.status === 200) {
                console.log(`deleted quote with id: ${quote._id}`);
                setQuotes(quotes.filter(q => q._id !== quote._id));
            }
            else {
                console.log(`failed to delete quote with id: ${quote._id}`);
            }
        });
    };

    const scrubData = (data: RawQuoteType[]): QuoteType[] => {
        const cleanQuotes: QuoteType[] = [];
        const foundAuthors: string[] = ["all"];
        for (var q of data) {
            // make list of quote authors
            if (foundAuthors.indexOf(q.author.username.toLowerCase()) === -1) {
                foundAuthors.push(q.author.username.toLowerCase());
                // grab up to date avatar
            }

            // clean up date string
            const cleanQuote: QuoteType = {
                ...q,
                timestamp: new Date(q.timestamp),
            };
            cleanQuotes.push(cleanQuote);
        }

        setAuthors(foundAuthors);

        return cleanQuotes;
    };

    const formatQuotesJSX = (quotes: QuoteType[]) => {
        const rows = [];
        for (let i = 0; i < quotes.length; i++) {
            rows.push(formatQuoteJSX(quotes[i]));
        }
        return rows;
    };

    const formatQuoteJSX = (quote: QuoteType) => {
        return ( <Quote quote={quote} deleteQuote={deleteQuote} key={quote._id} /> );
    };
    
    return (
        <Row>
            <Col md style={{ maxWidth: 400, backgroundColor: 'rgb(43, 45, 49)', color: 'rgb(219, 222, 225)'}}>
                <div className="sticky-top p-3">
                    <div className="mb-3">
                        search text:
                        <FormControl onChange={e => setSearchFilter(e.target.value)} type="text" />
                    </div>
                    <div className="mb-3">
                        author filter:
                        <FormSelect onChange={e => setAuthorFilter(e.target.value)} value={authorFilter}>
                            { authors.map(a => <option value={a}>{a}</option>) }
                        </FormSelect>
                    </div>
                    <div className="mb-3">
                        attachment filter:
                        <FormSelect onChange={e => setAttachmentFilter(e.target.value)} value={attachmentFilter}>
                            { ['any', 'none', 'image', 'video', 'audio'].map(a => <option value={a}>{a}</option>) }
                        </FormSelect>
                    </div>
                    <div className="mb-3">
                        from:
                        <FormControl onChange={e => setFromFilter(e.target.value)} type="date" />
                    </div>
                    <div className="mb-3">
                        to:
                        <FormControl onChange={e => setToFilter(e.target.value)} type="date" />
                    </div>
                    <div className="mb-3">
                        sort by:
                        <FormSelect onChange={e => setSortBy(e.target.value)} value={sortBy}>
                            { ['', 'date', 'author'].map(o => <option value={o}>{o}</option>) }
                        </FormSelect>
                    </div>
                </div>
            </Col>
            <Col lg style={{ backgroundColor: 'rgb(30, 31, 34)' }}>
                <Container className="mx-auto">
                    { formatQuotesJSX(displayQuotes) }
                </Container>
            </Col>
        </Row>
    );
};

export default QuoteList;
