import express from 'express';
import routes from './routes';
import discord from './discord';
import mongo from './mongo';
import * as config from './config.json';
import { connectToDatabase } from './services/database.service';

const port = config.port || 8000;

const app = express();
app.set('port', port);
app.use(routes);
app.use(discord);

// connect to the mongo db
connectToDatabase().then(() => {
    app.use(mongo);
}).catch((error) => {
    console.error('failed to connect to database', error);
});

app.listen(app.get('port'), () => {
    console.log(`server started on http://localhost:${port}`);
});
