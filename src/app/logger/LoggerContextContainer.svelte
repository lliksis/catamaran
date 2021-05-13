<!--
	@component
	This Container provides an logger class as context to all its children.
	#### How to get the logger:
	- Either call the context directly:
		```tsx
		import { getContext } from "svelte";
		const { getLogger } from getContext("logger");
		const logger = getLogger();
		```
	- Or use the helper:
		```tsx
		import { getLogger } from "api/utils/Logger";
		const logger = getLogger();
		```
-->
<script lang="ts">
    import { setContext } from "svelte";
    import { Logger } from "api/utils/Logger";

    const Log = new Logger();
    Log.debug("setting up logger context");
    setContext("logger", {
        getLogger: () => Log,
    });
</script>

<slot />
