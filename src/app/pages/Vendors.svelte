<style>
    .character {
        padding-left: 10px;
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
    import { useQuery } from "@sveltestack/svelte-query";
    import {
        BungieMembershipType,
        DestinyComponentType,
        getVendors,
    } from "bungie-api-ts/destiny2";
    import { resolveVendors } from "api/destiny2/vendor";
    import type { IVendor } from "api/destiny2/vendor";
    import type { ICharacterContext, IManifestContext } from "api/utils/types";
    import { createFetch, getLogger, loadingStore } from "api/utils";
    import { getMillisecondsUntilReset } from "api/utils/resetTime";

    import Vendor from "../vendor/Vendor.svelte";
    import Emblem from "../character/Emblem.svelte";
    import BountyStoreContext from "../BountyStoreContext/BountyStoreContext.svelte";
    import BountyOverview from "../BountyOverview/BountyOverview.svelte";

    const logger = getLogger();

    //:membershipId/:membershipType/:characterId
    export let params: {
        membershipId: string;
        membershipType: BungieMembershipType;
        characterId: string;
    };

    onMount(() => {
        loadingStore.update((l) => ({ ...l, closePage: true }));
    });

    const { getDefinitions } = getContext<IManifestContext>("manifest");
    const definitions = getDefinitions();

    const { selectedCharacterStore } =
        getContext<ICharacterContext>("characters");

    let vendors: IVendor[];

    const vendorResponse = useQuery(
        ["vendors", params.characterId],
        () => {
            loadingStore.update((l) => ({
                closePage: true,
                text: "loading vendors",
            }));
            return getVendors(createFetch(true), {
                characterId: params.characterId,
                destinyMembershipId: params.membershipId,
                membershipType: params.membershipType,
                components: [
                    DestinyComponentType.Vendors,
                    DestinyComponentType.VendorCategories,
                    DestinyComponentType.VendorSales,
                    DestinyComponentType.ItemObjectives,
                ],
            });
        },
        {
            staleTime: getMillisecondsUntilReset(),
            cacheTime: Infinity,
            onSuccess: () => {
                loadingStore.update((l) => ({ ...l, text: undefined }));
                logger.info("vendors loaded successfully");
            },
        }
    );

    $: if ($vendorResponse.data) {
        vendors = resolveVendors($vendorResponse.data.Response, definitions);
    }
</script>

<BountyStoreContext {params}>
    <BountyOverview {params} />
    <div>
        <div
            class="character"
            style="--backgroundColor: 
				rgba({$selectedCharacterStore.emblemColor.red}, 
					{$selectedCharacterStore.emblemColor.green},
					{$selectedCharacterStore.emblemColor.blue},
					{$selectedCharacterStore.emblemColor.alpha})"
        >
            <Emblem
                character={$selectedCharacterStore}
                onClick={() => push("/")}
            />
        </div>
        {#if !$vendorResponse.isIdle && !$vendorResponse.isLoading}
            {#each vendors as vendor}
                <Vendor {vendor} {params} />
            {/each}
        {/if}
    </div>
</BountyStoreContext>
