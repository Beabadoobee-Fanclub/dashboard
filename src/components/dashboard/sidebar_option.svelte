<script lang="ts">
  import type { SidebarItem } from "$lib";
  import Icon from "@iconify/svelte";

  const {
    item,
    baseUrl,
    isActive,
  }: { item: SidebarItem; baseUrl: string; isActive: boolean } = $props();
</script>

<li
  class="py-1 px-2 mb-0.5 rounded-md transition-all delay-150 bg-transparent from-slate-200 to-slate-300 {isActive
    ? 'bg-gradient-to-b font-bold text-gray-800'
    : 'hover:bg-gradient-to-b hover:text-gray-800 text-gray-500 font-normal'}"
>
  <a class="flex text-md items-center" href="{baseUrl}/{item.href}">
    <Icon icon={item.icon} class="mr-2" />
    <span class="">{item.name}</span>
  </a>
</li>
