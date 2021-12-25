<!--
	@component
	This container checks if the manifest and all needed definitions already exist in the browsers storage.
	If not the manifest or single definitons are fetched.
-->
<script lang="ts">
    import { onMount } from "svelte";

    import { checkForManifest } from "api/utils";
    import { getLogger } from "api/utils/logger";

    const logger = getLogger();

    let loading = true;
    onMount(async () => {
        checkForManifest(logger).then(() => {
            loading = false;
        });
    });

</script>

{#if loading}
    loading
{:else}
    <slot />
{/if}
