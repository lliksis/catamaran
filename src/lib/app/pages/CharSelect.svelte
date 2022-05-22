<script lang="ts">
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import type { DestinyProfileUserInfoCard } from 'bungie-api-ts/destiny2';
	import type { IDestinyCharacterComponentOverride } from '../../../api/destiny2/profile';
	import Emblem from '../character/Emblem.svelte';
	import { loadingStore } from '../../../api/utils';

	loadingStore.update((l) => ({ ...l, closePage: false }));

	const { selectedCharacterStore, getCharacters } = getContext('characters');

	const profile: DestinyProfileUserInfoCard = getContext('profile');

	let characters: IDestinyCharacterComponentOverride[] = getCharacters();

	const onClickCharacter = (character: IDestinyCharacterComponentOverride) => {
		selectedCharacterStore.update(() => character);
		goto(`/${profile.membershipId}/${profile.membershipType}/${character.characterId}`);
	};
</script>

<div in:fade class="character-selection">
	<div class="preview">
		<img src="https://freesvg.org/img/paro_AL_standing.png" alt="character preview" />
	</div>
	<div class="characters">
		<div class="name">
			{profile.bungieGlobalDisplayName}
			<span class="code">
				{'#' + profile.bungieGlobalDisplayNameCode}
			</span>
		</div>
		{#each characters as char, index}
			<Emblem {index} character={char} onClick={onClickCharacter} />
		{/each}
	</div>
</div>

<style>
	.character-selection {
		display: grid;
		height: 100%;
		grid-template-areas: 'preview selection';
		grid-template-columns: 50% auto;
		align-items: center;
		justify-items: center;
	}

	.characters {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 15px;
		grid-area: selection;
		margin-bottom: 8vh;
		margin-right: 8vw;
	}

	.name {
		display: inline-block;
		color: white;
		font-size: 2em;
		font-weight: 600;
		letter-spacing: 3px;
	}
	.name .code {
		color: #62d4fe;
	}

	.preview {
		grid-area: preview;
	}

	@media only screen and (max-width: 670px) {
		.character-selection {
			grid-template-areas: 'preview' 'selection';
			grid-template-columns: auto;
			grid-template-rows: 60% auto;
		}

		.characters {
			margin: auto;
		}
	}

	@media only screen and (max-width: 428px) {
		.character-selection {
			grid-template-areas: 'selection';
			align-content: center;
		}

		.preview {
			display: none;
		}
	}
</style>
