<script lang="ts">
  import "../app.css";
  import { socketConnection } from "$state";
  import { onMount } from "svelte";
  import { DarkMode } from "flowbite-svelte";
  import Icon from "@iconify/svelte";
  import type { LayoutProps } from "./$types";

  let { children, data }: LayoutProps = $props();
  const apiHost = $derived(data.apiHost);

  onMount(() => {
    socketConnection.setHost(apiHost);
  });
</script>

{@render children()}
<div id="dark-mode-button" class="fixed z-10 size-14 bottom-6 right-6">
  <DarkMode
    class="size-full rounded-lg p-2 shadow-lg hover:shadow-xl flex items-center justify-center
    bg-gradient-to-b from-slate-200 to-slate-300 text-slate-900 dark:from-slate-800 dark:to-slate-900 dark:text-slate-200 
    hover:-translate-y-1 transition-all duration-300"
    size="lg"
  >
    {#snippet lightIcon()}
      <Icon
        icon="line-md:sunny-filled"
        class="text-2xl text-gray-500 dark:text-gray-400"
      />
    {/snippet}
    {#snippet darkIcon()}
      <Icon
        icon="line-md:moon-filled"
        class="text-2xl text-gray-500 dark:text-gray-400"
      />
    {/snippet}
  </DarkMode>
</div>

<style>
  #dark-mode-button {
    view-transition-name: dark-mode-button;
  }
</style>
