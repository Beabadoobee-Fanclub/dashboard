<script lang="ts">
  import { onMount } from "svelte";
  import type { PageProps } from "./$types";
  import { Button, Input, Label, Select } from "flowbite-svelte";
  import Icon from "@iconify/svelte";

  const { data, params }: PageProps = $props();
  const apiHost = $derived<string>(data.apiHost);
  const guildId = $derived<string>(params.guildid);

  let currentlyLoading = $state(true);
  let form: HTMLFormElement;

  let currentSettings: {
    id: string;
    prefix: string;
    language: string;
  } = $state({
    id: "",
    prefix: "",
    language: "en",
  });

  const language_options = [
    { name: "English", value: "en" },
    { name: "Français", value: "fr", disabled: true },
  ];

  onMount(async () => {
    await getCurrentSettings().then(() => {
      currentlyLoading = false;
    });
  });

  async function getCurrentSettings() {
    currentlyLoading = true;
    const response = await fetch(`${apiHost}/api/guilds/${guildId}/settings`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch current settings");
    }

    currentSettings = await response.json<typeof currentSettings>();
  }

  async function saveSettings(
    event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }
  ) {
    const response = await fetch(`${apiHost}/api/guilds/${guildId}/settings`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(currentSettings),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      currentlyLoading = false;
      const body = await response.text();
      console.error("Error saving settings:", body);
      throw new Error("Failed to save settings");
    }

    currentSettings = await response.json<typeof currentSettings>();
  }

  async function resetSettings() {
    currentlyLoading = true;
    const response = await fetch(`${apiHost}/api/guilds/${guildId}/settings`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      currentlyLoading = false;
      throw new Error("Failed to reset settings");
    }

    currentSettings = await response.json<typeof currentSettings>();
    currentlyLoading = false;
  }
</script>

<section class="flex flex-col items-center justify-center p-4">
  {#if currentlyLoading}
    <div class="flex items-center justify-center h-64">
      <Icon icon="line-md:loading-loop" class="animate-spin" />
    </div>
  {/if}
  {#if !currentlyLoading}
    <form
      bind:this={form}
      class="flex flex-col w-1/2 gap-2"
      onsubmit={saveSettings}
    >
      <Label>
        Prefix
        <Input bind:value={currentSettings.prefix} />
      </Label>
      <Label>
        Language
        <Select
          items={language_options}
          bind:value={currentSettings.language}
        />
      </Label>
      <div class="flex justify-end gap-2 mt-4">
        <Button type="submit">Save Settings</Button>
        <Button type="button" onclick={resetSettings}>Reset Settings</Button>
      </div>
    </form>
  {/if}
</section>
