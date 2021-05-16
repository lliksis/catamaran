<!--
	@component
	This container handles the authorization and redirect from bnets authantication site.
-->
<script lang="ts">
    import { onMount } from "svelte";
    import { checkForAuthToken } from "api/utils";
    import LoginContainer from "./LoginContainer.svelte";
    import Reauth from "../pages/Reauth.svelte";

    let hasToLogin = true;
    let redirect = false;
    onMount(async () => {
        const params = new URLSearchParams(window.location.search);
        if (params.get("code")) {
            redirect = true;
        } else if (await checkForAuthToken()) {
            hasToLogin = false;
        }
    });

</script>

{#if hasToLogin}
    {#if redirect}
        <Reauth />
    {:else}
        login page
        <LoginContainer />
    {/if}
{:else}
    <slot />
{/if}
