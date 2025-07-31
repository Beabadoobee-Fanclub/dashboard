<script lang="ts">
    import { Button } from "flowbite-svelte";
    import type { LayoutProps } from "./$types";
    let { data }: LayoutProps = $props();
    import { PUBLIC_API_HOST } from "$env/static/public";

    const apiHost = data.apiHost || PUBLIC_API_HOST;
    console.log("API Host:", apiHost);
</script>

<main class="flex flex-col items-center justify-center h-screen">
    <form method="GET" action="{apiHost}/api/auth/login">
        <Button type="submit">
            Login to Discord
        </Button>
    </form>
    <a href="/dashboard">Dashboard</a>

</main>