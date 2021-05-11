<script lang="ts">
    import { onMount } from "svelte";
    import { location, querystring } from "svelte-spa-router";

    import { fetchAuthToken } from "api/utils";

    onMount(async () => {
        const params = new URLSearchParams($querystring);
        await fetchAuthToken(params.get("code"));
        window.location.href = window.location.origin;
    });
</script>

<div>
    location: {$location} <br />
    query: {$querystring}
</div>
