<script lang="ts">
    import { onDestroy, setContext } from "svelte";
    import { createBountyStorage, getLogger } from "api/utils";

    const logger = getLogger();

    //:membershipId/:membershipType/:characterId
    export let params: {
        membershipId: string;
        membershipType: string;
        characterId: string;
    };

    const store = createBountyStorage(parseInt(params.characterId));
    setContext("bounty", store);

    const unsubscribe = store.store.subscribe(() => {
        logger.debug("Bounty store updated for " + params.characterId);
    });

    onDestroy(unsubscribe);
</script>

<slot />
