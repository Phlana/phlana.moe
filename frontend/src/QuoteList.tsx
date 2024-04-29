import axios from "axios";
import { useEffect, useState } from "react";
import Quote from './components/Quote';
import { Quote as QuoteType } from './model/mongoTypes';

const QuoteList = () => {
    const [quotes, setQuotes] = useState<QuoteType[]>([]);

    const debugPrintAttachments = (quotes: QuoteType[]) => {
        for (var quote of quotes) {
            if (quote.attachments.length > 0) {
                console.log(quote);
            }
        }
    }

    useEffect(() => {
        axios.request({
            method: 'get',
            url: '/api/getQuoteList',
        }).then(response => {
            // console.log(response.data);
            // debugPrintAttachments(response.data);
            setQuotes(response.data);
        });
    }, []);

    useEffect(() => {
        if (!quotes) return;
        // quotes have been fetched
    }, [quotes]);

    const formatQuotesJSX = (quotes: QuoteType[]) => {
        const rows = [];
        for (let i = 0; i < quotes.length; i++) {
            rows.push(formatQuoteJSX(quotes[i]));
        }
        return rows;
    };

    const formatQuoteJSX = (quote: QuoteType) => {
        return (<Quote quote={quote} key={quote.id} />);
    };
    
    return (
        <div>
            { formatQuotesJSX(quotes) }
        </div>
    );
};

export default QuoteList;