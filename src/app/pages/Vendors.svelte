<style>
    .inventory {
        display: inline-block;
        margin: 10px;
    }

    .characters {
        margin-left: 10px;
    }
</style>

<script lang="ts">
    import { getContext, onMount } from "svelte";
    import { push } from "svelte-spa-router";
    import { fetchResolvedVendors } from "api/destiny2/vendor";
    import type { IVendor, IBounty } from "api/destiny2/vendor";
    import type { IManifestContext } from "api/utils/types";

    import Vendor from "../vendor/Vendor.svelte";
    import Emblem from "../character/Emblem.svelte";
    import Bounty from "../vendor/Bounty.svelte";
    import BountyStoreContext from "../BountyStoreContext/BountyStoreContext.svelte";
    import BountyOverview from "../bountyOverview/BountyOverview.svelte";

    //:membershipId/:membershipType/:characterId
    export let params;

    const manifestContext = getContext<IManifestContext>("manifest");

    const { getInventories, selectedCharacterStore } = getContext("characters");
    const inventories = getInventories();

    let vendors: IVendor[];

    let loadingBounties = true;

    let items: IBounty[] = inventories[params.characterId];
    onMount(async () => {
        vendors = await fetchResolvedVendors(
            params.membershipId,
            params.membershipType,
            params.characterId,
            manifestContext.getManifest()
        );

        loadingBounties = false;
    });
</script>

<BountyStoreContext {params}>
    <BountyOverview />
    <div>
        <div class="characters">
            <Emblem
                character={$selectedCharacterStore}
                variant="primary"
                onClick={() => push("/")}
            />
        </div>
        {#if loadingBounties}
            <div>loading...</div>
        {:else}
            <div class="inventory">
                {#each items as bounty}
                    <Bounty {bounty} />
                {/each}
            </div>
            <hr />
            {#each vendors as vendor}
                <Vendor {vendor} />
            {/each}
        {/if}
    </div>
</BountyStoreContext>
