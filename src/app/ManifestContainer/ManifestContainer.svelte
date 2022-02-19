<!--
	@component
	This container checks if the manifest and all needed definitions already exist in the browsers storage.
	If not the manifest or single definitons are fetched and loaded into the context.
	Also loads profile and character information.
-->
<script lang="ts">
    import { onMount, setContext } from "svelte";
    import { initializeManifest, loadingStore } from "api/utils";
    import { getLogger } from "api/utils/logger";
    import type {
        IManifestContext,
        IManifestDefinitions,
    } from "api/utils/types";

    let definitions: IManifestDefinitions | undefined = undefined;

    let loading = true;
    loadingStore.update((l) => ({ ...l, text: "validating manifest" }));

    const logger = getLogger();

    onMount(async () => {
        // manifest and definitions
        definitions = await initializeManifest(logger);

        loading = false;
    });

    setContext<IManifestContext>("manifest", {
        getDefinitions: () => definitions,
    });
</script>

{#if !loading}
    <slot />
{/if}
