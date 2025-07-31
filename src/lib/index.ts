// place files you want to import through the `$lib` alias in this folder.
// place files you want to import through the `$lib` alias in this folder.

export class DiscordImage {
    private static CDN_URL = 'https://cdn.discordapp.com';

    static getAvatarURL = (user_id: string, avatar: string, size: number = 128) => {
        if (avatar.startsWith('a_')) return `${DiscordImage.CDN_URL}/avatars/${user_id}/${avatar}.gif?size=${size}`;
        return `${DiscordImage.CDN_URL}/avatars/${user_id}/${avatar}.png?size=${size}`;   
    }

    static getGuildMemberAvatarURL = (guild_id: string, user_id: string, avatar: String, size: number = 128) => {
        if (avatar.startsWith('a_')) return `${DiscordImage.CDN_URL}/guilds/${guild_id}/users/${user_id}/avatars/${avatar}.gif?size=${size}`;
        return `${DiscordImage.CDN_URL}/guilds/${guild_id}/users/${user_id}/avatars/${avatar}.png?size=${size}`;
    }

    static getAvatarDecorationURL = (avatar_decoration_data_asset: string, size: number = 128) => {
        return `${DiscordImage.CDN_URL}/avatar-decoration-presets/${avatar_decoration_data_asset}.png?size=${size}`;
    }

    static getGuildIconURL = (guild_id: string, guild_icon: string, size: number = 128) => {
        if (guild_icon.startsWith('a_')) return `${DiscordImage.CDN_URL}/icons/${guild_id}/${guild_icon}.gif?size=${size}`;
        return `${DiscordImage.CDN_URL}/icons/${guild_id}/${guild_icon}.png?size=${size}`;
    }

    static getGuildSplashURL = (guild_id: string, guild_splash: string, size: number = 128) => {
        return `${DiscordImage.CDN_URL}/splashes/${guild_id}/${guild_splash}.png?size=${size}`;
    }

    static getGuildDiscoverySplashURL = (guild_id: string, guild_discovery_splash: string, size: number = 128) => {
        return `${DiscordImage.CDN_URL}/discovery-splashes/${guild_id}/${guild_discovery_splash}.png?size=${size}`;
    }

    static getGuildBannerURL = (guild_id: string, guild_banner: string, size: number = 128) => {
        if (guild_banner.startsWith('a_')) return `${DiscordImage.CDN_URL}/banners/${guild_id}/${guild_banner}.gif?size=${size}`;
        return `${DiscordImage.CDN_URL}/banners/${guild_id}/${guild_banner}.png?size=${size}`;
    }


}

export async function fetchUser() {
    // const respon
}