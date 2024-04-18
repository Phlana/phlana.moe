import express from 'express';
import { ObjectId } from 'mongodb';
import { collections } from './services/database.service';
import Quote from './models/quote';

const router = express.Router();

router.use(express.json());

// get all quotes
router.get('/getQuoteList', async (req, res) => {
    try {
        // console.log('getting quote list');
        // console.log(collections.quotes);
        const quotes = (await collections.quotes.find({}).toArray()) as unknown as Quote[];
        res.status(200).send(quotes);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

export default router;