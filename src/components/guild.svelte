<script lang="ts">
  import { Card } from "flowbite-svelte";
  import { DiscordImage } from "$lib";
  import type { APIPartialGuild } from "discord-api-types/v10";

  let { guild }: { guild: APIPartialGuild } = $props();
  //sm:max-w-full sm:basis-full sm:mx-0 md:max-w-1/2 md:basis-48/100
</script>

<li
  class="h-20 shrink-0 grow xl:basis-21/100 xl:max-w-1/4 xl:mx-3 lg:basis-31/100 lg:max-w-1/3 lg:mx-2 md:max-w-1/2 md:basis-48/100 md:mx-1 sm:basis-full sm:max-w-full sm:mx-0"
>
  <Card
    class="flex flex-row gap-2 items-center max-w-none max-h-none h-full w-full "
    href="/dashboard/{guild.id}"
  >
    <img
      class="ml-3.5 rounded-2xl size-12"
      src={guild.icon
        ? DiscordImage.getGuildIconURL(guild.id, guild.icon)
        : "https://cdn.discordapp.com/embed/avatars/0.png?size=128"}
      alt="{guild.name} icon"
    />
    <h5 class="inline-block text-md font-semibold">{guild.name}</h5>
  </Card>
</li>
