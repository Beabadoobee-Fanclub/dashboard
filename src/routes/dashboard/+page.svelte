<script lang="ts">
  import { page } from "$app/state";
  import { guildsState, socketConnection, userState } from "$state";
  import { Card, Input, Search } from "flowbite-svelte";
  import Guild from "$components/guild.svelte";
  import { CirclePlusSolid } from "flowbite-svelte-icons";
  import { onMount } from "svelte";
  import Topbar from "$components/topbar.svelte";

  const apiHost = $derived<string>(page.data.apiHost);
  const user = $derived(userState.discord);

  let guildSearch = $state<string>("");
  const guildList = $derived.by(() => {
    let trimmedSearch = guildSearch.trim().toLowerCase();
    if (guildSearch.trim() === "") return guildsState;
    return guildsState.filter((guild) =>
      guild.name.toLowerCase().includes(trimmedSearch)
    );
  });

  onMount(() => {
    socketConnection.disconnect();
  });
</script>

<div class="flex flex-col h-screen w-screen p-0 m-0 relative">
  <Topbar user={user!} {apiHost} />
  <main class="w-full h-full p-4">
    <Search
      class="sm:w-1/2 mx-auto max-w-full mb-4"
      placeholder="Search guilds..."
      bind:value={guildSearch}
      inputClass="w-full h-10 text-sm"
      clearable
    />
    <ul class="flex flex-wrap gap-y-4 w-full overflow-y-auto">
      {#each guildList as guild}
        <Guild {guild} />
      {/each}
      <li
        class="block h-20 sm:aspect-square w-full sm:w-20 lg:mx-2 md:mx-1 sm:mx-0 xl:mx-3"
      >
        <Card
          class="flex flex-col items-center justify-center max-w-none max-h-none h-full w-full"
          href="{apiHost}/api/guilds/add"
          target="_blank"
        >
          <CirclePlusSolid class="size-10" />
        </Card>
      </li>
    </ul>
  </main>
</div>
