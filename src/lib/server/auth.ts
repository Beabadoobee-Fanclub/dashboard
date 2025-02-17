import type { RequestEvent } from '@sveltejs/kit';
// import { eq } from 'drizzle-orm';
// import { sha256 } from '@oslojs/crypto/sha2';
// import { encodeBase64url, encodeHexLowerCase } from '@oslojs/encoding';
// import * as table from '$lib/server/db/schema';
// import type { DrizzleD1Database } from 'drizzle-orm/d1';

import { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET } from "$env/static/private";
import type { DiscordAccount, DiscordAuthResponse } from "$lib";

// const DAY_IN_MS = 1000 * 60 * 60 * 24;

// export const sessionCookieName = 'auth-session';

// export function generateSessionToken() {
// 	const bytes = crypto.getRandomValues(new Uint8Array(18));
// 	const token = encodeBase64url(bytes);
// 	return token;
// }

// export async function createSession(token: string, userId: string, db: DrizzleD1Database) {
// 	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
// 	const session: table.Session = {
// 		id: sessionId,
// 		userId,
// 		expiresAt: new Date(Date.now() + DAY_IN_MS * 30)
// 	};
// 	await db.insert(table.session).values(session);
// 	return session;
// }

// export async function validateSessionToken(token: string, db: DrizzleD1Database) {
// 	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
// 	const [result] = await db
// 		.select({
// 			// Adjust user table here to tweak returned data
// 			user: { id: table.user.id, username: table.user.username },
// 			session: table.session
// 		})
// 		.from(table.session)
// 		.innerJoin(table.user, eq(table.session.userId, table.user.id))
// 		.where(eq(table.session.id, sessionId));

// 	if (!result) {
// 		return { session: null, user: null };
// 	}
// 	const { session, user } = result;

// 	const sessionExpired = Date.now() >= session.expiresAt.getTime();
// 	if (sessionExpired) {
// 		await db.delete(table.session).where(eq(table.session.id, session.id));
// 		return { session: null, user: null };
// 	}

// 	const renewSession = Date.now() >= session.expiresAt.getTime() - DAY_IN_MS * 15;
// 	if (renewSession) {
// 		session.expiresAt = new Date(Date.now() + DAY_IN_MS * 30);
// 		await db
// 			.update(table.session)
// 			.set({ expiresAt: session.expiresAt })
// 			.where(eq(table.session.id, session.id));
// 	}

// 	return { session, user };
// }

// export type SessionValidationResult = Awaited<ReturnType<typeof validateSessionToken>>;

// export async function invalidateSession(sessionId: string, db: DrizzleD1Database) {
// 	await db.delete(table.session).where(eq(table.session.id, sessionId));
// }

// export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date) {
// 	event.cookies.set(sessionCookieName, token, {
// 		expires: expiresAt,
// 		path: '/'
// 	});
// }

// export function deleteSessionTokenCookie(event: RequestEvent) {
// 	event.cookies.delete(sessionCookieName, {
// 		path: '/'
// 	});
// }


export async function getAccessToken(code: string): Promise<DiscordAuthResponse | null> {

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

	return (await data.json()) as DiscordAuthResponse;
}

export async function refreshAccessToken(refreshToken: string): Promise<DiscordAuthResponse | null> {
	
	const discord_url = new URL('https://discord.com/api/oauth2/token');
	
	const body = new URLSearchParams({
		client_id: DISCORD_CLIENT_ID,
		client_secret: DISCORD_CLIENT_SECRET,
		grant_type: 'refresh_token',
		refresh_token: refreshToken,
		redirect_uri: 'http://localhost:5173/api/discord/auth',
	})

	const data = await fetch(discord_url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body,
	})

	return (await data.json()) as DiscordAuthResponse;
}

export async function getDiscordAccount(accessToken: string): Promise<DiscordAccount | null> {
	const discord_url = new URL('https://discord.com/api/users/@me');
	
	const data = await fetch(discord_url, {
		headers: {
			'Authorization': `Bearer ${accessToken}`
		},
	})

	return (await data.json()) as DiscordAccount;
}

export async function setTokenCookies(event: RequestEvent, tokens: DiscordAuthResponse) {
	event.cookies.set('discord_token', tokens.access_token, {
        path: '/', // The path of the cookie
        maxAge: tokens.expires_in, // When the access token expires
        sameSite: 'strict', // Same site policy
        secure: true, // HTTPS only
        httpOnly: true, // HTTP only
    })

    event.cookies.set('discord_refresh_token', tokens.refresh_token, {
        path: '/',
        sameSite: 'strict',
        secure: true,
        httpOnly: true,
    })
}