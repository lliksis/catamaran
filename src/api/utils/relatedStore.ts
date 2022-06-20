import { writable } from "svelte/store";
import type { IBounty, IBountyWithPriority } from "api/destiny2";

const createRelatedStore = () => {
    const selectedBountyStore = writable<IBounty>();
    const store = writable<IBountyWithPriority[]>([]);
    const { set } = store;

    const addRelated = (
        selectedBounty: IBounty,
        bounties: IBountyWithPriority[]
    ) => {
        selectedBountyStore.set(selectedBounty);
        set(bounties.sort((a, b) => a.priority - b.priority));
    };

    return {
        selectedBounty: selectedBountyStore,
        store,
        addRelated,
        clearRelated: () => set([]),
    };
};
export default createRelatedStore();
