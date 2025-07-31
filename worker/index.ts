export default {
    async fetch(request, env) {
        return await env.API.fetch(request);
    }
}