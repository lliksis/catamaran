import { bountyHashesByTag } from "api/destiny2/bounties";
import type { IBounty } from "api/destiny2/vendor";
import tags, { duplicateTags } from "./tags.en";

export const createTags = (bounty: IBounty) => {
    const bountyTags: string[] = [];
    for (const tag of tags) {
        const tagName = checkForTag(
            bounty.hash,
            bounty.displayProperties.description,
            tag
        );
        if (tagName) {
            bountyTags.push(tagName);
        } else {
            bounty.objectiveProgress.forEach((progress) => {
                const tagName = checkForTag(
                    bounty.hash,
                    progress.objectiveProgressDescription,
                    tag
                );
                if (tagName) {
                    bountyTags.push(tagName);
                }
            });
        }
    }
    return bountyTags;
};
const checkForTag = (bountyHash: number, text: string, tag: string) => {
    const lowerText = text.toLowerCase();
    const index = lowerText.toLowerCase().indexOf(tag);
    if (index >= 0) {
        if (duplicateTags[tag]) {
            if (lowerText.includes(duplicateTags[tag], index)) {
                bountyHashesByTag.addBounty(duplicateTags[tag], bountyHash);
                return duplicateTags[tag];
            }
        }
        bountyHashesByTag.addBounty(tag, bountyHash);
        return tag;
    }
    return undefined;
};
