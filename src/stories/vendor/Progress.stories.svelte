<script>
    import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
    import ProgressComponent from "../../app/vendor/Progress.svelte";

</script>

<Meta title="Components/Vendor/Progress" component={ProgressComponent} />

<Template let:args>
    <ProgressComponent progression={args.progression} />
</Template>

<Story
    name="Standard"
    args={{
        progression: {
            icon:
                "https://www.bungie.net/common/destiny2_content/icons/32049558a076b04b18cd26b7b060061c.png",
            name: "Vanguard Tactical",
            level: "56",
            progressToNextLevel: "1000",
            nextLevelAt: "2000",
        },
    }}
/>
