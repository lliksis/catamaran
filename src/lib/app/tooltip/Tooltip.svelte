<style>
    .tooltip {
        color: white;
        background-color: #000000;
        width: 400px;
        margin: 0 10px;
        pointer-events: none;
    }
    .header {
        font-size: 25px;
        padding: 7px;
    }
    .header > .subtitle {
        font-size: 15px;
        font-weight: 600;
        color: #ffffff;
        padding-left: 3px;
    }
    .content {
        background-color: #111111;
        opacity: 0.9;
        padding: 7px;
    }
    .description {
        margin-bottom: 7px;
    }
    .error {
        background-color: #710000;
        padding: 2px 7px;
    }

    /* @media only screen and (max-width: 770px) {
        .tooltip {
            width: 95vw;
            top: 75px;
            left: calc(var(--mobileLeft) + 2.5vw);
        }
    } */
</style>

<script lang="ts">
    import Overlay from "svelte-overlay";
    import type { ITooltip } from "./Tooltip.types";
    import TooltipProgress from "./TooltipProgress.svelte";

    export let content: ITooltip;
    $: header = content.header;
    $: body = content.body;
    $: showBody = body && (body.description || body.progress);
</script>

<Overlay
    position="right-bottom"
    class="tooltip"
    zIndex="999"
    style="z-index: auto"
>
    <div
        slot="parent"
        let:open
        let:close
        on:mouseenter={open}
        on:mouseleave={close}
    >
        <slot />
    </div>

    <div slot="content" class="tooltip">
        <div class="header">
            {header.title}
            {#if header.subTitle}
                <div class="subtitle">
                    {header.subTitle}
                </div>
            {/if}
        </div>
        {#if body.error}
            <div class="error">{body.error}</div>
        {/if}
        {#if showBody}
            <div class="content">
                {#if body.description}
                    <div class="description">
                        {body.description}
                    </div>
                {/if}
                {#if body.progress}
                    {#each body.progress as progress}
                        <TooltipProgress {progress} />
                    {/each}
                {/if}
            </div>
        {/if}
    </div>
</Overlay>
