<script lang="ts">
  import { onMount } from "svelte";
  import { socketConnection } from "$state";
  let { children } = $props();

  import { page } from "$app/state";
  import Sidebar from "$components/dashboard/sidebar.svelte";
  const guildId = $derived(page.params.guildid ?? "");
  const apiHost = $derived<string>(page.data.apiHost);
  onMount(() => {
    if (guildId.length == 0) return (location.href = "/dashboard");
    socketConnection.connect(guildId);
  });
</script>

<div class="grid grid-cols-[auto_1fr]">
  <Sidebar {guildId} {apiHost} />
  <main class="p-4">
    {@render children()}
  </main>
</div>
