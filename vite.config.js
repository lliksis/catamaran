import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import preprocess from "svelte-preprocess";
import path from "path";

export default defineConfig({
    plugins: [svelte({ preprocess: preprocess() })],
    resolve: {
        alias: {
            src: path.resolve(__dirname, "src"),
            app: path.resolve(__dirname, "src/app"),
            api: path.resolve(__dirname, "src/api"),
            "destiny-icons": path.resolve(__dirname, "./destiny-icons"),
        },
    },
});
