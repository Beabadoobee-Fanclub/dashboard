import type { SidebarItem } from "$lib";

export const serverGroup: SidebarItem[] = [
  { name: "Overview", href: "", icon: "material-symbols:home-rounded" },
  { name: "Music", href: "music", icon: "material-symbols:music-note-rounded" },
  { name: "Settings", href: "setting", icon: "material-symbols:settings" },
];

export const securityGroup: SidebarItem[] = [
  { name: "Antinuke", href: "antinuke", icon: "material-symbols:fingerprint" },
  {
    name: "Moderation",
    href: "moderation",
    icon: "material-symbols:person-shield-rounded",
  },
  {
    name: "Verification",
    href: "verification",
    icon: "material-symbols:verified-user-rounded",
  },
];

export const configurationGroup: SidebarItem[] = [
  { name: "Messages", href: "message", icon: "ant-design:message-filled" },
  {
    name: "Starboards",
    href: "starboard",
    icon: "material-symbols:star-rounded",
  },
  { name: "Tickets", href: "ticket", icon: "famicons:ticket" },
  { name: "VoiceMaster", href: "voicemaster", icon: "stash:headset-solid" },
  { name: "Levels", href: "level", icon: "jam:medal-f" },
  { name: "Logging", href: "logging", icon: "solar:list-outline" },
];

export const utilitiesGroup: SidebarItem[] = [
  // { name: "Polls", href: "polls" },
  {
    name: "Reminders",
    href: "reminder",
    icon: "material-symbols:notifications-unread",
  },
  { name: "Timers", href: "timer", icon: "material-symbols:timer-5-rounded" },
  { name: "Embeds", href: "embed", icon: "tabler:code" },
  // { name: "Countdowns", href: "countdown", icon: "material-symbols:alarm-rounded" },
  // { name: "Webhooks", href: "webhooks" },
  {
    name: "Custom Commands",
    href: "custom-command",
    icon: "material-symbols:keyboard-command-key",
  },
];
export const socialIntegrationGroup: SidebarItem[] = [
  { name: "Twitch", href: "twitch", icon: "mdi:twitch" },
  { name: "YouTube", href: "youtube", icon: "mdi:youtube" },
  // { name: "Twitter", href: "twitter" },
  { name: "Reddit", href: "reddit", icon: "mdi:reddit" },
];

export const funGroup: SidebarItem[] = [
  { name: "Birthdays", href: "birthdays", icon: "mingcute:birthday-2-fill" },
  { name: "Boost Perks", href: "booster-perks", icon: "bxs:party" },
  {
    name: "Reaction Triggers",
    href: "reaction-triggers",
    icon: "ic:round-add-reaction",
  },
  // { name: "Media", href: "media" },
];
