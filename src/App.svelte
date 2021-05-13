<script lang="ts">
    import Router from "svelte-spa-router";
    import LoggerContext from "./app/logger/LoggerContextContainer.svelte";
    import routes from "./routes";
    import ManifestContainer from "./app/mainfest/ManifestContainer.svelte";
    import AuthContainer from "./app/login/AuthContainer.svelte";
    import ErrorBoundary from "./app/errorBoundary/ErrorBoundary.svelte";

</script>

<LoggerContext>
    <ErrorBoundary>
        <ManifestContainer>
            <AuthContainer>
                <Router {routes} />
            </AuthContainer>
        </ManifestContainer>
    </ErrorBoundary>
</LoggerContext>
