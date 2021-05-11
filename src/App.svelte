<script lang="ts">
    import Router from "svelte-spa-router";
    import LoggerContext from "./ui/logger/LoggerContext.svelte";
    import routes from "./routes";
</script>

<LoggerContext>
    <Router {routes} />
</LoggerContext>
