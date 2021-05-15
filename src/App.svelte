<script lang="ts">
    import Router from "svelte-spa-router";
    import LoggerContext from "./app/logger/LoggerContextContainer.svelte";
    import routes from "./routes";
    import ManifestContainer from "./app/mainfest/ManifestContainer.svelte";
    import AuthContainer from "./app/login/AuthContainer.svelte";
    import ErrorBoundary from "./app/ErrorBoundary/ErrorBoundary.svelte";
    import ProfileContext from "./app/ProfileContext/ProfileContext.svelte";

</script>

<LoggerContext>
    <ErrorBoundary>
        <ManifestContainer>
            <AuthContainer>
                <ProfileContext>
                    <Router {routes} />
                </ProfileContext>
            </AuthContainer>
        </ManifestContainer>
    </ErrorBoundary>
</LoggerContext>
