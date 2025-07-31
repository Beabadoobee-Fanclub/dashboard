import type { LayoutServerLoad } from './$types';

export const load = (async ({ platform }) => {
    let env = platform?.env;
    let apiHost = env?.API_HOST;
    return {
        apiHost
    };
}) satisfies LayoutServerLoad;