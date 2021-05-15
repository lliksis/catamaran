<script lang="ts">
    import { onMount, setContext } from "svelte";
    import { location } from "svelte-spa-router";
    import {
        fetchProfile,
        fetchResolvedCharacters,
        selectedCharacter,
    } from "api/destiny2";
    import { getLogger } from "api/utils";

    // :membershipId/:characterId
    // export let params;
    // params are not defined because the container is outside of the Router.
    // Hacky solution - use the location store:
    const params = $location.split("/");

    let profile;
    let inventories;
    let characters = [];
    let loading = true;

    onMount(async () => {
        profile = await fetchProfile();
        const {
            characters: charactersResponse,
            inventoryItems,
        } = await fetchResolvedCharacters(
            profile.membershipId,
            profile.membershipType
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

    const logger = getLogger();
    logger.debug("setting up character context");
    setContext("characters", {
        getProfile: () => profile,
        getInventories: () => inventories,
        getCharacters: () => characters,
        selectedCharacterStore: selectedCharacter,
    });

</script>

{#if loading}
    loading...
{:else}
    <slot />
{/if}
