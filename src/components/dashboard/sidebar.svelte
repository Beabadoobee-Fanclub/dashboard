<script lang="ts">
  import {
    serverGroup,
    securityGroup,
    configurationGroup,
    utilitiesGroup,
    socialIntegrationGroup,
    funGroup,
  } from "$lib/sidebar_groups";
  import {} from "flowbite-svelte-icons";
  import SidebarGroup from "./sidebar_group.svelte";

  import { page } from "$app/state";
  import ServerPicker from "./server_picker.svelte";
  import Profile from "./profile.svelte";
  import type { APIUser } from "discord-api-types/v10";

  const { guildId, apiHost }: { guildId: string; apiHost: string } = $props();

  const currentPath = $derived(
    page.url.pathname.replace(`/dashboard/${guildId}`, "").split("/")
  );

  const serverGroups = [
    { name: "Server", id: "", items: serverGroup },
    { name: "Security", id: "security", items: securityGroup },
    { name: "Configuration", id: "configuration", items: configurationGroup },
    { name: "Utilities", id: "utility", items: utilitiesGroup },
    { name: "Social Integration", id: "social", items: socialIntegrationGroup },
    { name: "Fun", id: "fun", items: funGroup },
  ];
</script>

<nav
  class="sticky top-0 self-start flex flex-col h-screen md:w-56 text-white px-2"
>
  <h1 class="text-lg font-bold my-5">BEABot</h1>
  <ServerPicker {guildId} {apiHost} />
  <div class="w-full h-1 bg-slate-950 my-3" />
  <ul class="overflow-y-auto h-full">
    {#each serverGroups as group}
      <SidebarGroup info={group} {guildId} {currentPath} />
    {/each}
  </ul>
  <Profile {guildId} {apiHost} />
</nav>
