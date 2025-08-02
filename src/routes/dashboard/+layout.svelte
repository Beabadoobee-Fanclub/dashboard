<script lang="ts">
  import { onMount } from "svelte";
  import type { APIPartialGuild, APIUser } from "discord-api-types/v10";
  import { page } from "$app/state";
  import { guildsState, userState } from "$state";
  import Topbar from "$components/topbar.svelte";

  const { children } = $props();

  const apiHost = $derived<string>(page.data.apiHost);

  onMount(async () => {
    userState.discord = await fetchUser();
    guildsState.push(...((await fetchGuilds()) ?? []));
  });

  async function fetchUser() {
    const res = await fetch(`${apiHost}/api/auth/status`, {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) {
      console.error("Failed to fetch user data:", res.statusText);
      location.href = "/";
    }

    return await res.json<APIUser | null>();
  }

  async function fetchGuilds() {
    const res = await fetch(`${apiHost}/api/guilds/mutual`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok)
      return console.error("Failed to fetch guilds:", res.statusText);

    guildsState.length = 0; // Clear the existing state
    const data = await res.json<APIPartialGuild[]>();

    if (!Array.isArray(data))
      return console.error("Expected an array of guilds, but got:", data);

    return data;
  }
</script>

{#if userState.discord}
  {@render children?.()}
{/if}
