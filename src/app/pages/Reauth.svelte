<script lang="ts">
    import { onMount } from "svelte";
    import { link, navigate, useLocation } from "svelte-navigator";
    import { fetchAuthToken } from "api/utils";
    import { getLogger } from "api/utils/logger";

    const logger = getLogger();
    logger.debug("processing bnet code");

    const location = useLocation();

    onMount(async () => {
        const params = new URLSearchParams($location.search);
        await fetchAuthToken(params.get("code"));
        navigate("app");
    });
</script>

<div>
    If this page is not realoading in 5 seconds, please
    <a href="/" use:link>click here</a>.
</div>
