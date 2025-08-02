<script lang="ts">
  import { type SidebarItem } from "$lib";
  import SidebarOption from "./sidebar_option.svelte";
  const {
    info,
    guildId,
    currentPath,
  }: {
    info: {
      name: string;
      id: string;
      items: SidebarItem[];
    };
    guildId: string;
    currentPath: string[];
  } = $props();

  const groupId = info.id.length == 0 ? "" : `/${info.id}`;
  const baseUrl = `/dashboard/${guildId}${groupId}`;
</script>

<li class="mb-4">
  <h3 class="text-[0.875rem] lowercase text-gray-500 mb-1">{info.name}</h3>
  <ul class="list-none">
    {#each info.items as item}
      <SidebarOption
        {item}
        {baseUrl}
        isActive={currentPath[currentPath.length - 1] === item.href}
      />
    {/each}
  </ul>
</li>
