import { redirect, type Handle } from '@sveltejs/kit';
import * as auth from '$lib/server/auth.js';
import { drizzle } from 'drizzle-orm/d1';

const handleAuth: Handle = async ({ event, resolve }) => {
	let accessToken = event.cookies.get('discord_token');
	
	if (!accessToken) {
		const refreshToken = event.cookies.get('discord_refresh_token');
		if (!refreshToken) {
			return resolve(event);
		};
		const response = await auth.refreshAccessToken(refreshToken);
		if (!response) return redirect(302, '/');
		await auth.setTokenCookies(event, response);
		accessToken = response.access_token;
	}

	const user = await auth.getDiscordAccount(accessToken);
	if (!user) return redirect(302, '/');
	event.locals.user = user;

	return resolve(event);
};

export const handle: Handle = handleAuth;
