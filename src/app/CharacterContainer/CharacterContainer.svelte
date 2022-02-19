<script lang="ts">
    import { getContext, setContext } from "svelte";
    import { location } from "svelte-spa-router";
    import { useQuery } from "@sveltestack/svelte-query";
    import {
        DestinyComponentType,
        DestinyProfileUserInfoCard,
        getProfile,
    } from "bungie-api-ts/destiny2";
    import { createFetch, getLogger } from "api/utils";
    import {
        resolveCharacters,
        resolveInventory,
        selectedCharacter,
        inventorieStores,
    } from "api/destiny2/profile";
    import type { ICharacterContext, IManifestContext } from "api/utils/types";

    const logger = getLogger();

    // :membershipId/:characterId
    // export let params;
    // params are not defined because the container is outside of the Router.
    // Hacky solution - use the location store:
    const params = $location.split("/");

    const profile: DestinyProfileUserInfoCard = getContext("profile");
    const { definitions } = getContext<IManifestContext>("manifest");

    const characterResponse = useQuery(
        ["characters"],
        () =>
            getProfile(createFetch(true), {
                destinyMembershipId: profile.membershipId,
                membershipType: profile.membershipType,
                components: [
                    DestinyComponentType.Characters,
                    DestinyComponentType.CharacterInventories,
                    DestinyComponentType.CharacterProgressions,
                    DestinyComponentType.ItemObjectives,
                ],
            }),
        {
            refetchOnWindowFocus: false,
            staleTime: 600_000, //10 minutes
            refetchInterval: 60_000, //1 minute
            onSuccess: () => {
                logger.info("characters fetched successfully");
            },
        }
    );

    $: if ($characterResponse.data) {
        const bungieResponse = $characterResponse.data.Response;

        const characters = resolveCharacters(
            bungieResponse.characters,
            definitions.DestinyClassDefinition
        );
        if (params.length === 4 && params[3] !== "") {
            const character = characters.find(
                (char) => char.characterId === params[3]
            );
            selectedCharacter.update((_) => character);
        }

        const inventories = resolveInventory(
            bungieResponse.characterInventories,
            bungieResponse.itemComponents.objectives,
            definitions.DestinyInventoryItemDefinition,
            definitions.DestinyObjectiveDefinition
        );
        inventorieStores.update((_) => inventories);

        setContext<ICharacterContext>("characters", {
            inventories: inventorieStores,
            getCharacters: () => characters,
            selectedCharacterStore: selectedCharacter,
        });
    }
</script>

{#if $characterResponse.isIdle || $characterResponse.isLoading}
    loading characters
{:else}
    <slot />
{/if}
