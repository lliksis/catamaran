<style>
    .menu {
        position: absolute;
        width: 200px;
        box-shadow: 0 4px 5px 3px rgba(0, 0, 0, 0.2);
        background-color: rgb(194, 194, 199);
        z-index: 1;
    }
    .menu.hidden {
        display: none;
    }

    .menu-options {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .menu-option {
        position: relative;
        padding: 10px 20px 10px 20px;
    }
    .menu-option:hover {
        background-color: rgb(191, 191, 199);
    }
    .menu-option.disabled {
        pointer-events: none;
    }
</style>

<script lang="ts">
    export let show = false;
    export let menuItems: {
        text: string;
        action?: () => void;
        disabled: boolean;
    }[];
</script>

<div class="menu" style="left: -200px" class:hidden={!show}>
    <ul class="menu-options">
        {#each menuItems as item}
            <li
                class="menu-option button"
                class:disabled={item.disabled}
                aria-disabled={item.disabled}
                disabled={item.disabled}
                on:click={item.action}
            >
                {item.text}
            </li>
        {/each}
    </ul>
</div>
