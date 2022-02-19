import { writable } from "svelte/store";

interface ILoadingStore {
    text?: string;
    closePage?: boolean;
}

export const loadingStore = writable<ILoadingStore>({ closePage: false });
