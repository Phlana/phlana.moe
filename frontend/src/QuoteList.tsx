import axios from "axios";
import { useEffect, useState } from "react";
import Quote from './components/Quote';
import { Quote as QuoteType } from './model/mongoTypes';

const QuoteList = () => {
    const [quotes, setQuotes] = useState<QuoteType[]>([]);

    useEffect(() => {
        axios.request({
            method: 'get',
            url: '/getQuoteList',
        }).then(response => {
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
        return (<Quote quote={quote} />);
    };
    
    return (
        <div>
            { formatQuotesJSX(quotes) }
        </div>
    );
};

export default QuoteList;