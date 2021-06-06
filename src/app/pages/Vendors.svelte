<script lang="ts">
    import { getContext, onMount } from "svelte";
    import type { DestinyInventoryItemDefinition } from "bungie-api-ts/destiny2";
    import { DestinyItemType } from "bungie-api-ts/destiny2";
    import { fetchResolvedVendors } from "api/destiny2/vendor";
    import type { IVendor } from "api/destiny2/vendor";
    import { bngBaseUrl } from "api/utils/types";
    import type { IManifestContext } from "api/utils/types";

    //:membershipId/:membershipType/:characterId
    export let params;

    const { manifestDefintions } = getContext<IManifestContext>("manifest");

    const { getInventories, selectedCharacterStore } = getContext("characters");
    const inventories = getInventories();

    let vendors: IVendor[];

    let loadingEverything = !$selectedCharacterStore ?? true;
    let loadingBounties = true;

    let items: DestinyInventoryItemDefinition[] =
        inventories[params.characterId];
    onMount(async () => {
        vendors = await fetchResolvedVendors(
            params.membershipId,
            params.membershipType,
            params.characterId,
            $manifestDefintions
        );

        loadingEverything = false;
        loadingBounties = false;
    });

</script>

<div>
    Vendors
    <div>
        {#if loadingEverything}
            loading...
        {:else}
            <img src={$selectedCharacterStore.emblemBackgroundPath} />
            {$selectedCharacterStore.class}
            {$selectedCharacterStore.light}
            {#if loadingBounties}
                <div>loading...</div>
            {:else}
                {#each items as quest}
                    <div style="border: 1px solid black;">
                        {#if quest.displayProperties.hasIcon}
                            <img src={quest.displayProperties.icon} />
                        {/if}
                        {quest.displayProperties.name} -
                        {quest.displayProperties.description}
                    </div>
                {/each}
                {#each vendors as vendor}
                    <div style="border: 1px solid black;">
                        <img src={vendor.icon} />
                        {vendor.name} -
                        {vendor.description}
                        {#if vendor.progression}
                            <div>
                                {vendor.progression.name}
                                <img src={vendor.progression.icon} />
                                {vendor.progression.level}
                                {vendor.progression.progressToNextLevel} / {vendor
                                    .progression.nextLevelAt}
                            </div>
                        {/if}
                        <div>
                            {#each vendor.bounties as bounty}
                                {#if bounty.displayProperties.hasIcon}
                                    <img src={bounty.displayProperties.icon} />
                                {/if}
                                {bounty.displayProperties.name} -
                                {bounty.displayProperties.description}
                                <div>
                                    {#each bounty.objectiveProgress as objective}
                                        {objective.completionValue} -
                                        {objective.objectiveProgressDescription}
                                    {/each}
                                </div>
                            {/each}
                        </div>
                    </div>
                {/each}
            {/if}
        {/if}
    </div>
</div>
