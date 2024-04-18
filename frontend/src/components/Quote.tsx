import { Card } from 'react-bootstrap';
import { Quote as QuoteType } from '../model/mongoTypes'

const Quote = ({quote}: {quote:QuoteType}) => {
    return (
        <Card>
            <Card.Header>
                <img src={`https://cdn.discordapp.com/avatars/${quote.author.id}/${quote.author.avatar}.png`} /> {quote.author.username}
            </Card.Header>
            <Card.Body>
                {quote.content}
            </Card.Body>
            <Card.Footer>
                {quote.timestamp}
            </Card.Footer>
        </Card>
    );
};

export default Quote;