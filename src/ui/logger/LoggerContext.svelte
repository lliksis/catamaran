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
