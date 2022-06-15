import { writable } from "svelte/store";
import type { IBountyWithPriority } from "api/destiny2";

const createRelatedStore = () => {
    const store = writable<IBountyWithPriority[]>([]);
    const { set, update } = store;

    const addRelated = (bounties: IBountyWithPriority[]) => {
        update(() => bounties);
    };

    return {
        store,
        addRelated,
        clearRelated: () => set([]),
    };
};
export default createRelatedStore();
