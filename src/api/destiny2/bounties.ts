import type { IBounty } from "./vendor";

const bountyMap = new Map<number, IBounty>();
const bounties = () => {
    const addBounty = (bounty: IBounty) => {
        bountyMap.set(bounty.hash, bounty);
    };

    const findBountyByHash = (hash: number) => {
        if (bountyMap.has(hash)) return bountyMap.get(hash);
        return null;
    };

    return {
        addBounty,
        findBountyByHash,
    };
};
export default bounties();

const bountyProgressMap = new Map<string, number>();
const progressByBounty = () => {
    const createKey = (index: number, bountyHash: number) =>
        `${bountyHash}_${index}`;

    const addProgress = (
        index: number,
        bountyHash: number,
        progress: number
    ) => {
        bountyProgressMap.set(createKey(index, bountyHash), progress);
    };
    const getProgress = (index: number, bountyHash: number) => {
        if (bountyProgressMap.has(createKey(index, bountyHash))) {
            return bountyProgressMap.get(createKey(index, bountyHash));
        }
        return 0;
    };

    return {
        addProgress,
        getProgress,
    };
};
export const bountyProgress = progressByBounty();

const bountyHashesByTagMap = new Map<string, number[]>();
const hashesByTag = () => {
    const addBounty = (tag: string, bountyHash: number) => {
        if (bountyHashesByTagMap.has(tag)) {
            const cached = bountyHashesByTagMap.get(tag);
            if (!cached.includes(bountyHash)) {
                cached.push(bountyHash);
                bountyHashesByTagMap.set(tag, cached);
            }
        } else {
            bountyHashesByTagMap.set(tag, [bountyHash]);
        }
    };
    const getBounties = (tag: string) => {
        if (bountyHashesByTagMap.has(tag)) {
            return bountyHashesByTagMap.get(tag);
        }
        return null;
    };

    return {
        addBounty,
        getBounties,
    };
};
export const bountyHashesByTag = hashesByTag();
