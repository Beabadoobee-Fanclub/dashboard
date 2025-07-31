<script lang="ts">
    import type { LayoutData, LayoutProps } from './$types';
    import { DiscordImage } from "$lib";
    import { Avatar, Dropdown, DropdownGroup, DropdownHeader, DropdownItem } from "flowbite-svelte";
    import { onMount } from 'svelte';
    import type { APIUser } from 'discord-api-types/v10'
    import { PUBLIC_API_HOST } from "$env/static/public";

    const { data, children }: LayoutProps = $props();
    const apiHost = data.apiHost || PUBLIC_API_HOST;
    let user = $state<APIUser | null>(null);
    let avatarProfilePicture: string = $derived.by(() => {
        if (user && user.avatar) {
            return DiscordImage.getAvatarURL(user.id, user.avatar, 512);
        }
        return "https://cdn.discordapp.com/embed/avatars/0.png?size=128"
    })

    const logout = async() => {
        await fetch(`${apiHost}/api/auth/logout`, {
            method: "POST",
            credentials: "include",
        })
        location.href = '/';
    }

    onMount(async () => {
        await fetchUser();
    })

    async function fetchUser() {
        const res = await fetch(`${apiHost}/api/auth/status`, {
                    method: "GET",
                    credentials: "include",
                })
        if (!res.ok) {
            location.href = '/'
        }

        const data = await res.json<APIUser | null>();
        user = data;
    }

    
</script>

{#if user}
<div class="h-screen w-screen p-0 m-0 relative">
    <section class="flex items-center justify-between p-4 box-border bg-gray-100 dark:bg-gray-800">
        <h1>Bea-Bot</h1>
        <Avatar class="acs" src={avatarProfilePicture} alt="{user.username} avatar" />
        <Dropdown triggeredBy=".acs" placement="bottom-end">
            <DropdownHeader>
                <span class="text-sm font-semibold">{user.username}</span>
                <span class="text-xs text-gray-500">{user.id}</span>
            </DropdownHeader>
            <DropdownGroup>
                <DropdownItem>
                    <form method="GET" action="{apiHost}/api/auth/logout">
                        <button type="submit">Logout</button>
                    </form>
                </DropdownItem>
            </DropdownGroup>
        </Dropdown>
    </section>
    {@render children?.()}
</div>

{/if}