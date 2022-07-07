import type { IBounty, IBountyWithPriority } from "api/destiny2";
import bountyCache, { bountyHashesByTag } from "api/destiny2/bounties";
import related from "api/utils/relatedStore";

const showRelatedAction = (bounty: IBounty) => {
    const bounties: IBountyWithPriority[] = [];
    for (const tag of bounty.tags) {
        const hashesByTag = bountyHashesByTag.getBounties(tag);
        if (hashesByTag) {
            for (const hash of hashesByTag) {
                if (hash !== bounty.hash) {
                    const index = bounties.findIndex((b) => b.hash === hash);
                    if (index > -1) {
                        bounties[index].priority++;
                    } else {
                        const relatedBounty =
                            bountyCache.findBountyByHash(hash);
                        relatedBounty !== null &&
                            bounties.push({ priority: 1, ...relatedBounty });
                    }
                }
            }
        }
    }
    related.addRelated(bounty, bounties);
};
export const showRelated = (bounty: IBounty) => ({
    text: "Show related",
    action: () => showRelatedAction(bounty),
});

const trackBountyAction = (
    bounty: IBounty,
    addBounty: (bounty: IBounty) => void
) => {
    addBounty(bounty);
};
export const trackBounty = (
    bounty: IBounty,
    addBounty: (bounty: IBounty) => void
) => ({
    text: "Track bounty",
    action: () => trackBountyAction(bounty, addBounty),
});

const untrackBountyAction = (
    bounty: IBounty,
    removeBounty: (bounty: IBounty) => void
) => {
    removeBounty(bounty);
};
export const untrackBounty = (
    bounty: IBounty,
    removeBounty: (bounty: IBounty) => void
) => ({
    text: "Untrack bounty",
    action: () => untrackBountyAction(bounty, removeBounty),
});
