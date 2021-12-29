<style>
    .tooltip {
        position: absolute;
        color: white;
        width: 400px;
        z-index: 100;
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
</style>

<script lang="ts">
    import { onDestroy, setContext } from "svelte";
    import { writable } from "svelte/store";

    import type { ITooltip, ITooltipProps } from "./Tooltip.types";
    import TooltipAction from "./TooltipAction.svelte";
    import TooltipProgress from "./TooltipProgress.svelte";

    const tooltipContent = writable<ITooltip>({
        header: null,
        action: null,
        body: null,
    });
    const tooltipProps = writable<ITooltipProps>({
        isHovered: false,
        x: 0,
        y: 0,
        pressing: false,
    });
    setContext("tooltip", tooltipProps);
    setContext("tooltip-content", tooltipContent);

    let content: ITooltip;
    let props: ITooltipProps;

    const unsubscribeContent = tooltipContent.subscribe((value) => {
        content = value;
    });
    const unsubscribeProps = tooltipProps.subscribe((value) => {
        props = value;
    });

    $: isHovered = props.isHovered;
    $: x = props.x;
    $: y = props.y;
    $: pressing = props.pressing;

    $: header = content.header;
    $: action = content.action;
    $: body = content.body;
    $: showBody = body && (body.description || body.progress);

    onDestroy(() => {
        unsubscribeContent();
        unsubscribeProps();
    });
</script>

<slot />
{#if isHovered}
    <div style={`top: ${y}px; left: ${x + 30}px`} class="tooltip">
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
        {#if action}
            <TooltipAction {action} {pressing} />
        {/if}
    </div>
{/if}
