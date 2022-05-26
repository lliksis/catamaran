<script>
    import { Router } from "svelte-navigator";
    import AuthContainer from "./app/login/AuthContainer.svelte";
    import ManifestContainer from "./app/ManifestContainer/ManifestContainer.svelte";
    import ProfileContainer from "./app/ProfileContainer/ProfileContainer.svelte";
    import CharacterContainer from "./app/CharacterContainer/CharacterContainer.svelte";
    import LoadingContainer from "./app/LoadingContainer/LoadingContainer.svelte";
</script>

<Router>
    <LoadingContainer>
        <AuthContainer>
            <ManifestContainer>
                <ProfileContainer>
                    <slot />
                </ProfileContainer>
            </ManifestContainer>
        </AuthContainer>
    </LoadingContainer>
</Router>
