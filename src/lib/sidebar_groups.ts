import type { SidebarItem } from "$lib";

export const serverGroup: SidebarItem[] = [
  { name: "Overview", href: "", icon: "line-md:home-simple-filled" },
  { name: "Music", href: "music", icon: "line-md:folder-music-filled" },
  { name: "Settings", href: "setting", icon: "line-md:cog-filled" },
];

export const securityGroup: SidebarItem[] = [
  { name: "Antinuke", href: "antinuke", icon: "line-md:alert-twotone" },
  {
    name: "Moderation",
    href: "moderation",
    icon: "line-md:security-twotone",
  },
  {
    name: "Verification",
    href: "verification",
    icon: "line-md:clipboard-check-twotone",
  },
];

export const configurationGroup: SidebarItem[] = [
  { name: "Messages", href: "message", icon: "line-md:chat-round-dots-filled" },
  {
    name: "Starboards",
    href: "starboard",
    icon: "line-md:star-alt-filled",
  },
  { name: "Tickets", href: "ticket", icon: "line-md:email-multiple-twotone" },
  {
    name: "VoiceMaster",
    href: "voicemaster",
    icon: "line-md:volume-high-filled",
  },
  { name: "Levels", href: "level", icon: "jam:medal-f" },
  { name: "Logging", href: "logging", icon: "line-md:list-3-filled" },
];

export const utilitiesGroup: SidebarItem[] = [
  // { name: "Polls", href: "polls" },
  {
    name: "Reminders",
    href: "reminder",
    icon: "line-md:bell-alert-filled",
  },
  { name: "Timers", href: "timer", icon: "material-symbols:timer-5-rounded" },
  { name: "Embeds", href: "embed", icon: "line-md:document-code-twotone" },
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
  { name: "YouTube", href: "youtube", icon: "line-md:youtube-filled" },
  // { name: "Twitter", href: "twitter" },
  { name: "Reddit", href: "reddit", icon: "line-md:reddit-circle" },
];

export const funGroup: SidebarItem[] = [
  { name: "Birthdays", href: "birthdays", icon: "line-md:cake-filled" },
  { name: "Boost Perks", href: "booster-perks", icon: "bxs:party" },
  {
    name: "Reaction Triggers",
    href: "reaction-triggers",
    icon: "ic:round-add-reaction",
  },
  // { name: "Media", href: "media" },
];
