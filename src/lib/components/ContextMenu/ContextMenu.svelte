<script lang="ts">
	import Overlay from 'svelte-overlay';
	import { clickAnywhereElse } from '$lib/api/utils/actions';

	export let menuItems: {
		text: string;
		action?: () => void;
	}[];
	export let disabled: boolean;

	const onItemClick = (close: () => void, action?: () => void) => {
		action?.();
		close();
	};
</script>

<Overlay position="bottom-left" zIndex="998" style="z-index: auto">
	<div
		slot="parent"
		let:open
		let:close
		on:contextmenu|preventDefault={() => {
			if (menuItems && menuItems.length) {
				open();
			}
		}}
		use:clickAnywhereElse
		on:outclick={close}
	>
		<slot />
	</div>
	<div slot="content" class="menu" let:close>
		<ul class="menu-options">
			{#each menuItems as item}
				<li
					class="menu-option button"
					class:disabled
					aria-disabled={disabled}
					{disabled}
					on:click={() => onItemClick(close, item.action)}
				>
					{item.text}
				</li>
			{/each}
		</ul>
	</div>
</Overlay>

<style>
	.menu {
		width: 200px;
		box-shadow: 0 4px 5px 3px rgba(0, 0, 0, 0.2);
		background-color: rgb(194, 194, 199);
		color: rgb(0, 0, 0);
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

	/* @media only screen and (max-width: 770px) {
        .menu {
            top: -45px;
        }
    } */
</style>
