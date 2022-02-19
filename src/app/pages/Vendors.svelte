<style>
    .characters {
        padding-left: 8px;
        height: 100px;
        display: flex;
        align-items: center;
        background: linear-gradient(
            to right,
            var(--backgroundColor),
            transparent
        );
    }
</style>

<script lang="ts">
    import { getContext, onMount } from "svelte";
    import { push } from "svelte-spa-router";
    import type { BungieMembershipType } from "bungie-api-ts/destiny2";
    import { fetchResolvedVendors } from "api/destiny2/vendor";
    import type { IVendor } from "api/destiny2/vendor";
    import type { ICharacterContext, IManifestContext } from "api/utils/types";

    import Vendor from "../vendor/Vendor.svelte";
    import Emblem from "../character/Emblem.svelte";
    import BountyStoreContext from "../BountyStoreContext/BountyStoreContext.svelte";
    import BountyOverview from "../BountyOverview/BountyOverview.svelte";

    //:membershipId/:membershipType/:characterId
    export let params: {
        membershipId: string;
        membershipType: BungieMembershipType;
        characterId: string;
    };

    const { definitions } = getContext<IManifestContext>("manifest");

    const { selectedCharacterStore } =
        getContext<ICharacterContext>("characters");

    let vendors: IVendor[];

    let loadingBounties = true;

    onMount(async () => {
        vendors = await fetchResolvedVendors(
            params.membershipId,
            params.membershipType,
            params.characterId,
            definitions
        );

        loadingBounties = false;
    });
</script>

<BountyStoreContext {params}>
    <BountyOverview {params} />
    <div>
        <div
            class="characters"
            style="--backgroundColor: 
				rgba({$selectedCharacterStore.emblemColor.red}, 
					{$selectedCharacterStore.emblemColor.green},
					{$selectedCharacterStore.emblemColor.blue},
					{$selectedCharacterStore.emblemColor.alpha})"
        >
            <Emblem
                character={$selectedCharacterStore}
                variant="primary"
                onClick={() => push("/")}
            />
        </div>
        {#if loadingBounties}
            <div>loading...</div>
        {:else}
            {#each vendors as vendor}
                <Vendor {vendor} {params} />
            {/each}
        {/if}
    </div>
</BountyStoreContext>
