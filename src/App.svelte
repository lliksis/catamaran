<script lang="ts">
    import Router from "svelte-spa-router";
    import LoggerContext from "./app/logger/LoggerContextContainer.svelte";
    import routes from "./routes";
    import AuthContainer from "./app/login/AuthContainer.svelte";
    import ErrorBoundary from "./app/ErrorBoundary/ErrorBoundary.svelte";
    import ManifestProfileContainer from "./app/ManifestProfileContainer/ManifestProfileContainer.svelte";

</script>

<LoggerContext>
    <ErrorBoundary>
        <AuthContainer>
            <ManifestProfileContainer>
                <Router {routes} />
            </ManifestProfileContainer>
        </AuthContainer>
    </ErrorBoundary>
</LoggerContext>
