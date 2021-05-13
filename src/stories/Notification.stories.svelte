<script>
    import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
    import Notification from "../app/ErrorBoundary/Notification.svelte";

</script>

<Meta
    title="Example/Notification"
    component={Notification}
    argTypes={{
        name: { control: "text" },
        description: { control: "text" },
        type: {
            control: { type: "select", options: ["bungie", "undefined"] },
        },
    }}
/>

<Template let:args>
    <Notification
        error={{
            name: args.name,
            description: args.description,
            type: args.type,
        }}
    />
</Template>

<Story
    name="Error"
    args={{
        name: "Error name",
        description: "Error description",
    }}
/>

<Story
    name="With link"
    args={{
        name: "Error name",
        description: "Error description",
        type: "bungie",
    }}
/>
