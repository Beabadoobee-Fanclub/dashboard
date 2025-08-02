import type { LayoutServerLoad } from './$types';
import { PUBLIC_API_HOST } from "$env/static/public";

export const load = (async ({ platform }) => {
    let env = platform?.env;
    let apiHost = env?.API_HOST || PUBLIC_API_HOST;
    return {
        apiHost
    };
}) satisfies LayoutServerLoad;