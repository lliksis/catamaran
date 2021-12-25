<style>
    .action {
        position: relative;
        background-color: #111111;
        padding: 7px 7px 7px 0px;
        text-align: end;
        height: 100%;
        z-index: 100;
    }
    .action > .background {
        position: absolute;
        height: 100%;
        top: 0;
        z-index: -1;
        background-color: #006891;
    }
    .action > .text {
        z-index: 101;
    }
</style>

<script lang="ts">
    import { tweened } from "svelte/motion";
    import { linear } from "svelte/easing";
    import type { ITooltipAction } from "./Tooltip.types";

    export let action: ITooltipAction;
    const { description, completionTime, callback } = action;
    export let pressing: boolean = false;

    const progress = tweened(0, {
        duration: completionTime,
        easing: linear,
    });

    // setting progress store when pressing
    $: if (pressing) {
        progress.set(1);
    } else {
        progress.set(0, { duration: 50 });
    }

    // firing callback when progress is 1 (100%)
    $: if ($progress === 1) {
        callback();
        progress.set(0, { duration: 0 });
    }
</script>

<div class="action">
    <div class="text">
        <span class="icon-mouse">
            <span class="path1" />
            <span class="path2" />
            <span class="path3" />
            <span class="path4" />
        </span>
        {description}
    </div>
    <div class="background" style={`width: ${$progress * 100}%`} />
</div>
