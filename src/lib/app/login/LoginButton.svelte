<script lang="ts">
	import { getAuthorizationURL } from '$lib/api/utils';

	const href = getAuthorizationURL();
	const onClick = () => {
		window.location.href = href;
	};
</script>

<div class="login button" on:click={onClick}>
	<span class="login-link">Login via Bungie</span>
</div>

<style>
	:root {
		--hover-border-color: #00000050;
		--text-border-color: #00000030;
	}

	.login {
		background-color: #ffd13b;
		width: 237px;
		height: 48px;
	}

	.login-link {
		display: block;
		text-align: center;
		line-height: 48px;
		font-weight: 700;
		font-size: 20px;
		color: white;
		text-shadow: 1px 1px 1px var(--text-border-color);
	}
</style>
