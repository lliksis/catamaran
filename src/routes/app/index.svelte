<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import {
		getLinkedProfiles,
		BungieMembershipType,
		getProfile,
		DestinyComponentType
	} from 'bungie-api-ts/destiny2';
	import { createFetch } from '$lib/api/utils';

	export const load: Load = async ({ fetch, session }) => {
		const profileResponse = await getLinkedProfiles(createFetch(), {
			membershipType: BungieMembershipType.BungieNext,
			membershipId: session.authToken.bungieMembershipId,
			getAllMemberships: false
		});
		const profile = profileResponse.Response.profiles[0];

		const charactersResponse = await getProfile(createFetch(true), {
			destinyMembershipId: profile.membershipId,
			membershipType: profile.membershipType,
			components: [
				DestinyComponentType.Characters,
				DestinyComponentType.CharacterInventories,
				DestinyComponentType.CharacterProgressions,
				DestinyComponentType.ItemObjectives
			]
		});

		return {
			status: 200,
			cache: {
				maxage: 3600,
				private: true
			},
			props: {
				profile,
				characters: charactersResponse.Response
			}
		};
	};
</script>

<script lang="ts">
	import { useQuery } from '@sveltestack/svelte-query';
	import type {
		DestinyProfileUserInfoCard,
		DestinyProfileResponse,
		DestinyCharacterComponent,
		DestinyInventoryComponent,
		DestinyItemObjectivesComponent,
		DictionaryComponentResponse
	} from 'bungie-api-ts/destiny2';
	import manifestStore from '$lib/stores/manifest';
	import { resolveCharacters, resolveInventory } from '$lib/api/destiny2';

	export let profile: DestinyProfileUserInfoCard;
	export let characters: DestinyProfileResponse;

	const onResolveCharacters = (
		characters: DictionaryComponentResponse<DestinyCharacterComponent>
	) => resolveCharacters(characters, $manifestStore.DestinyClassDefinition ?? {});

	const onResolveInventory = (
		inventories: DictionaryComponentResponse<DestinyInventoryComponent>,
		objectives: DictionaryComponentResponse<DestinyItemObjectivesComponent>
	) =>
		resolveInventory(
			inventories,
			objectives,
			$manifestStore.DestinyInventoryItemDefinition ?? {},
			$manifestStore.DestinyObjectiveDefinition ?? {}
		);

	const charactersResult = useQuery(
		'characters',
		async () => {
			const charactersResponse = await getProfile(createFetch(true), {
				destinyMembershipId: profile.membershipId,
				membershipType: profile.membershipType,
				components: [
					DestinyComponentType.Characters,
					DestinyComponentType.CharacterInventories,
					DestinyComponentType.CharacterProgressions,
					DestinyComponentType.ItemObjectives
				]
			});

			return {
				inventories: onResolveInventory(
					charactersResponse.Response.characterInventories,
					charactersResponse.Response.itemComponents.objectives
				),
				characters: onResolveCharacters(charactersResponse.Response.characters)
			};
		},
		{
			enabled: true,
			cacheTime: Infinity,
			staleTime: 600_000, //10 minutes
			refetchInterval: 60_000, //1 minute
			refetchOnWindowFocus: false,
			initialData: {
				inventories: onResolveInventory(
					characters.characterInventories,
					characters.itemComponents.objectives
				),
				characters: onResolveCharacters(characters.characters)
			}
		}
	);
</script>

Chars
