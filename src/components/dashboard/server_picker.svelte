<script lang="ts">
  import { DiscordImage } from "$lib";
  import { guildsState } from "$state";
  import {
    Card,
    Dropdown,
    DropdownGroup,
    Input,
    Search,
  } from "flowbite-svelte";

  const { guildId, apiHost }: { guildId: string; apiHost: string } = $props();
  let guildSearch = $state("");
  const guilds = $derived.by(() => {
    let trimmedSearch = guildSearch.trim().toLowerCase();
    if (guildSearch.trim() === "") return guildsState;
    return guildsState.filter((guild) =>
      guild.name.toLowerCase().includes(trimmedSearch)
    );
  });
  const guild = $derived.by(() => {
    return guildsState.find((g) => g.id === guildId);
  });
</script>

{#if guild}
  <Card
    class="server-card flex flex-row gap-2 items-center
    bg-gradient-to-b from-slate-200 to-slate-300 text-slate-900 dark:from-slate-800 dark:to-slate-900 dark:text-slate-200 
    max-w-none max-h-none h-20 w-full border-none shadow-lg inset-shadow-sm"
  >
    <img
      class="ml-2 rounded-md size-12"
      src={guild.icon
        ? DiscordImage.getGuildIconURL(guild.id, guild.icon)
        : "https://cdn.discordapp.com/embed/avatars/0.png?size=128"}
      alt="{guild.name} icon"
    />
    <h5 class="inline-block text-sm font-semibold">{guild.name}</h5>
  </Card>
  <Dropdown
    class="rounded-md border-none w-48 max-h-[calc(100vh-5rem)] p-1 bg-gray-900"
    triggeredBy=".server-card"
  >
    <Input
      class="w-full h-8 text-sm"
      type="text"
      placeholder="Search servers..."
      bind:value={guildSearch}
      clearable
    />
    <DropdownGroup class="overflow-y-auto h-full my-0.5 py-0 border-none">
      {#each guilds.filter((g) => g.id !== guild.id) as g}
        <Card
          class="flex flex-row gap-2 items-center max-w-none max-h-none h-12 w-full bg-gray-800 text-white my-0.5"
          href="/dashboard/{g.id}"
        >
          <img
            class="ml-3.5 rounded-2xl size-8"
            src={g.icon
              ? DiscordImage.getGuildIconURL(g.id, g.icon)
              : "https://cdn.discordapp.com/embed/avatars/0.png?size=128"}
            alt="{g.name} icon"
          />
          <h5 class="inline-block text-sm font-semibold">{g.name}</h5>
        </Card>
      {/each}
    </DropdownGroup>

    <Card
      class="flex flex-col items-center justify-center max-w-none max-h-none h-12 w-full border-none"
      href="{apiHost}/api/guilds/add"
      target="_blank"
    >
      <span class="text-gray-500">Add a new server</span>
    </Card>
  </Dropdown>
{/if}
