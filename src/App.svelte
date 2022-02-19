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
    import TooltipContext from "./app/tooltip/TooltipContext.svelte";
    import ProfileContainer from "./app/ProfileContainer/ProfileContainer.svelte";
    import CharacterContainer from "./app/CharacterContainer/CharacterContainer.svelte";

    const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
    <LoggerContext>
        <ErrorBoundary>
            <AuthContainer>
                <TooltipContext>
                    <ManifestContainer>
                        <ProfileContainer>
                            <CharacterContainer>
                                <Router {routes} />
                            </CharacterContainer>
                        </ProfileContainer>
                    </ManifestContainer>
                </TooltipContext>
            </AuthContainer>
        </ErrorBoundary>
    </LoggerContext>
</QueryClientProvider>
