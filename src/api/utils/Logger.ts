import { getContext } from "svelte";
import type { ILogger } from "./types";

export class Logger implements ILogger {
    constructor() {
        console.log(
            "%c \u{1FA90} bungie-bounty-group \u{1FA90}",
            "font-size: 30px"
        );
    }

    /**
     * Print a debug message in the browser console.
     * only visible in development.
     * @param message A descriptive message
     * @param data Additional data to show
     */
    public debug = (message: string, ...data: any[]) => {
        if (!__app.env.isProd) {
            this.logMessage("debug", message, data);
        }
    };

    /**
     * Print a warn message in the browser console.
     * @param message A descriptive message
     * @param data Additional data to show
     */
    public warn = (message: string, ...data: any[]) => {
        this.logMessage("warn", message, data);
    };

    /**
     * Print an error message in the browser console.
     * @param message A descriptive message
     * @param data Additional data to show
     */
    public error = (message: string, ...data: any[]) => {
        this.logMessage("error", message, data);
    };

    /**
     * Print an info message in the browser console.
     * @param message A descriptive message
     * @param data Additional data to show
     */
    public info = (message: string, ...data: any[]) => {
        this.logMessage("info", message, data);
    };

    /**
     * Print a message and optional data to the browser console.
     * @param type The message type
     * @param message A descriptive message
     * @param data Additional data to show
     */
    private logMessage = (
        type: "debug" | "info" | "warn" | "error",
        message: string,
        data: any[]
    ) => {
        if (data.length > 0) {
            console[type](message, data);
        } else {
            console[type](message);
        }
    };
}

export const getLogger = () => {
    const { getLogger } = getContext("logger");
    return getLogger();
};
