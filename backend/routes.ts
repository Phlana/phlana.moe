import express from 'express';
import axios from 'axios';
import * as config from './config.json';

const router = express.Router();

router.get('/', (req, res) => {
    console.log('home page');
    // res.render('index');
});

export default router;
