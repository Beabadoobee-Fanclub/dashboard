import { redirect } from '@sveltejs/kit';
import { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET } from '$env/static/private';
import type { DiscordAuthResponse } from '$lib';

export async function GET(event) {
    const code = event.url.searchParams.get('code')
    if (!code) return redirect(302, '../../../');
    const discord_url = new URL('https://discord.com/api/oauth2/token');

    const body = new URLSearchParams({
        client_id: DISCORD_CLIENT_ID,
        client_secret: DISCORD_CLIENT_SECRET,
        grant_type: 'authorization_code',
        code,
        redirect_uri: 'http://localhost:5173/api/discord/auth',
    })

    const data = await fetch(discord_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body,
    })

    const response = await data.json() as DiscordAuthResponse;

    if (!response.access_token) return redirect(302, '../../../');

    event.cookies.set('discord_token', response.access_token, {
        path: '/', // The path of the cookie
        maxAge: response.expires_in, // When the access token expires
        sameSite: 'strict', // Same site policy
        secure: true, // HTTPS only
        httpOnly: true, // HTTP only
    })

    event.cookies.set('discord_refresh_token', response.refresh_token, {
        path: '/api/discord/refresh',
        sameSite: 'strict',
        secure: true,
        httpOnly: true,
    })

    return redirect(302, '../../../')
}