<script lang="ts">
  import { type SidebarItem } from "$lib";
  import SidebarOption from "./sidebar_option.svelte";
  import { fade } from "svelte/transition";
  const {
    info,
    guildId,
    currentPath,
    wrapperDelay,
  }: {
    info: {
      name: string;
      id: string;
      items: SidebarItem[];
    };
    guildId: string;
    currentPath: string[];
    wrapperDelay: number;
  } = $props();

  const groupId = info.id.length == 0 ? "" : `/${info.id}`;
  const baseUrl = `/dashboard/${guildId}${groupId}`;
</script>

<li class="mb-4" transition:fade={{ delay: wrapperDelay, duration: 300 }}>
  <h3 class="text-[0.875rem] lowercase text-gray-500 mb-1">{info.name}</h3>
  <ul class="list-none">
    {#each info.items as item, i}
      <SidebarOption
        {item}
        {baseUrl}
        isActive={currentPath[currentPath.length - 1] === item.href}
        wrapperDelay={i * 100 + wrapperDelay}
      />
    {/each}
  </ul>
</li>
