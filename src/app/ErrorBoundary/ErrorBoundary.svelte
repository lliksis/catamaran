<script lang="ts">
    import { onMount } from "svelte";
    import { getLogger } from "api/utils";
    import Notification from "./ErrorNotification.svelte";

    let error: object | undefined = undefined;
    const onRemove = () => {
        error = undefined;
    };

    const logger = getLogger();
    onMount(() => {
        logger.debug("initializing error boundary");
        window.onunhandledrejection = async (e) => {
            logger.debug(e);
            logger.error(
                `Unhandled error caught by ErrorBoundary: ${e.reason.message}`,
                e.reason.stack
            );
            error = e.reason;
        };
    });

</script>

<slot />
{#if error}
    <Notification {onRemove} {error} />
{/if}
