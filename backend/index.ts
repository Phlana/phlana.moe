import express from 'express';
import routes from './routes';
import discord from './discord';
import * as config from './config.json';

const port = config.port || 8000;

const app = express();
app.set('port', port);
app.use(routes);
app.use(discord);

app.listen(app.get('port'), () => {
    console.log(`server started on http://localhost:${port}`);
});
