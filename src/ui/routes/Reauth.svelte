<script lang="ts">
    import { onMount, getContext } from "svelte";
    import { location, querystring } from "svelte-spa-router";

    import { fetchAuthToken } from "api/utils";
    import { getLogger } from "api/utils/Logger";

    const logger = getLogger();
    logger.debug("processing bnet code");

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
