import express, { RequestHandler } from 'express';
import cors from 'cors';
import routes from './routes';
import discord from './discord';
import mongo from './mongo';
import * as config from './config.json';
import { collections, connectToDatabase } from './services/database.service';
import { verifyToken } from './jwt';
import { JsonWebTokenError, JwtPayload, TokenExpiredError } from 'jsonwebtoken';

const port = config.port || 8000;

const isAuthorized: RequestHandler = async (req, res, next) => {
    // console.log(req.headers.authorization);
    try {
        var result: JwtPayload = verifyToken(req.headers.authorization) as JwtPayload;
        // console.log(result);
        // check db for discord token
        var r = await collections.codes.findOne({code: result.code});
        // code not in database, invalid
        if (!r) throw new JsonWebTokenError("token is not valid");
    }
    catch (error) {
        if (error instanceof TokenExpiredError || error instanceof JsonWebTokenError) {
            console.log("token invalid")
            // token has expired, or invalid
            return res.status(401).end();
        }
    }
    
    next();
};

const app = express();
app.use(cors());
app.set('port', port);
app.use(routes);
app.use('/api', discord);

// connect to the mongo db
connectToDatabase().then(() => {
    app.use('/api', isAuthorized, mongo);
}).catch((error) => {
    console.error('failed to connect to database', error);
});

app.listen(app.get('port'), () => {
    console.log(`server started on http://localhost:${port}`);
});
