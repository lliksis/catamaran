<script>
    import { getAuthorizationURL } from "api/utils/login";
    import LoginButton from "./LoginButton.svelte";

    const href = getAuthorizationURL();
</script>

<LoginButton {href} />
