import Database from '#/src/database';

type FunctionParams = {
    searchParams: Promise<Record<string, string>>
}

type Nullable<T> = T | undefined | null

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

export default async function Page({ searchParams }: FunctionParams) {
    const { code, state } = await searchParams;
    if (!code) return (<h1>Invalid code</h1>);
    const response = await fetch(
        getAPIFetch(
            '/oauth2/token',
            'POST',
            new URLSearchParams({
                client_id: process.env.DISCORD_CLIENT_ID!,
                client_secret: process.env.DISCORD_CLIENT_SECRET!,
                grant_type: 'authorization_code',
                code,
                redirect_uri: `${process.env.ENV === 'dev' ? 'http://localhost:3000' : 'https://discord.thefemdevs.com'}/discord`,
            })
        )('', { 'Content-Type': 'application/x-www-form-urlencoded' })
    ).then((res) => res.json());
    const { access_token, refresh_token } = response;

    const user = Database.prepare('SELECT * FROM pending WHERE state = ?').get(state) as Record<string, string>;
    if (!user) return (<body><h1>Invalid State</h1></body>);

    Database.prepare('INSERT INTO profiles (username, access, refresh) VALUES (?, ?, ?)').run(user.username, access_token, refresh_token);
    Database.prepare('DELETE FROM pending WHERE state = ?').run(state);


    return (
        <body className="bg-gray-800 text-center">
            <div className="grid grid-flow-row items-center max-h-sm justify-center gap-8 my-24">
                <h1 className="text-4xl text-white">Success!</h1>
                <p className="text-white">
                    You have successfully linked your Discord account to this service.
                </p>
                <a
                    href={
                        `${process.env.ENV === 'dev'
                            ? 'http://localhost:3000'
                            : 'https://discord.thefemdevs.com'
                        }/${user.username}/profile`
                    }
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >View Profile</a>
            </div>
        </body>
    )
}
