<style>
    .vendor {
        display: grid;
        column-gap: 20px;
        grid-template-columns: 100px 300px 50%;
        column-gap: 40px;
        margin-left: -8px;
        margin-right: -8px;
        padding: 20px 10px 20px 10px;
        min-height: 150px;
        background: linear-gradient(
            to right,
            var(--backgroundColor),
            transparent
        );
    }

    .vendor > .icon {
        align-self: center;
    }

    .vendor > .bounties {
        align-self: center;
        display: grid;
        grid-template-columns: 75px 75px 75px 75px 75px 75px;
        row-gap: 5px;
    }

    .vendor > .description {
        align-self: center;
    }

    h3 {
        margin: 0;
    }
</style>

<script lang="ts">
    import * as vendorConf from "../../vendorConf.json";
    import type { IBounty, IVendor } from "api/destiny2";
    import Bounty from "./Bounty.svelte";
    import Icon from "./Icon.svelte";
    import { getContext } from "svelte";
    import type { IBountyStore } from "api/utils";

    export let vendor: IVendor;

    const { addBounty, store } = getContext<IBountyStore>("bounty");

    const ignore = vendorConf.ignore.includes(vendor.vendorHash);
    const backgroundColor =
        vendorConf.vendorBackgrounds[vendor.vendorHash] || "grey";
    const hasIcon = !vendorConf.vendorWithoutIcon.includes(vendor.vendorHash);
    const areIconsFlipped = vendorConf.iconsFlipped.includes(vendor.vendorHash);
    const hasNoProgressIcon = vendorConf.noProgressIcon.includes(
        vendor.vendorHash
    );

    let vendorIcon = areIconsFlipped ? vendor.progression?.icon : vendor.icon;
    let progressIcon = hasNoProgressIcon
        ? undefined
        : areIconsFlipped
        ? vendor.icon
        : vendor.progression?.icon;

    $: isDisabled = (bounty: IBounty) => {
        return $store.some((b) => b.hash === bounty.hash);
    };
</script>

{#if !ignore}
    <div class="vendor" style="--backgroundColor: {backgroundColor}">
        <div class="icon">
            {#if hasIcon}
                <Icon
                    {vendorIcon}
                    {progressIcon}
                    progression={vendor.progression}
                />
            {/if}
        </div>

        <div class="description">
            <h3>
                {vendor.name}
            </h3>
            <div>
                {vendor.description}
            </div>
        </div>

        <div class="bounties">
            {#each vendor.bounties as bounty}
                <Bounty
                    {bounty}
                    actionText={"Hold to add"}
                    actionCallback={() => addBounty(bounty)}
                    disabled={isDisabled(bounty)}
                />
            {/each}
        </div>
    </div>
{/if}
