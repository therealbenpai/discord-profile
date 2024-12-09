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
    <body className="bg-gray-800 text-center">
      <div className="grid grid-flow-row items-center max-h-sm justify-center gap-8 my-24">
        <h1 className="text-4xl text-white">Discord Profile Grabber</h1>
        <a
          href={DiscordAPIRedirectURL.toString()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login with Discord
        </a>
      </div>
    </body>
  )
}
