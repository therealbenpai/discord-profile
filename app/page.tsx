import * as DiscordAPI from 'discord-api-types/v10';

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
}

DiscordAPIRedirectURL.search = new URLSearchParams(searchParams).toString()

export default function Page() {
  return (
    <body>
      <h1>Discord Login</h1>
      <a href={DiscordAPIRedirectURL.toString()}>Login with Discord</a>
    </body>
  )
}
