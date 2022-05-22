<script context="module" lang="ts">
	import type { LoadInput } from '@sveltejs/kit';

	export const load = async ({ url }: LoadInput) => {
		const code = url.searchParams.get('code');
		if (code) {
			return {
				redirect: 'app/chars',
				status: 303
			};
		}
		return {
			status: 200
		};
	};
</script>
