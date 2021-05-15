import {
    createFetch,
    getDestinyInventoryItemDefinition,
    getDestinyObjectiveDefinition,
    getDestinyProgressionDefinition,
    getDestinyVendorDefinition,
    getDestinyVendorGroupDefinition,
} from "api/utils";
import type {
    IVendor,
    IVendorBounty,
    IVendorProgression,
} from "api/utils/types";
import {
    BungieMembershipType,
    DestinyComponentType,
    DestinyItemType,
    DestinyVendorsResponse,
    getVendors,
} from "bungie-api-ts/destiny2";

export const fetchResolvedVendors = async (
    destinyMembershipId: string,
    membershipType: BungieMembershipType,
    characterId: string
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

    const resolvedVendors: IVendor[] = await resolveVendors(response.Response);

    return resolvedVendors;
};

const resolveVendors = async (
    vendorResponse: DestinyVendorsResponse
): Promise<IVendor[]> => {
    const { vendors, vendorGroups, sales, itemComponents } = vendorResponse;

    const resolvedVendors: IVendor[] = [];

    const vendorDefinition = await getDestinyVendorDefinition();
    const progressionDefinition = await getDestinyProgressionDefinition();
    const vendorGroupDefintion = await getDestinyVendorGroupDefinition();
    const itemDefinition = await getDestinyInventoryItemDefinition();
    const objectiveDefinition = await getDestinyObjectiveDefinition();

    for (const vendorHash in vendors.data) {
        const vendor = vendors.data[vendorHash];
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
                icon: progression.displayProperties.icon,
                unitName: progression.displayProperties.displayUnitsName,
            };
        }

        // group
        const groupHash = vendorGroups.data.groups.find((g) =>
            g.vendorHashes.find((hash) => hash.toString() === vendorHash)
        )?.vendorGroupHash;
        const vendorGroup = vendorGroupDefintion[groupHash]?.categoryName;

        // items
        const resolvedItems: IVendorBounty[] = [];
        const items = sales.data[vendorHash].saleItems;
        for (const saleHash in items) {
            const saleItemHash = items[+saleHash].itemHash;
            const item = itemDefinition[saleItemHash];
            if (item.itemType === DestinyItemType.Bounty) {
                const itemObjective =
                    itemComponents[vendorHash].objectives.data[saleHash]
                        .objectives[0];
                const objective =
                    objectiveDefinition[itemObjective.objectiveHash];
                resolvedItems.push({
                    ...item,
                    completionValue: itemObjective.completionValue,
                    objectiveProgressDescription: objective.progressDescription,
                });
            }
        }

        resolvedVendors.push({
            ...vendor,
            ...vendorDisplayProperties,
            bounties: resolvedItems,
            group: vendorGroup,
            progression: vendorProgression,
        });
    }
    return resolvedVendors;
};
