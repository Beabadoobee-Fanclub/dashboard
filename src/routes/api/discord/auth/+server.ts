import { redirect } from '@sveltejs/kit';
import { getAccessToken, setTokenCookies } from '$lib/server/auth';

export async function GET(event) {
    const code = event.url.searchParams.get('code')
    if (!code) return redirect(302, '/');
    
    const response = await getAccessToken(code);

    if (!response) return redirect(302, '/');

    await setTokenCookies(event, response);

    return redirect(302, '/dashboard');
}