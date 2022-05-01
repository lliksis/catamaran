<style>
    .menu {
        position: absolute;
        width: 200px;
        box-shadow: 0 4px 5px 3px rgba(0, 0, 0, 0.2);
        background-color: rgb(194, 194, 199);
        color: rgb(0, 0, 0);
        z-index: 1;
        top: 75px;
        left: var(--mouse-x);
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

    @media only screen and (max-width: 770px) {
        .menu {
            top: -45px;
        }
    }
</style>

<script lang="ts">
    import { clickAnywhereElse } from "../../api/utils/actions";

    export let menuItems: {
        text: string;
        action?: () => void;
    }[];
    export let disabled: boolean;
    let position: { x: number } = { x: 0 };
    let show = false;

    const calculatePosition = (
        event: MouseEvent & {
            currentTarget: EventTarget & HTMLSpanElement;
        }
    ) => {
        const { pageX } = event;

        let x = -130;
        if (pageX + x < 0) {
            x = 0;
        }

        position = { x };
    };

    const onItemClick = (action?: () => void) => {
        action?.();
        show = false;
    };
</script>

{#if menuItems && menuItems.length > 0}
    <div
        class="menu"
        style={`--mouse-x: ${position.x}px;`}
        class:hidden={!show}
    >
        <ul class="menu-options">
            {#each menuItems as item}
                <li
                    class="menu-option button"
                    class:disabled
                    aria-disabled={disabled}
                    {disabled}
                    on:click={() => onItemClick(item.action)}
                >
                    {item.text}
                </li>
            {/each}
        </ul>
    </div>
{/if}
<div
    on:contextmenu|preventDefault={(event) => {
        calculatePosition(event);
        show = true;
        return false;
    }}
    use:clickAnywhereElse
    on:outclick={() => (show = false)}
>
    <slot />
</div>
