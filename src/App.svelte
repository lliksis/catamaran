<script lang="ts">
    import { Router, Route } from "svelte-navigator";
    import {
        QueryClient,
        QueryClientProvider,
    } from "@sveltestack/svelte-query";
    import LoggerContext from "./app/logger/LoggerContextContainer.svelte";
    import ErrorBoundary from "./app/ErrorBoundary/ErrorBoundary.svelte";
    import Reauth from "./app/pages/Reauth.svelte";
    import LoginButton from "./app/login/LoginButton.svelte";
    import D2AppWrapper from "./D2AppWrapper.svelte";
    import CharSelect from "./app/pages/CharSelect.svelte";
    import Vendors from "./app/pages/Vendors.svelte";
    import CharacterContainer from "./app/CharacterContainer/CharacterContainer.svelte";

    const queryClient = new QueryClient();
</script>

<Router>
    <QueryClientProvider client={queryClient}>
        <LoggerContext>
            <ErrorBoundary>
                <Route path="/">
                    base
                    <LoginButton />
                </Route>
                <Route path="redirect" component={Reauth} />
                <Route path="app/*">
                    <D2AppWrapper>
                        <Route path="/">
                            <CharacterContainer>
                                <CharSelect />
                            </CharacterContainer>
                        </Route>
                        <Route
                            path=":membershipId/:membershipType/:characterId"
                            let:params
                        >
                            <CharacterContainer>
                                <Vendors
                                    membershipId={params.membershipId}
                                    membershipType={params.membershipType}
                                    characterId={params.characterId}
                                />
                            </CharacterContainer>
                        </Route>
                    </D2AppWrapper>
                </Route>
            </ErrorBoundary>
        </LoggerContext>
    </QueryClientProvider>
</Router>
