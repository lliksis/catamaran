<script lang="ts">
    import Router from "svelte-spa-router";
    import {
        QueryClient,
        QueryClientProvider,
    } from "@sveltestack/svelte-query";
    import routes from "./routes";
    import LoggerContext from "./app/logger/LoggerContextContainer.svelte";
    import AuthContainer from "./app/login/AuthContainer.svelte";
    import ErrorBoundary from "./app/ErrorBoundary/ErrorBoundary.svelte";
    import ManifestContainer from "./app/ManifestContainer/ManifestContainer.svelte";
    import ProfileContainer from "./app/ProfileContainer/ProfileContainer.svelte";
    import CharacterContainer from "./app/CharacterContainer/CharacterContainer.svelte";
    import LoadingContainer from "./app/LoadingContainer/LoadingContainer.svelte";

    const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
    <LoggerContext>
        <ErrorBoundary>
            <AuthContainer>
                <LoadingContainer>
                    <ManifestContainer>
                        <ProfileContainer>
                            <CharacterContainer>
                                <Router {routes} />
                            </CharacterContainer>
                        </ProfileContainer>
                    </ManifestContainer>
                </LoadingContainer>
            </AuthContainer>
        </ErrorBoundary>
    </LoggerContext>
</QueryClientProvider>
