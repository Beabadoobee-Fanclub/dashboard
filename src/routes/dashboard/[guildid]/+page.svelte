<script lang="ts">
    import { Accordion, AccordionItem, Card, Dropdown, DropdownDivider, DropdownGroup, DropdownItem, Listgroup, ListgroupItem } from "flowbite-svelte";

    interface SideBarItem {
        name: string;
        id: string;
    }

    const serverGroup: SideBarItem[] = [
        { name: "Overview", id: "overview" },
        { name: "Music", id: "music" },
        { name: "Settings", id: "settings" },
    ]

    const securityGroup: SideBarItem[] = [
        { name: "Antinuke", id: "antinuke" },
        { name: "Moderation", id: "moderation" },
        { name: "Verification",id: "verification" }
    ];

    const configurationGroup: SideBarItem[] = [
        { name: "Messages", id: "messages" },
        { name: "Starboards", id: "starboards" },
        { name: "VoiceMaster", id: "voicemaster" },
        { name: "Moderation", id: "moderation" },
        { name: "Levels", id: "levels" },
        { name: "Reaction Triggers", id: "reaction-triggers" },
        { name: "Logging", id: "logging" },
    ];

    const utilitiesGroup: SideBarItem[] = [
        { name: "Polls", id: "polls" },
        { name: "Reminders", id: "reminders" },
        { name: "Timers", id: "timers" },
        { name: "Embeds", id: "embeds" },
        { name: "Countdowns", id: "countdowns" },
        { name: "Webhooks", id: "webhooks" },
        { name: "Custom Commands", id: "custom-commands" },
    ];

    const socialIntegrationGroup: SideBarItem[] = [
        { name: "Twitch", id: "twitch" },
        { name: "YouTube", id: "youtube" },
        { name: "Twitter", id: "twitter" },
        { name: "Reddit", id: "reddit" },
    ];

    const funGroup: SideBarItem[] = [
        { name: "Birthdays", id: "birthdays" },
        { name: "Boost Perks", id: "boost-perks" },
        { name: "Media", id: "media" }
    
    ];
    
    const serverGroups = [
        { name: "Security", items: securityGroup },
        { name: "Configuration", items: configurationGroup },
        { name: "Utilities", items: utilitiesGroup },
        { name: "Social Integration", items: socialIntegrationGroup },
        { name: "Fun", items: funGroup },
    ];
</script>

<div class="flex flex-row h-full w-full relative">
    <nav class="w-64 h-full bg-white box-content px-3 py-2 overflow-y-auto border-r border-gray-200 dark:bg-gray-900 dark:border-gray-700 ">
        <Card
            class="server-card flex flex-row items-center box-border px-2 py-2 justify-start gap-2 w-full rounded-md border-black border-2"
        >
            <img
                class="rounded-full size-8"
                src="https://cdn.discordapp.com/embed/avatars/0.png?size=128"
                alt="icon"
            />
            <h6 class="font-bold text">Discord Server Name</h6>
        </Card>
        <Dropdown class="rounded-md border-black border-2" triggeredBy=".server-card">
            <DropdownGroup>
                <Card
            class="server-card flex flex-row items-center box-border px-2 py-2 justify-start gap-2 w-full"
        >
            <img
                class="rounded-full size-8"
                src="https://cdn.discordapp.com/embed/avatars/0.png?size=128"
                alt="icon"
            />
            <h6 class="font-bold text">Discord Server Name</h6>
        </Card>
            </DropdownGroup>
            <DropdownDivider />
        
            <DropdownGroup>
                <DropdownItem href="/dashboard/join">
                    Add new server
                </DropdownItem>
            </DropdownGroup>
        </Dropdown>
        <Listgroup class="bg-transparent border-none">
            {#each serverGroup as item}
                <ListgroupItem class="border-none" >
                    {item.name}
                </ListgroupItem>
            {/each}
        </Listgroup>
        <Accordion class="border-none rounded-none" multiple>
            {#each serverGroups as group}
                <AccordionItem classes={{content: "p-0 border-none rounded-none", button: "px-2 py-1 border-none rounded-none bg-transparent"}} open>
                    {#snippet header()}
                        {group.name}
                    {/snippet}
                    <Listgroup class="bg-transparent border-none">
                        {#each group.items as item}
                            <ListgroupItem class="border-none">
                                {item.name}
                            </ListgroupItem>
                        {/each}
                    </Listgroup>
                </AccordionItem>
            {/each}
        </Accordion>
    </nav>
    <main class="w-full h-full bg-blue-700"></main>
</div>
