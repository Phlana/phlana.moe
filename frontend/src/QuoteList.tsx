import axios from "axios";
import { useEffect, useState } from "react";
import Quote from './components/Quote';
import { Quote as QuoteType } from './model/mongoTypes';
import { sendRequest } from "./UseAxios";

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
        sendRequest<QuoteType[]>({
            method: 'get',
            url: '/api/getQuoteList',
        }, (data) => {
            // console.log(data);
            // debugPrintAttachments(data);
            setQuotes(data);
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