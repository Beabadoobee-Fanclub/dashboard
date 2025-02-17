// place files you want to import through the `$lib` alias in this folder.

export type DiscordAuthResponse = {
    token_type: string,
    access_token: string,
    expires_in: number,
    refresh_token: string,
    scope: string
};

export type DiscordAccount = {
    id: string,
    username: string,
    avatar: string,
    public_flags: number,
    flags: number,
    banner: string | null,
    accent_color: number,
    global_name: string,
    banner_color: string,
    mfa_enabled: boolean,
    locale: string,
    premium_type: number,
}