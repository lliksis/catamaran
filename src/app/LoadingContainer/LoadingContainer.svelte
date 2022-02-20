<style>
    .loading-container {
        position: relative;
        width: 100vw;
        height: 100%;
        background: linear-gradient(
                217deg,
                rgba(255, 0, 0, 0.8),
                rgba(255, 0, 0, 0) 70.71%
            ),
            linear-gradient(
                127deg,
                rgba(0, 255, 0, 0.8),
                rgba(0, 255, 0, 0) 70.71%
            ),
            linear-gradient(
                336deg,
                rgba(0, 0, 255, 0.8),
                rgba(0, 0, 255, 0) 70.71%
            );
    }

    .loading-text {
        position: fixed;
        bottom: 2vh;
        right: 4vw;
        padding: 10px;
        color: white;
        z-index: 1;
    }

    .loading-text-on-page {
        bottom: 25vh;
        right: 20vw;
    }
</style>

<script lang="ts">
    import { loadingStore } from "api/utils";
    import Spinner from "./Spinner.svelte";

    $: show =
        $loadingStore.closePage !== undefined ? !$loadingStore.closePage : true;
</script>

<div class:loading-container={show}>
    <div class="loading-text" class:loading-text-on-page={show}>
        {$loadingStore.text || ""}
        <Spinner hidden={!$loadingStore.text} />
    </div>
    <slot />
</div>
