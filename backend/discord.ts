import express from 'express';
import axios from 'axios';
import * as config from './config.json';
import { APIGuild } from 'discord-api-types/v10';

// declare var config
//     env: {
//         PORT: string;
//         DISCORD_CLIENT_ID: string;
//         DISCORD_CLIENT_SECRET: string;
//         DISCORD_OAUTH_URL: string;
//         DISCORD_SERVER_ID: string;
//         DISCORD_REDIRECT: string;
//     }
// }

const router = express.Router();

router.get('/login', (req, res) => {
    console.log('discord login page');
    res.redirect(config.discord_oauth_url);
});

// redirect landing from discord oauth login
router.get('/auth/discord', async (req, res) => {
    const code = req.query.code;
    const params = new URLSearchParams();
    
    params.append('client_id', config.discord_client_id);
    params.append('client_secret', config.discord_client_secret);
    params.append('grant_type', 'authorization_code');
    params.append('code', code as string);
    params.append('redirect_uri', config.discord_redirect);

    var user;
    try {
        const response = await axios.post('https://discord.com/api/oauth2/token', params);
        const { access_token, token_type } = response.data;
        const headers = { Authorization: `${token_type} ${access_token}` };

        // getting user information
        const userDataResponse = await axios.get('http://discord.com/api/v6/users/@me', { headers });
        // console.log('fetched discord user information ', userDataResponse.data);

        // geting guild (server) status
        const guildDataResponse = await axios.get('https://discord.com/api/v6/users/@me/guilds', { headers })
        // console.log('fetched discord guilds information', guildDataResponse.data);
        // console.log(guildDataResponse.data.find(guild => guild.id == config.discord_server_id.toString()));

        user = {
            username: userDataResponse.data.username,
            avatar: `https://cdn.discordapp.com/avatars/${userDataResponse.data.id}/${userDataResponse.data.avatar}.png`,
            // validate that user is in the correct server
            valid: guildDataResponse.data.some((guild: APIGuild) => guild.id == config.discord_server_id),
        }

        if (!user.valid) {
            throw new Error('not in server');
        }

        return res.json(user);
    }
    catch (error) {
        console.log('unauthorized', error);
        return res.json('unauthorized');
    }
});

export default router;
