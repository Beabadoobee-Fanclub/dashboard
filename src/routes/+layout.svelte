<script lang="ts">
  import "../app.css";
  import { socketConnection } from "$state";
  import { onMount } from "svelte";
  import { page } from "$app/state";
  import { DarkMode } from "flowbite-svelte";
  const apiHost = $derived<string>(page.data.apiHost);
  let { children } = $props();

  onMount(() => {
    socketConnection.setHost(apiHost);
  });
</script>

{@render children()}
<DarkMode
  class="fixed size-14 bottom-6 right-6 rounded-lg p-2 shadow-lg hover:shadow-xl flex items-center justify-center
  bg-gradient-to-b from-slate-200 to-slate-300 text-slate-900 dark:from-slate-800 dark:to-slate-900 dark:text-slate-200 
  hover:-translate-y-1
  transition-all duration-300"
  size="lg"
/>
