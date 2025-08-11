<script lang="ts">
  import { onMount, setContext } from "svelte";
  import { socketConnection } from "$state";
  import { page } from "$app/state";
  import Sidebar from "$components/dashboard/sidebar.svelte";
  import { onNavigate } from "$app/navigation";
  import type { LayoutProps } from "./$types";
  import { Breadcrumb, BreadcrumbItem } from "flowbite-svelte";
  import Icon from "@iconify/svelte";

  let { children, data }: LayoutProps = $props();
  let guildId = $derived(page.params.guildid ?? ""); // Check if guildid is valid from api
  const apiHost = $derived(data.apiHost);
  let isLoading = $state(false);
  const currentPath = $derived(
    page.url.pathname.replace(`/dashboard/${guildId}`, "").split("/")
  );

  const breadcrumbItems = $derived(
    currentPath.map((path, index) => ({
      label:
        path === "" ? "Overview" : path.charAt(0).toUpperCase() + path.slice(1),
      href: `/dashboard/${guildId}/${currentPath.slice(0, index + 1).join("/")}`,
    }))
  );

  onMount(() => {
    if (guildId.length == 0) return (location.href = "/dashboard");
    socketConnection.connect(guildId);
  });

  onNavigate((navigation) => {
    if (!document.startViewTransition) return;
    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });
</script>

<div class="grid grid-cols-[auto_1fr]">
  <Sidebar {guildId} {apiHost} {currentPath} bind:isLoading />
  <main class="p-5 pl-3">
    <div id="breadcrumb">
      <Breadcrumb class="mb-5">
        {#each breadcrumbItems as item, index}
          <BreadcrumbItem href={item.href}>
            {item.label}
          </BreadcrumbItem>
        {/each}
      </Breadcrumb>
    </div>
    {#if isLoading}
      <div class="flex items-center justify-center h-64">
        <Icon icon="line-md:loading-loop" class="animate-spin" />
      </div>
    {:else}
      {@render children()}
    {/if}
  </main>
</div>

<style>
  #breadcrumb {
    view-transition-name: breadcrumb;
  }
  @keyframes fade-in {
    from {
      opacity: 0;
    }
  }

  @keyframes fade-out {
    to {
      opacity: 0;
    }
  }

  @keyframes scale-up-center {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.025);
    }
  }
  @keyframes scale-down-center {
    0% {
      transform: scale(1.025);
    }
    100% {
      transform: scale(1);
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    :root::view-transition-old(root) {
      animation:
        250ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
        250ms cubic-bezier(0.39, 0.575, 0.565, 1) both scale-up-center;
    }

    :root::view-transition-new(root) {
      animation:
        250ms cubic-bezier(0, 0, 0.2, 1) both fade-in,
        250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) both scale-down-center;
    }
  }
</style>
