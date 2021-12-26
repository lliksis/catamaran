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

    //:membershipId/:membershipType/:characterId
    export let params;

    const manifestContext = getContext<IManifestContext>("manifest");

    const { getInventories, selectedCharacterStore } = getContext("characters");
    const inventories = getInventories();

    let vendors: IVendor[];

    let loadingEverything = !$selectedCharacterStore ?? true;
    let loadingBounties = true;

    let items: IBounty[] = inventories[params.characterId];
    onMount(async () => {
        vendors = await fetchResolvedVendors(
            params.membershipId,
            params.membershipType,
            params.characterId,
            manifestContext.getManifest()
        );

        loadingEverything = false;
        loadingBounties = false;
    });
</script>

<div>
    {#if loadingEverything}
        loading...
    {:else}
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
    {/if}
</div>
