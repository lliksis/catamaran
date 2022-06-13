<!--
	@component
	This container handles the authorization and redirect from bnets authantication site.
-->
<script lang="ts">
    import { onMount } from "svelte";
    import { checkForAuthToken, getAuthorizationURL } from "api/utils";
    import { navigate } from "svelte-navigator";

    const authURL = getAuthorizationURL();

    let hasToLogin = true;
    onMount(async () => {
        if (await checkForAuthToken()) {
            hasToLogin = false;
        } else {
            navigate(authURL);
        }
    });
</script>

{#if !hasToLogin}
    <slot />
{/if}
