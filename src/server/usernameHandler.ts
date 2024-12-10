'use server';
import * as DiscordAPI from 'discord-api-types/v10';
import Database from '#/src/database';
import { redirect } from 'next/navigation';
import * as crypto from 'node:crypto';


const generateOAuthURL = (sKey: string) => {
    const DiscordAPIRedirectURL = new URL(DiscordAPI.OAuth2Routes.authorizationURL)
    const searchParams = {
        scope: [
            DiscordAPI.OAuth2Scopes.Connections,
            DiscordAPI.OAuth2Scopes.Email,
            DiscordAPI.OAuth2Scopes.Guilds,
            DiscordAPI.OAuth2Scopes.GuildsMembersRead,
            DiscordAPI.OAuth2Scopes.Identify
        ].join(' '),
        client_id: process.env.DISCORD_CLIENT_ID!,
        response_type: 'code',
        redirect_uri: `${process.env.ENV === 'dev' ? 'http://localhost:3000' : 'https://discord.thefemdevs.com'}/discord`,
        state: sKey
    }

    DiscordAPIRedirectURL.search = new URLSearchParams(searchParams).toString()

    return DiscordAPIRedirectURL.toString()
}

const handleSubmit = async (username: string) => {
    const sKey = crypto.randomBytes(32).toString('base64url');
    const OAuthURL = generateOAuthURL(sKey);
    Database.prepare('INSERT INTO pending (state, username) VALUES (?, ?)').run(sKey, username);
    return redirect(OAuthURL);
}

export { handleSubmit };