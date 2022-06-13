<script lang="ts">
    import { getContext, onMount } from "svelte";
    import { navigate } from "svelte-navigator";
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
    import SplitLayout from "../layout/SplitLayout.svelte";

    const logger = getLogger();

    export let membershipId: string;
    export let membershipType: string;
    export let characterId: string;
    const params = { membershipId, membershipType, characterId };

    onMount(() => {
        loadingStore.update((l) => ({ ...l, closePage: true }));
    });

    const { getDefinitions } = getContext<IManifestContext>("manifest");
    const definitions = getDefinitions();

    const { selectedCharacterStore } =
        getContext<ICharacterContext>("characters");

    let vendors: IVendor[];

    const vendorResponse = useQuery(
        ["vendors", characterId],
        () => {
            loadingStore.update(() => ({
                closePage: true,
                text: "loading vendors",
            }));
            return getVendors(createFetch(true), {
                characterId: characterId,
                destinyMembershipId: membershipId,
                membershipType:
                    membershipType as unknown as BungieMembershipType,
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
    <SplitLayout>
        <BountyOverview {params} slot="side-panel" />
        <div slot="main-panel">
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
                    onClick={() => navigate("/app")}
                />
            </div>
            {#if !$vendorResponse.isIdle && !$vendorResponse.isLoading}
                {#each vendors as vendor, index}
                    <Vendor {index} {vendor} {params} />
                {/each}
            {/if}
        </div>
    </SplitLayout>
</BountyStoreContext>

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
