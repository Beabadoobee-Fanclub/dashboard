import type { Handle } from '@sveltejs/kit';
import * as auth from '$lib/server/auth.js';
import { drizzle } from 'drizzle-orm/d1';

const handleAuth: Handle = async ({ event, resolve }) => {
	const sessionToken = event.cookies.get(auth.sessionCookieName);
	event.locals.db = drizzle(event.platform?.env?.DATABASE);
	if (!sessionToken) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const db = drizzle(event.platform?.env?.DATABASE);

	const { session, user } = await auth.validateSessionToken(sessionToken, db);
	if (session) {
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
	} else {
		auth.deleteSessionTokenCookie(event);
	}

	event.locals.user = user;
	event.locals.session = session;

	return resolve(event);
};

export const handle: Handle = handleAuth;
