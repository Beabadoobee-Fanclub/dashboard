<script lang="ts">
  import { Button } from "flowbite-svelte";
  import { page } from "$app/state";

  const apiHost = $derived<string>(page.data.apiHost);
  import { guildsState, socketConnection } from "$state";
  import { onMount } from "svelte";

  onMount(() => {
    // Ensure guildsState is initialized
    guildsState.length = 0;
    socketConnection.disconnect();
  });
</script>

<main class="flex flex-col items-center justify-center h-screen">
  <form method="GET" action="{apiHost}/api/auth/login">
    <Button type="submit">Login to Discord</Button>
  </form>
  <a href="/dashboard">Dashboard</a>
</main>
