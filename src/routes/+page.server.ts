import { drizzle } from "drizzle-orm/d1";
import type { Actions } from "./$types";
import {  } from '$lib/server/auth'
import { redirect } from "@sveltejs/kit";

export const load = async (event) => {


    return {};
}

export const actions = {
    discord: async (event) => {
        const discord_url = new URL("https://discord.com/oauth2/authorize?client_id=1340907937471660142&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fapi%2Fdiscord%2Fauth&scope=identify+guilds.members.read+guilds")
        return redirect(302, discord_url.toString());
    }
} satisfies Actions;