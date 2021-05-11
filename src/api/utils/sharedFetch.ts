import type { HttpClientConfig, ServerResponse } from "bungie-api-ts/destiny2";

/**
 * Creates a fetch method for the bungiet-api-ts api
 * @returns The fetch method
 */
export const createFetch = () => {
    return async (config: HttpClientConfig) => {
        let url = config.url;
        if (config.params) {
            url += `?${new URLSearchParams(config.params)}`;
        }

        const headers = {};
        headers["X-API-Key"] = __app.env.X_API_KEY;
        if (config.body) {
            headers["Content-Type"] = "application/json";
        }

        const request = new Request(url, {
            method: config.method,
            body: config.body ? JSON.stringify(config.body) : undefined,
            headers,
        });

        const response = await fetch(request);
        const data: ServerResponse<unknown> = await response.json();

        return data;
    };
};
