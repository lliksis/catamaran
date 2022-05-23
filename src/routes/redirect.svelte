<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ url }) => {
		const code = url.searchParams.get('code');
		if (code) {
			return {
				redirect: 'app',
				status: 303
			};
		}
		return {
			status: 200
		};
	};
</script>
