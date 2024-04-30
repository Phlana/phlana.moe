import express from 'express';
import { ObjectId } from 'mongodb';
import { collections } from './services/database.service';
import Quote from './models/quote';
import { refreshCDNLinks } from "./discord";

const router = express.Router();

router.use(express.json());

// get all quotes
router.get('/getQuoteList', async (req, res) => {
    try {
        const quotes = (await collections.quotes.find({}).toArray()) as unknown as Quote[];

        // must refresh any attachment links as they expire outside of the discord client
        const refreshedQuotes = await refreshCDNLinks(quotes);

        res.status(200).send(refreshedQuotes);
    } catch (error) {
        res.status(500).end(error.message);
    }
});

export default router;