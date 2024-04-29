import { Card } from 'react-bootstrap';
import { Attachment, Quote as QuoteType } from '../model/mongoTypes'
import { ReactEventHandler } from 'react';

const Quote = ({quote}: {quote: QuoteType}) => {
    const displayAttachments = (quote: QuoteType) => {
        const attachments = [];
        for (var attachment of quote.attachments)
            attachments.push(displayAttachment(attachment));
        return attachments;
    };

    const displayAttachment = (attachment: Attachment) => {
        return <img src={attachment.url} key={attachment.id} />
    };

    return (
        <Card>
            <Card.Header>
                {/* <img src={`https://cdn.discordapp.com/avatars/${quote.author.id}/${quote.author.avatar}.png`} /> */}
                {quote.author.username}
            </Card.Header>
            <Card.Body>
                <div>
                    {quote.content}
                </div>
                <div>
                    {displayAttachments(quote)}
                </div>
            </Card.Body>
            <Card.Footer>
                {quote.timestamp}
            </Card.Footer>
        </Card>
    );
};

export default Quote;