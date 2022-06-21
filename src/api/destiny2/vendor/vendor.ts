import {
    DestinyItemType,
    DestinyVendorsResponse,
} from "bungie-api-ts/destiny2";
import { bngBaseUrl, IManifestDefinitions } from "api/utils/types";
import type {
    IBountyObjective,
    IVendor,
    IBounty,
    IVendorProgression,
} from "./vendor.types";
import tags, { duplicateTags } from "../../../tags.en";
import bounties, { bountyHashesByTag } from "api/destiny2/bounties";

/**
 * Converts the vendors form getVendors into IVendor[].
 * @param vendorResponse The vendorResponse from getVendors.
 * @param defintions All manifests definitions.
 * @returns vendors passed as IVendor[]. Vendors that don't provide quests are filtered out.
 */
export const resolveVendors = (
    vendorResponse: DestinyVendorsResponse,
    defintions: IManifestDefinitions
): IVendor[] => {
    const { vendors, vendorGroups, sales, itemComponents } = vendorResponse;

    const resolvedVendors: IVendor[] = [];

    const {
        DestinyInventoryItemDefinition,
        DestinyObjectiveDefinition,
        DestinyProgressionDefinition,
        DestinyVendorDefinition,
        DestinyVendorGroupDefinition,
    } = defintions;

    for (const vendorHash in vendors.data) {
        const vendor = vendors.data[vendorHash];
        if (
            DestinyVendorDefinition[vendor.vendorHash].displayCategories.some(
                (v) => v.identifier === "category_bounties"
            )
        ) {
            const vendorDisplayProperties =
                DestinyVendorDefinition[vendor.vendorHash].displayProperties;

            // progression
            let vendorProgression: IVendorProgression | null = null;
            if (vendor.progression) {
                const progressionHash = vendor.progression.progressionHash;
                const progression =
                    DestinyProgressionDefinition[progressionHash];
                vendorProgression = {
                    ...vendor.progression,
                    name: progression.displayProperties.name,
                    description: progression.displayProperties.description,
                    icon: bngBaseUrl + progression.displayProperties.icon,
                    unitName: progression.displayProperties.displayUnitsName,
                };
            }

            // group
            const groupHash = vendorGroups.data.groups.find((g) =>
                g.vendorHashes.find((hash) => hash.toString() === vendorHash)
            )?.vendorGroupHash;
            const vendorGroup =
                DestinyVendorGroupDefinition[groupHash]?.categoryName;

            // items
            const resolvedItems: IBounty[] = [];
            const items = sales.data[vendorHash].saleItems;
            for (const saleHash in items) {
                const saleItemHash = items[+saleHash].itemHash;
                let bounty = bounties.findBountyByHash(saleItemHash);
                if (!bounty) {
                    const item = DestinyInventoryItemDefinition[saleItemHash];
                    if (item.itemType === DestinyItemType.Bounty) {
                        const itemObjectives =
                            itemComponents[vendorHash].objectives.data[saleHash]
                                .objectives;
                        const objectiveProgress: IBountyObjective[] =
                            itemObjectives.map((obj) => {
                                return {
                                    progress: 0,
                                    completionValue: obj.completionValue,
                                    objectiveProgressDescription:
                                        DestinyObjectiveDefinition[
                                            obj.objectiveHash
                                        ].progressDescription,
                                };
                            });
                        bounty = {
                            ...item,
                            displayProperties: {
                                ...item.displayProperties,
                                icon: bngBaseUrl + item.displayProperties.icon,
                            },
                            objectiveProgress: objectiveProgress,
                        };
                        bounty.tags = createTags(bounty);
                        bounties.addBounty(bounty);
                        resolvedItems.push(bounty);
                    }
                } else {
                    resolvedItems.push(bounty);
                }
            }

            resolvedVendors.push({
                ...vendor,
                ...vendorDisplayProperties,
                icon: bngBaseUrl + vendorDisplayProperties.icon,
                bounties: resolvedItems,
                group: vendorGroup,
                progression: vendorProgression,
            });
        }
    }
    return resolvedVendors;
};

const createTags = (bounty: IBounty) => {
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
