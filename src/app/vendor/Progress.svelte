<style>
    .progression {
        height: 100px;
        width: 100px;
        background-size: auto 100%;
    }
    path {
        stroke: rgb(0, 205, 219);
        border: 0.4px solid black;
        stroke-width: 3;
        fill: none;
    }

</style>

<script lang="ts">
    import { onMount } from "svelte";
    import type { IVendorProgression } from "api/destiny2";

    export let progression: IVendorProgression;

    onMount(() => {
        const bar = document.querySelector("path");
        const length = bar.getTotalLength() + 2;
        bar.style.strokeDasharray = length + "," + length;
        bar.style.strokeDashoffset = `${
            length -
            (progression.progressToNextLevel / progression.nextLevelAt) * length
        }`;
    });

</script>

<div class="progression" style={`background-image: url(${progression.icon})`}>
    <svg width="100px" height="100px">
        <path d="M50,2 98,50 50,98 2,50 50,2" />
    </svg>
</div>
