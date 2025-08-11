<script lang="ts">
  import type { APIUser } from "discord-api-types/v10";
  import { userState } from "$state";

  const { guildId, apiHost }: { guildId: string; apiHost: string } = $props();
  import { DiscordImage } from "$lib";
  import Icon from "@iconify/svelte";
  import { Button, Dropdown } from "flowbite-svelte";

  const user = userState.discord as APIUser;

  const avatarURL = $derived(
    user.avatar
      ? DiscordImage.getAvatarURL(user.id, user.avatar, 128)
      : DiscordImage.getDefaultImageURL(128)
  );
</script>

<section
  class="user-profile flex flex-row items-center gap-2 h-20 mb-5 mt-2 rounded-md px-2 hover:bg-gray-300 hover:dark:bg-slate-800"
>
  <img
    class="rounded-full size-9"
    src={avatarURL}
    alt="{user.username}'s avatar"
  />
  <div>
    <h2 class="text-sm font-bold">{user.global_name || user.username}</h2>
    <p class="text-xs font-light text-gray-400">{user.id}</p>
  </div>
  <!-- <Icon icon="mdi:chevron-right" /> -->
</section>
<Dropdown class="w-48" triggeredBy=".user-profile">
  <form method="GET" action="{apiHost}/api/auth/logout">
    <Button type="submit">logout</Button>
  </form>
</Dropdown>
