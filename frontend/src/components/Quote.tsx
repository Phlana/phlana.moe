import { Button, Card, Col, Row } from 'react-bootstrap';
import { Attachment, QuoteType } from '../model/mongoTypes';
import config from '../config.json';
import './Quote.css';
import { sendRequest } from '../UseAxios';

const Quote = ({quote, deleteQuote}: {quote: QuoteType, deleteQuote: (quote: QuoteType) => void}) => {
    const displayAttachments = (quote: QuoteType) => {
        const attachments = [];
        for (var attachment of quote.attachments) {
            if (attachments.length === 0)
                attachments.push(<Row><Col>{ displayAttachment(attachment) }</Col></Row>);
            else
                attachments.push(<Row className='mt-3'><Col>{ displayAttachment(attachment) }</Col></Row>);
        }
        return attachments;
    };

    const displayAttachment = (attachment: Attachment) => {
        // video attachment
        if (attachment.url.includes('.mp4') || attachment.url.includes('.mov'))
            return <video style={{ maxWidth: '100%' }} key={attachment.id} controls><source src={attachment.url} type='video/mp4'></source></video>;
        if (attachment.url.includes('.webm'))
            return <video style={{ maxWidth: '100%' }} key={attachment.id} controls><source src={attachment.url} type='video/webm'></source></video>;
        if (attachment.url.includes('.ogg'))
            return <video style={{ maxWidth: '100%' }} key={attachment.id} controls><source src={attachment.url} type='video/ogg'></source></video>;

        // audio attachment
        if (attachment.url.includes('.mp3'))
            return <audio key={attachment.id} controls><source src={attachment.url} type='audio/mpeg'></source></audio>;
        if (attachment.url.includes('.ogg'))
            return <audio key={attachment.id} controls><source src={attachment.url} type='audio/ogg'></source></audio>;
        if (attachment.url.includes('.wav'))
            return <audio key={attachment.id} controls><source src={attachment.url} type='audio/wav'></source></audio>;

        // image attachment
        if (['.jpg', '.jpeg', '.png', '.gif', 'apng', 'avif', 'webp'].some(format => attachment.url.includes(format)))
            return <img
                style={{ maxWidth: '100%' }}
                src={attachment.url}
                key={attachment.id}
            />;

        // unhandled format
        return <div>unhandled attachment format tell boshy { attachment.url }</div>;
    };

    const linkToDiscord = (quote: QuoteType) => {
        return <a href={`discord:///channels/${config.discord_server_id}/${quote.channel_id}/${quote._id}`}>link to discord</a>;
    };

    const formatDate = (date: Date): string => {
        // TODO: display today and yesterday as such
        return date.toDateString() + ' ' + date.toLocaleTimeString();
    };

    // TODO: custom emoji support?
    return (
        <Card className='quote my-4' style={{ maxWidth: 800 }}>
            <Card.Header className='d-inline-flex'>
                {/* <img src={`https://cdn.discordapp.com/avatars/${quote.author.id}/${quote.author.avatar}.png`} /> */}
                <div className='me-3'>{ quote.author.username }</div>
                <div className='me-3 flex-grow-1'>{ linkToDiscord(quote) }</div>
                <div><Button onClick={() => deleteQuote(quote)} variant='danger' size='sm'>delete</Button></div>
            </Card.Header>
            <Card.Body>
                <div>
                    {quote.content}
                </div>
                { quote.attachments.length > 0 &&
                    <div className={ quote.content ? 'mt-3' : '' }>
                        { displayAttachments(quote) }
                    </div>
                }
            </Card.Body>
            <Card.Footer>
                { formatDate(quote.timestamp) }
            </Card.Footer>
        </Card>
    );
};

export default Quote;
