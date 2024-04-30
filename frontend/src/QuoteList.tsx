import axios from "axios";
import { useEffect, useState } from "react";
import Quote from './components/Quote';
import { Quote as QuoteType } from './model/mongoTypes';
import { sendRequest } from "./UseAxios";
import { Container, Row, Col, FormSelect } from "react-bootstrap";

const QuoteList = () => {
    const [quotes, setQuotes] = useState<QuoteType[]>([]);
    const [displayQuotes, setDisplayQuotes] = useState<QuoteType[]>(quotes);
    const [authorFilter, setAuthorFilter] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('date');
    const [authors, setAuthors] = useState<string[]>([]);

    const debugPrintAttachments = (quotes: QuoteType[]) => {
        for (var quote of quotes)
            if (quote.attachments.length > 0)
                console.log(quote);
    };

    useEffect(() => {
        sendRequest<QuoteType[]>({
            method: 'get',
            url: '/api/getQuoteList',
        }, (data) => {
            console.log('received quote list data');
            // console.log(data);
            // debugPrintAttachments(data);
            setQuotes(data);
            setDisplayQuotes(data);
            mapData(data);
            console.log('finished mapping data');
        });
    }, []);

    const onAuthorFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
        filterAndSortQuotes(event.target.value, sortBy);
    };

    const onSortBy = (event: React.ChangeEvent<HTMLSelectElement>) => {
        filterAndSortQuotes(authorFilter, event.target.value);
    };

    const filterAndSortQuotes = (filter: string, sort: string) => {
        if (filter !== authorFilter) {
            console.log('filtering quotes');
            if (filter === 'all')
                setDisplayQuotes(quotes);
            else
                setDisplayQuotes(quotes.filter(q => q.author.username.toLowerCase() == filter));
            
            setAuthorFilter(filter);
        }
        if (sort !== sortBy) {
            console.log('sorting quotes');
            // setQuotes(quotes.toSorted((a, b) => {
            //     return 1;
            // }));
            setSortBy(sort);
        }
    };

    const mapData = (data: QuoteType[]) => {
        const foundAuthors: string[] = ["all"];
        for (var q of data) {
            // make list of quote authors
            if (foundAuthors.indexOf(q.author.username.toLowerCase()) === -1) {
                foundAuthors.push(q.author.username.toLowerCase());
                // grab up to date avatar
            }
        }

        setAuthors(foundAuthors);
    };

    const formatQuotesJSX = (quotes: QuoteType[]) => {
        const rows = [];
        for (let i = 0; i < quotes.length; i++) {
            rows.push(formatQuoteJSX(quotes[i]));
        }
        return rows;
    };

    const formatQuoteJSX = (quote: QuoteType) => {
        return ( <Quote quote={quote} key={quote._id} /> );
    };
    
    return (
        <Row>
            <Col md style={{ maxWidth: 400, backgroundColor: 'rgb(43, 45, 49)', color: 'rgb(219, 222, 225)'}}>
                <div className="sticky-top p-3">
                    <div>
                        <FormSelect onChange={onAuthorFilter}>
                            { authors.map(p => <option value={p}>{p}</option>) }
                        </FormSelect>
                    </div>
                    <div>
                        filtering to: { authorFilter }
                    </div>
                    <div>
                        <FormSelect onChange={onSortBy}>
                            { ['date', 'author'].map(o => <option value={o}>{o}</option>) }
                        </FormSelect>
                    </div>
                    <div>
                        sorting by: { sortBy }
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