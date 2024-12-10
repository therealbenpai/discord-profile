import * as DiscordAPI from 'discord-api-types/v10';
import Database from '#/src/database';

import ProfileImage from '#/components/ProfileImage';
import SocialIcon from '#/components/ProfileSocialIcon';
import Description from '#/components/ProfileDescription';

const store = new Map() as Map<string, string>;

type FunctionParams = {
    searchParams: Promise<Record<string, string>>,
    params: Record<string, string>;
}

type Nullable<T> = T | undefined | null

interface User {
    readonly id: string;
    readonly avatar: string;
    readonly username: string;
    readonly discriminator: string;
    readonly public_flags: number;
    readonly flags: number;
    readonly email: string;
    readonly verified: boolean;
    readonly locale: string;
    readonly mfa_enabled: boolean;
    readonly premium_type: number;
    readonly system: boolean;
    readonly bot: boolean;
    readonly banner: string;
    readonly accent_color: string;
    readonly banner_color: string;
}

interface Guild {
    readonly id: string;
    readonly name: string;
    readonly icon: string;
}

interface Connection {
    readonly id: string;
    readonly name: string;
    readonly type: string;
    readonly revoked: boolean;
    readonly integrations: any[];
    readonly verified: boolean;
    readonly friend_sync: boolean;
    readonly show_activity: boolean;
    readonly visibility: number;
}

const flagsToProfileFlags = (flags: number) => {
    const flagsArray = Object.entries(DiscordAPI.UserFlags)
    const userFlags = flagsArray.filter(([_, value]) => typeof value === 'number' && typeof _ === 'string')
        .filter(([_, value]) => flags & value as number)
        .map(([key, _]) => key)

    const KeysToReadable = {
        "DiscordEmployee": "Discord Employee",
        "DiscordPartner": "Discord Partner",
        "HypesquadEvents": "Hypesquad Events",
        "HypeSquadOnlineHouse1": "HypeSquad Bravery",
        "HypeSquadOnlineHouse2": "HypeSquad Brilliance",
        "HypeSquadOnlineHouse3": "HypeSquad Balance",
        "BugHunterLevel1": "Bug Hunter",
        "HouseBravery": "House of Bravery",
        "HouseBrilliance": "House of Brilliance",
        "HouseBalance": "House of Balance",
        "EarlySupporter": "Early Supporter",
        "TeamUser": "Team User",
        "System": "System",
        "BugHunterLevel2": "Bug Hunter",
        "VerifiedBot": "Verified Bot",
        "VerifiedBotDeveloper": "Verified Bot Developer",
        "DiscordCertifiedModerator": "Discord Certified Moderator",
        "ActiveDeveloper": "Active Developer",
    } as Record<string, string>
    return userFlags.map((flag) => KeysToReadable[flag] || flag)
}

const ConnectionToIcon = (connection: Connection) => {
    switch (connection.type) {
        case 'amazon-music':
            return <SocialIcon
                link={`https://music.amazon.com/`}
                pack='simple-icons'
                icon='amazonmusic'
                title='Amazon Music'
            />
        case 'battlenet':
            return <SocialIcon
                link={`https://battle.net`}
                pack='simple-icons'
                icon='battledotnet'
                title='Battle.net'
            />
        case 'bungie':
            return <SocialIcon
                link={`https://bungie.net`}
                pack='simple-icons'
                icon='bungie'
                title='Bungie.net'
            />
        case 'crunchyroll':
            return <SocialIcon
                link={`https://crunchyroll.com`}
                pack='simple-icons'
                icon='crunchyroll'
                title='Crunchyroll'
            />
        case 'domain':
            return <SocialIcon
                link={`https://${connection.name}`}
                pack='codicon'
                icon='globe'
                title='Domain'
            />
        case 'ebay':
            return <SocialIcon
                link={`https://ebay.com/usr/${connection.name}`}
                pack='simple-icons'
                icon='ebay'
                title='eBay'
            />
        case 'epicgames':
            return <SocialIcon
                link={`https://epicgames.com`}
                pack='simple-icons'
                icon='epicgames'
                title='Epic Games'
            />
        case 'facebook':
            return <SocialIcon
                link={`https://facebook.com/${connection.name}`}
                pack='simple-icons'
                icon='facebook'
                title='Facebook'
            />
        case 'github':
            return <SocialIcon
                link={`https://github.com/${connection.name}`}
                pack='simple-icons'
                icon='github'
                title='GitHub'
            />
        case 'instagram':
            return <SocialIcon
                link={`https://instagram.com/${connection.name}`}
                pack='simple-icons'
                icon='instagram'
                title='Instagram'
            />
        case 'leagueoflegends':
            return <SocialIcon
                link={`https://leagueoflegends.com`}
                pack='simple-icons'
                icon='leagueoflegends'
                title='League of Legends'
            />
        case 'paypal':
            return <SocialIcon
                link={`https://paypal.com`}
                pack='simple-icons'
                icon='paypal'
                title='PayPal'
            />
        case 'playstation':
            return <SocialIcon
                link={`https://playstation.com/`}
                pack='simple-icons'
                icon='playstation'
                title='PlayStation Network'
            />
        case 'reddit':
            return <SocialIcon
                link={`https://reddit.com/u/${connection.name}`}
                pack='simple-icons'
                icon='reddit'
                title='Reddit'
            />
        case 'riotgames':
            return <SocialIcon
                link={`https://riotgames.com`}
                pack='simple-icons'
                icon='riotgames'
                title='Riot Games'
            />
        case 'roblox':
            return <SocialIcon
                link={`https://roblox.com/users/${connection.id}/profile`}
                pack='simple-icons'
                icon='roblox'
                title='Roblox'
            />
        case 'spotify':
            return <SocialIcon
                link={`https://open.spotify.com/user/${connection.id}`}
                pack='simple-icons'
                icon='spotify'
                title='Spotify'
            />
        case 'skype':
            return <SocialIcon
                link={`https://skype.com`}
                pack='simple-icons'
                icon='skype'
                title='Skype'
            />
        case 'steam':
            return <SocialIcon
                link={`https://steamcommunity.com/id/${connection.name}`}
                pack='simple-icons'
                icon='steam'
                title='Steam'
            />
        case 'tiktok':
            return <SocialIcon
                link={`https://tiktok.com/@${connection.name}`}
                pack='simple-icons'
                icon='tiktok'
                title='TikTok'
            />
        case 'twitch':
            return <SocialIcon
                link={`https://twitch.tv/${connection.name}`}
                pack='simple-icons'
                icon='twitch'
                title='Twitch'
            />
        case 'twitter':
            return <SocialIcon
                link={`https://twitter.com/${connection.name}`}
                pack='simple-icons'
                icon='twitter'
                title='Twitter'
            />
        case 'xbox':
            return <SocialIcon
                link={`https://www.xbox.com/en-US/play/user/${connection.name}`}
                pack='simple-icons'
                icon='xbox'
                title='Xbox'
            />
        case 'youtube':
            return <SocialIcon
                link={`https://youtube.com/channel/${connection.id}`}
                pack='simple-icons'
                icon='youtube'
                title='YouTube'
            />
        default:
            return <SocialIcon
                link={`https://discord.com/users/${connection.id}`}
                pack='simple-icons'
                icon='discord'
                title='Discord'
            />
    }
}

const getAPIFetch = (route: string, method?: Nullable<string>, body?: Nullable<BodyInit>) =>
    (token?: Nullable<string>, headers?: Nullable<Record<string, string>>) =>
        new Request(`https://discord.com/api/v10${route}`,
            {
                method: method || 'GET',
                body,
                headers: {
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    ...(headers || {}),
                }
            }
        )

const getFullUserInfo = async (token: string) => ({
    user: await fetch(getAPIFetch(DiscordAPI.Routes.user())(token))
        .then((res) => res.json()) as User,
    guilds: (await fetch(getAPIFetch(DiscordAPI.Routes.userGuilds())(token))
        .then((res) => res.json()) as Array<Record<string, string>>)
        .map(({ id, name, icon }) => ({ id, name, icon })) as Array<Guild>,
    connections: await fetch(getAPIFetch(DiscordAPI.Routes.userConnections())(token))
        .then((res) => res.json()) as Array<Connection>
})

export default async function Page({ params }: FunctionParams) {
    const { name } = params;
    const userData = Database.prepare('SELECT * FROM profiles WHERE username = ?').get(name) as Record<string, string>;
    if (!userData) return (
        <body>
            <h1>Invalid user</h1>
        </body>
    );


    const response = await fetch(
        getAPIFetch(
            '/oauth2/token',
            'POST',
            new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: userData.refresh,
                client_id: process.env.DISCORD_CLIENT_ID!,
                client_secret: process.env.DISCORD_CLIENT_SECRET!,
            })
        )('', { 'Content-Type': 'application/x-www-form-urlencoded' })
    ).then((res) => res.json());
    const { access_token, refresh_token } = response;
    Database.prepare('UPDATE profiles SET access = ?, refresh = ? WHERE id = ?').run(access_token, refresh_token, userData.id);


    const userInfo = await getFullUserInfo(access_token!);

    return (
        <body className="bg-gray-100 dark:bg-gray-900 font-sans leading-normal tracking-normal">
            <div className="container mx-auto px-4 text-center">
                <div className="max-w-6xl mx-auto bg-white dark:bg-gray-950 shadow-lg rounded-lg overflow-hidden mt-10">
                    <div className="p-6 gap-6">
                        <ProfileImage
                            link={`https://cdn.discordapp.com/avatars/${userInfo.user.id}/${userInfo.user.avatar}.png?size=4096`}
                            name={userInfo.user.username}
                        />
                        <h1 className="text-3xl font-bold my-4 text-gray-800 dark:text-gray-200">
                            {userInfo.user.username}
                        </h1>
                        <h2 className="text-xl text-gray-600 dark:text-gray-300 my-4">
                            User Information
                        </h2>
                        <Description>
                            ID: {userInfo.user.id}
                        </Description>
                        <Description>
                            Email: {userInfo.user.email.replaceAll(/[a-z]/gmi, '*')}
                        </Description>
                        <Description>
                            Flags: {flagsToProfileFlags(userInfo.user.public_flags).join(', ')}
                        </Description>
                        <Description>
                            Guilds: {userInfo.guilds.length}
                        </Description>
                        <div className="flex flex-col items-center justify-center my-4">
                            <div className="grid grid-cols-3 gap-4 w-full">
                                {userInfo.guilds.map((guild) => (
                                    <div
                                        key={guild.id}
                                        className="flex flex-col items-center justify-center"
                                    >
                                        <img
                                            src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=4096`}
                                            alt={guild.name}
                                            className="rounded-lg size-24"
                                        />
                                        <Description>
                                            {guild.name.split(/[\|]/gmi)[0]}
                                        </Description>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <h2 className="text-xl text-gray-600 dark:text-gray-300">
                            Connections
                        </h2>
                        <div className="flex flex-col items-center justify-center my-4">
                            <div className="grid grid-cols-3 gap-4 w-full">
                                {userInfo.connections.map((connection) => (
                                    <div
                                        key={connection.id}
                                        className="grid grid-flow-row items-center justify-center gap-2"
                                    >
                                        {ConnectionToIcon(connection)}
                                        <Description>
                                            {connection.name}
                                        </Description>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    )
}
