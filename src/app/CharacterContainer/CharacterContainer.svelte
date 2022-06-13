<script lang="ts">
    import { getContext, setContext } from "svelte";
    import { useParams } from "svelte-navigator";
    import { useQuery } from "@sveltestack/svelte-query";
    import {
        DestinyComponentType,
        DestinyProfileUserInfoCard,
        getProfile,
    } from "bungie-api-ts/destiny2";
    import { createFetch, getLogger, loadingStore } from "api/utils";
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
    const params =
        useParams<{
            membershipId: string;
            membershipType: string;
            characterId: string;
        }>();

    const profile: DestinyProfileUserInfoCard = getContext("profile");
    const { getDefinitions } = getContext<IManifestContext>("manifest");
    const definitions = getDefinitions();

    const characterResponse = useQuery(
        ["characters"],
        () => {
            loadingStore.update((l) => ({ ...l, text: "loading characters" }));
            return getProfile(createFetch(true), {
                destinyMembershipId: profile.membershipId,
                membershipType: profile.membershipType,
                components: [
                    DestinyComponentType.Characters,
                    DestinyComponentType.CharacterInventories,
                    DestinyComponentType.CharacterProgressions,
                    DestinyComponentType.ItemObjectives,
                ],
            });
        },
        {
            refetchOnWindowFocus: false,
            staleTime: 600_000, //10 minutes
            refetchInterval: 60_000, //1 minute
            onSuccess: () => {
                loadingStore.update((l) => ({ ...l, text: undefined }));
                logger.info("characters loaded successfully");
            },
        }
    );

    $: if ($characterResponse.data) {
        const bungieResponse = $characterResponse.data.Response;

        const characters = resolveCharacters(
            bungieResponse.characters,
            definitions.DestinyClassDefinition
        );
        if ($params.characterId) {
            const character = characters.find(
                (char) => char.characterId === $params.characterId
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

{#if !$characterResponse.isIdle && !$characterResponse.isLoading}
    <slot />
{/if}
