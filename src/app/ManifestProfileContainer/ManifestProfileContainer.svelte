<!--
	@component
	This container checks if the manifest and all needed definitions already exist in the browsers storage.
	If not the manifest or single definitons are fetched and loaded into the context.
	Also loads profile and character information.
-->
<script lang="ts">
    import { onMount, setContext } from "svelte";
    import { location } from "svelte-spa-router";
    import { initializeManifest } from "api/utils";
    import { getLogger } from "api/utils/logger";
    import {
        fetchProfile,
        fetchResolvedCharacters,
        selectedCharacter,
    } from "api/destiny2";
    import type {
        ICharacterContext,
        IManifestContext,
        IManifestDefinitions,
    } from "api/utils/types";

    // :membershipId/:characterId
    // export let params;
    // params are not defined because the container is outside of the Router.
    // Hacky solution - use the location store:
    const params = $location.split("/");

    let definitionStore: IManifestDefinitions | undefined = undefined;
    let profile;
    let inventories;
    let characters = [];

    let loading = true;
    let loadingState = "loading manifest";

    const logger = getLogger();

    onMount(async () => {
        // manifest and definitions
        definitionStore = await initializeManifest(logger);

        // profile and characters
        loadingState = "loading profile and characters";
        profile = await fetchProfile();
        const {
            characters: charactersResponse,
            inventoryItems,
        } = await fetchResolvedCharacters(
            profile.membershipId,
            profile.membershipType,
            definitionStore.DestinyClassDefinition,
            definitionStore.DestinyInventoryItemDefinition,
            definitionStore.DestinyObjectiveDefinition
        );

        characters = charactersResponse;
        inventories = inventoryItems;

        let character = undefined;
        if (params.length === 4 && params[3] !== "") {
            character = characters.find(
                (char) => char.characterId === params[3]
            );
            selectedCharacter.update((v) => character);
        }

        loading = false;
    });

    setContext<ICharacterContext>("characters", {
        getProfile: () => profile,
        getInventories: () => inventories,
        getCharacters: () => characters,
        selectedCharacterStore: selectedCharacter,
    });

    setContext<IManifestContext>("manifest", {
        getManifest: () => definitionStore,
    });
</script>

{#if loading}
    {loadingState}
{:else}
    <slot />
{/if}
