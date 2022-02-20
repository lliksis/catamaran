import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import type { IBounty } from "api/destiny2";

const key = "bounties_";

export const createBountyStorage = (characterId: number) => {
    const itemKey = `${key}${characterId}`;
    const storedBounties =
        (JSON.parse(localStorage.getItem(itemKey)) as IBounty[]) || [];
    const store = writable(storedBounties);
    const { update } = store;

    let cachedBounties: IBounty[] = storedBounties;

    store.subscribe((bounties: IBounty[]) => {
        localStorage.setItem(itemKey, JSON.stringify(bounties));
        cachedBounties = bounties;
    });

    const removeBounty = (bounty: IBounty) => {
        update((bounties) => {
            const index = bounties.indexOf(bounty);
            const copiedBounties = [...bounties];
            copiedBounties.splice(index, 1);
            return copiedBounties;
        });
    };

    const addBounty = (bounty: IBounty) => {
        update((bounties) => {
            const index = bounties.indexOf(bounty);
            // only add a new bounty if it's not already in the list
            if (index === -1) {
                bounties.push(bounty);
            }
            return bounties;
        });
    };

    return {
        store,
        removeBounty,
        addBounty,
    };
};

export interface IBountyStore {
    store: Writable<IBounty[]>;
    removeBounty: (bounty: IBounty) => void;
    addBounty: (bounty: IBounty) => void;
}
