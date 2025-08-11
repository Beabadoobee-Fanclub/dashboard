<script lang="ts">
  import type { SidebarItem } from "$lib";
  import Icon from "@iconify/svelte";
  import { fade } from "svelte/transition";
  const {
    item,
    baseUrl,
    isActive,
    wrapperDelay,
  }: {
    item: SidebarItem;
    baseUrl: string;
    isActive: boolean;
    wrapperDelay: number;
  } = $props();
</script>

<li
  transition:fade={{ delay: wrapperDelay, duration: 300 }}
  id={isActive ? "active" : ""}
  class="py-1 px-2 mb-0.5 rounded-md bg-transparent from-slate-200 to-slate-300 {isActive
    ? 'bg-gradient-to-b font-bold text-slate-900 dark:text-slate-200'
    : 'hover:bg-gradient-to-b text-slate-500 dark:text-slate-500 font-normal'}
    from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900"
>
  <a class="flex text-md items-center" href="{baseUrl}/{item.href}">
    <Icon icon={item.icon} class="mr-2" />
    <span class="">{item.name}</span>
  </a>
</li>
