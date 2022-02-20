<style>
    .tooltip-wrapper {
        display: contents;
    }

    .tooltip {
        position: absolute;
        color: white;
        width: 400px;
        z-index: 100;
        top: var(--top);
        left: var(--left);
        pointer-events: none;
    }
    .header {
        background-color: #000000;
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

    @media only screen and (max-width: 770px) {
        .tooltip {
            width: 100vw;
            top: 75px;
            left: var(--mobileLeft);
        }
    }
</style>

<script lang="ts">
    import type { ITooltip } from "./Tooltip.types";
    import TooltipProgress from "./TooltipProgress.svelte";

    let element: HTMLElement;
    $: bottom = element?.getBoundingClientRect().bottom + 5 || 0;
    $: left = element?.getBoundingClientRect().left || 0;

    export let content: ITooltip;
    $: header = content.header;
    $: body = content.body;
    $: showBody = body && (body.description || body.progress);

    let position = { x: 0, y: 0 };
    let hovering = false;

    const onMouseOver = (
        event: MouseEvent & {
            currentTarget: EventTarget & HTMLSpanElement;
        }
    ) => {
        hovering = true;
        calculatePosition(event);
    };
    const onMouseLeave = () => {
        hovering = false;
    };
    const onMouseMove = (
        event: MouseEvent & {
            currentTarget: EventTarget & HTMLDivElement;
        }
    ) => {
        calculatePosition(event);
    };

    const calculatePosition = (
        event: MouseEvent & {
            currentTarget: EventTarget & HTMLSpanElement;
        }
    ) => {
        const { pageX } = event;
        const { innerWidth, innerHeight } = window;

        let x = 75;
        if (pageX + 430 > innerWidth) {
            x = -405;
        }

        let y = 0;
        const diffY = bottom - innerHeight;
        console.log(bottom, innerHeight, diffY);
        if (diffY > 0) {
            y = -diffY;
        }

        position = { x, y };
    };
</script>

<div
    on:mouseover={onMouseOver}
    on:mouseleave={onMouseLeave}
    on:mousemove={onMouseMove}
    class="tooltip-wrapper"
>
    {#if hovering}
        <div
            bind:this={element}
            style={`--top: ${position.y}px; --left: ${
                position.x
            }px; --mobileLeft: ${-left}px`}
            class="tooltip"
        >
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
    {/if}
    <slot />
</div>
