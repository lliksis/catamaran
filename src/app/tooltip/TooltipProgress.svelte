<style>
    .progress {
        display: flex;
        position: relative;
        padding: 3px;
    }
    .progress > .checkbox {
        position: relative;
        flex-basis: 20px;
        margin-right: 8px;
        height: 20px;
        background-color: #111;
        box-shadow: 0 0 0 2px black, 0 0 0 3px white;
        align-self: center;
    }
    .progress > .bar {
        position: relative;
        flex-basis: calc(100% - 28px);
    }
    .bar > .text {
        display: grid;
        grid-template-columns: auto max-content;
        flex-basis: 100%;
        border: 0.5px solid #222;
        padding: 2px 5px;
    }
    .bar > .background {
        position: absolute;
        width: 100%;
        height: 100%;
        flex-basis: 80%;
        top: 0;
        z-index: -1;
        background-color: green;
    }
</style>

<script lang="ts">
    import type { ITooltipProgress } from "./Tooltip.types";

    export let progress: ITooltipProgress;

    const progressValue = progress.progressValue / progress.completionValue;
    const checkboxColor = progressValue === 1 ? "green" : "#111";
</script>

<div class="progress">
    <div class="checkbox" style={`background-color: ${checkboxColor}`} />
    <div class="bar">
        <div class="text">
            <div class="description">
                {progress.description}
            </div>
            <div>
                {progress.progressValue}/{progress.completionValue}
            </div>
        </div>
        <div class="background" style={`width: ${progressValue * 100}%`} />
    </div>
</div>
