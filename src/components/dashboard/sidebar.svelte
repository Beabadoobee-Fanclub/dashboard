<script lang="ts">
  import {
    serverGroup,
    securityGroup,
    configurationGroup,
    utilitiesGroup,
    socialIntegrationGroup,
    funGroup,
  } from "$lib/sidebar_groups";
  import SidebarGroup from "./sidebar_group.svelte";
  import ServerPicker from "./server_picker.svelte";
  import Profile from "./profile.svelte";

  import type { APIUser } from "discord-api-types/v10";

  let {
    guildId,
    apiHost,
    currentPath,
    isLoading = $bindable(false),
  }: {
    guildId: string;
    apiHost: string;
    currentPath: string[];
    isLoading: boolean;
  } = $props();

  const serverGroups = [
    { name: "Server", id: "", items: serverGroup },
    { name: "Security", id: "security", items: securityGroup },
    { name: "Configuration", id: "configuration", items: configurationGroup },
    { name: "Utilities", id: "utility", items: utilitiesGroup },
    { name: "Social Integration", id: "social", items: socialIntegrationGroup },
    { name: "Fun", id: "fun", items: funGroup },
  ];
</script>

<header class="sticky top-0 self-start flex flex-col h-screen md:w-56 px-2">
  <h1 class="text-lg font-bold my-5">BEABot</h1>
  <ServerPicker {guildId} {apiHost} bind:isLoading />
  <!-- svelte-ignore element_invalid_self_closing_tag -->
  <span class="w-full h-1 bg-slate-300 dark:bg-slate-950 my-3 rounded-full" />
  <ul class="overflow-y-auto h-full">
    {#each serverGroups as group, i}
      <SidebarGroup
        wrapperDelay={i * 100}
        info={group}
        {guildId}
        {currentPath}
      />
    {/each}
  </ul>
  <Profile {guildId} {apiHost} />
</header>

<style>
  header {
    view-transition-name: sidebar;
  }
</style>
