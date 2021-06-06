import {
    BungieMembershipType,
    DestinyComponentType,
    DestinyItemType,
    DestinyVendorsResponse,
    getVendors,
} from "bungie-api-ts/destiny2";
import { createFetch } from "api/utils";
import { bngBaseUrl, IManifestDefinitions } from "api/utils/types";
import type {
    IBountyObjective,
    IVendor,
    IBounty,
    IVendorProgression,
} from "./vendor.types";

/**
 * Fetches vendor information based on the account and current character.
 * @param destinyMembershipId The accounts membershipId.
 * @param membershipType The accoutns membershipType.
 * @param characterId The current selected character.
 * @param defintions All stored definitions.
 * @returns The vendors as IVendor[]
 */
export const fetchResolvedVendors = async (
    destinyMembershipId: string,
    membershipType: BungieMembershipType,
    characterId: string,
    defintions: IManifestDefinitions
): Promise<IVendor[]> => {
    const response = await getVendors(createFetch(true), {
        characterId,
        destinyMembershipId,
        membershipType,
        components: [
            DestinyComponentType.Vendors,
            DestinyComponentType.VendorCategories,
            DestinyComponentType.VendorSales,
            DestinyComponentType.ItemObjectives,
        ],
    });

    const resolvedVendors: IVendor[] = await resolveVendors(
        response.Response,
        defintions
    );

    return resolvedVendors;
};

/**
 * Converts the vendors form getVendors into IVendor[].
 * @param vendorResponse The vendorResponse from getVendors.
 * @param defintions All manifests definitions.
 * @returns vendors passed as IVendor[]. Vendors that don't provide quests are filtered out.
 */
const resolveVendors = async (
    vendorResponse: DestinyVendorsResponse,
    defintions: IManifestDefinitions
): Promise<IVendor[]> => {
    const { vendors, vendorGroups, sales, itemComponents } = vendorResponse;

    const resolvedVendors: IVendor[] = [];

    const {
        inventoriyItemDefinition,
        objectiveDefinition,
        progressionDefinition,
        vendorDefinition,
        vendorGroupDefintion,
    } = defintions;

    for (const vendorHash in vendors.data) {
        const vendor = vendors.data[vendorHash];
        if (
            vendorDefinition[vendor.vendorHash].displayCategories.some(
                (v) => v.identifier === "category_bounties"
            )
        ) {
            const vendorDisplayProperties =
                vendorDefinition[vendor.vendorHash].displayProperties;

            // progression
            let vendorProgression: IVendorProgression | null = null;
            if (vendor.progression) {
                const progressionHash = vendor.progression.progressionHash;
                const progression = progressionDefinition[progressionHash];
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
            const vendorGroup = vendorGroupDefintion[groupHash]?.categoryName;

            // items
            const resolvedItems: IBounty[] = [];
            const items = sales.data[vendorHash].saleItems;
            for (const saleHash in items) {
                const saleItemHash = items[+saleHash].itemHash;
                const item = inventoriyItemDefinition[saleItemHash];
                if (item.itemType === DestinyItemType.Bounty) {
                    const itemObjectives =
                        itemComponents[vendorHash].objectives.data[saleHash]
                            .objectives;
                    const objectiveProgress: IBountyObjective[] = itemObjectives.map(
                        (obj) => {
                            return {
                                progress: 0,
                                completionValue: obj.completionValue,
                                objectiveProgressDescription:
                                    objectiveDefinition[obj.objectiveHash]
                                        .progressDescription,
                            };
                        }
                    );
                    resolvedItems.push({
                        ...item,
                        displayProperties: {
                            ...item.displayProperties,
                            icon: bngBaseUrl + item.displayProperties.icon,
                        },
                        objectiveProgress: objectiveProgress,
                    });
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
