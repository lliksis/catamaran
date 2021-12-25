<style>
    .position-top-right {
        position: fixed;
        width: 270px;
        top: 0;
        right: 0;
    }
    .notification {
        align-items: stretch;
        justify-content: space-between;
        margin: 12px;
        background: #fd7d7d7e;
        color: #ffffff;
        font-weight: bolder;
        border-radius: 6px;
        box-shadow: 0 4px 10px #00000016;
    }
    .notification-close {
        float: right;
        cursor: pointer;
        color: #fff;
        width: 22px;
        height: 22px;
        text-align: center;
        line-height: 16px;
        font-size: 20px;
        border-radius: 0 6px 0 0;
        padding: 0;
        box-sizing: border-box;
        transition: background 0.5s;
    }
    .notification-close:hover {
        background: rgba(253, 125, 125, 0.2);
    }
    .content {
        width: 210px;
        padding: 12px 6px 12px 12px;
        box-sizing: border-box;
        word-wrap: break-word;
    }
    .content p {
        font-weight: normal;
        font-size: 14px;
        color: #fff;
        margin: 2px 0 0;
    }
    .content a {
        font-weight: normal;
        font-size: 14px;
        color: rgb(0, 133, 173);
    }

    .progress {
        height: 5px;
        background-color: #fd7d7d7e;
        border-radius: 0 0 6px 6px;
        animation-name: progressAnimation;
    }
    @keyframes progressAnimation {
        from {
            width: 1%;
            border-radius: 0 0 0 6px;
        }
        to {
            width: 100%;
            border-radius: 0 0 6px 6px;
        }
    }

</style>

<script lang="ts">
    import { onDestroy } from "svelte";
    import { fade } from "svelte/transition";

    export let error;
    let type = error.name;
    let description = error.message;
    if (error.status) {
        description += `\n${error.status}`;
    }

    export let time: number = 10;
    export let onRemove = null;

    const timeOut = setTimeout(() => {
        onRemove();
    }, (time + 0.5) * 1000);

    onDestroy(() => {
        clearTimeout(timeOut);
    });

</script>

<div class="position-top-right">
    <div class="notification" role="status" aria-live="polite" in:fade out:fade>
        <div class="notification-close" on:click={onRemove}>&times;</div>
        <div class="content">
            {type}
            <p>{description}</p>
            {#if type === "BungieError"}
                <a href="https://twitter.com/BungieHelp" target="_blank">
                    @BungieHelp
                </a>
            {/if}
        </div>
        <div class="progress" style={`animation-duration: ${time}s;`} />
    </div>
</div>
