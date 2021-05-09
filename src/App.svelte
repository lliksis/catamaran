<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>

<script lang="ts">
    import { storeManifest } from "api/utils/manifest_db";
    import { onMount } from "svelte";

    export let name: string;
    let loadingState = true;

    const setLoadingState = (loading: boolean) => {
        loadingState = loading;
    };

    onMount(async () => {
        await storeManifest(setLoadingState);
    });
</script>

<main>
    <div>
        {#if loadingState}
            loading manifest...
        {:else}
            Done! Hello {name}
        {/if}
    </div>
</main>
