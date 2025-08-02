<script lang="ts">
  import { DiscordImage } from "$lib";
  import type { APIUser } from "discord-api-types/v10";
  import {
    Avatar,
    Dropdown,
    DropdownGroup,
    DropdownHeader,
    DropdownItem,
  } from "flowbite-svelte";

  const { user, apiHost }: { user: APIUser; apiHost: string } = $props();
  const avatarProfilePicture: string = user.avatar
    ? DiscordImage.getAvatarURL(user.id, user.avatar, 128)
    : "https://cdn.discordapp.com/embed/avatars/0.png?size=128";
</script>

<section
  class="flex items-center justify-between px-4 py-2 box-border bg-gray-100 dark:bg-gray-800 w-screen"
>
  <h1 class="text-lg font-black">BEABot</h1>
  <Avatar class="acs" src={avatarProfilePicture} alt="{user.username} avatar" />
  <Dropdown triggeredBy=".acs" placement="bottom-end">
    <DropdownHeader>
      <span class="text-sm font-semibold">{user.username}</span>
      <span class="text-xs text-gray-500">{user.id}</span>
    </DropdownHeader>
    <DropdownGroup>
      <DropdownItem>
        <form method="GET" action="{apiHost}/api/auth/logout">
          <button type="submit">Logout</button>
        </form>
      </DropdownItem>
    </DropdownGroup>
  </Dropdown>
</section>
