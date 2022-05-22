<script lang="ts">
	import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';
	import LoggerContext from '$lib/app/logger/LoggerContextContainer.svelte';
	import AuthContainer from '$lib/app/login/AuthContainer.svelte';
	import ErrorBoundary from '$lib/app/ErrorBoundary/ErrorBoundary.svelte';
	import ManifestContainer from '$lib/app/ManifestContainer/ManifestContainer.svelte';
	import ProfileContainer from '$lib/app/ProfileContainer/ProfileContainer.svelte';
	import CharacterContainer from '$lib/app/CharacterContainer/CharacterContainer.svelte';
	import LoadingContainer from '$lib/app/LoadingContainer/LoadingContainer.svelte';

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
								<!-- <Router {routes} /> -->
							</CharacterContainer>
						</ProfileContainer>
					</ManifestContainer>
				</LoadingContainer>
			</AuthContainer>
		</ErrorBoundary>
	</LoggerContext>
</QueryClientProvider>
