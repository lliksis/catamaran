<script lang="ts">
    import { onMount } from "svelte";
    import { push } from "svelte-spa-router";

    import { checkForAuthToken, storeManifest } from "api/utils";
    import LoginContainer from "../login/LoginContainer.svelte";

    let hasToLogin = false;

    let loading = true;
    const setLoadingState = (loading: boolean) => {
        loading = loading;
    };

    onMount(async () => {
        const params = new URLSearchParams(window.location.search);
        if (params.get("code")) {
            push(`/reauth?${params}`);
        } else if (await checkForAuthToken()) {
            await storeManifest(setLoadingState);
            await push("/char-select");
        } else {
            hasToLogin = true;
            loading = false;
        }
    });
</script>

{#if loading}
    loading manifest...
{:else if hasToLogin}
    Done!
    <LoginContainer />
{/if}
