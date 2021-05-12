<!--
	@component
	This container handles the authorization and redirect from bnets authantication site.
-->
<script lang="ts">
    import { onMount } from "svelte";
    import { push } from "svelte-spa-router";

    import { checkForAuthToken } from "api/utils";
    import LoginContainer from "./LoginContainer.svelte";

    let hasToLogin = true;
    onMount(async () => {
        const params = new URLSearchParams(window.location.search);
        if (params.get("code")) {
            push(`/reauth?${params}`);
            hasToLogin = false;
        } else if (await checkForAuthToken()) {
            hasToLogin = false;
        }
    });
</script>

{#if hasToLogin}
    login page
    <LoginContainer />
{:else}
    <slot />
{/if}
