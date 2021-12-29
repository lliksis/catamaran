<script lang="ts">
    import { createBountyStorage, getLogger } from "api/utils";
    import { getContext, onDestroy, setContext } from "svelte";

    const logger = getLogger();

    //:membershipId/:membershipType/:characterId
    export let params;

    const store = createBountyStorage(params.characterId);
    setContext("bounty", store);

    const unsubscribe = store.store.subscribe(() => {
        logger.debug("Bounty store updated for " + params.characterId);
    });

    onDestroy(unsubscribe);
</script>

<slot />
