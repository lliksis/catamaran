<script lang="ts">
    import type { BungieMembershipType } from "bungie-api-ts/destiny2";
    import { onDestroy, setContext } from "svelte";
    import { createBountyStorage, getLogger } from "api/utils";

    const logger = getLogger();

    //:membershipId/:membershipType/:characterId
    export let params: {
        membershipId: string;
        membershipType: BungieMembershipType;
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
