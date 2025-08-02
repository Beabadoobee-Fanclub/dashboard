import type { HandleFetch } from "@sveltejs/kit";
import { PUBLIC_API_HOST } from "$env/static/public";

export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
    console.log("Handling fetch for:", request.url);
    const apiHost = event.platform?.env?.API_HOST || PUBLIC_API_HOST;
 
    return fetch(request)
}