<script lang="ts">
    import { onMount, setContext } from "svelte";
    import {
        BungieMembershipType,
        getLinkedProfiles,
    } from "bungie-api-ts/destiny2";
    import { useQuery } from "@sveltestack/svelte-query";
    import {
        authStorage,
        createFetch,
        getLogger,
        loadingStore,
    } from "api/utils";
    import type { IAuthToken } from "api/utils";
    import { bngBaseUrl } from "api/utils/types";

    const logger = getLogger();

    loadingStore.update((l) => ({ ...l, text: "loading profile" }));

    let membershipId = undefined;
    const profileResponse = useQuery(
        ["profile", membershipId],
        () =>
            getLinkedProfiles(createFetch(), {
                membershipType: BungieMembershipType.BungieNext,
                membershipId,
                getAllMemberships: false,
            }),
        {
            enabled: false,
            staleTime: Infinity,
            cacheTime: Infinity,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            onSuccess: () => {
                logger.info("profile fetched successfully");
            },
        }
    );

    $: profileResponse.setEnabled(!!membershipId);

    onMount(async () => {
        membershipId = await authStorage
            .getItem<IAuthToken>("token")
            .then((token) => {
                return token.bungieMembershipId;
            });
    });

    $: if ($profileResponse.data) {
        const bungieResponse = $profileResponse.data?.Response;
        setContext("profile", {
            ...bungieResponse.profiles[0],
            iconPath: bngBaseUrl + bungieResponse.bnetMembership.iconPath,
        });
    }
</script>

{#if !$profileResponse.isLoading && !$profileResponse.isIdle}
    <slot />
{/if}
