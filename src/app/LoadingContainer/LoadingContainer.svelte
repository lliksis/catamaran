<style>
    .loading-container {
        position: relative;
        width: 100vw;
        height: 100vh;
        background: linear-gradient(
                217deg,
                rgba(255, 0, 0, 0.8),
                rgba(255, 0, 0, 0) 70.71%
            ),
            linear-gradient(
                127deg,
                rgba(0, 255, 0, 0.8),
                rgba(0, 255, 0, 0) 70.71%
            ),
            linear-gradient(
                336deg,
                rgba(0, 0, 255, 0.8),
                rgba(0, 0, 255, 0) 70.71%
            );
    }

    .loading-text {
        position: absolute;
        bottom: 0;
        right: 0;
        padding: 10px;
    }

    .loading-spinner-hidden {
        display: none;
    }
</style>

<script lang="ts">
    import { loadingStore } from "api/utils";

    $: show =
        $loadingStore.closePage !== undefined ? !$loadingStore.closePage : true;
    $: console.log(show, $loadingStore);
</script>

<div class:loading-container={show}>
    <div class="loading-text">
        {$loadingStore.text || ""}
        <svg
            class:loading-spinner-hidden={!show}
            width="50px"
            height="50px"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
        >
            <g transform="rotate(0 50 50)">
                <rect
                    x="47"
                    y="24"
                    rx="3"
                    ry="6"
                    width="6"
                    height="12"
                    fill="#fe718d"
                >
                    <animate
                        attributeName="opacity"
                        values="1;0"
                        keyTimes="0;1"
                        dur="1s"
                        begin="-0.9166666666666666s"
                        repeatCount="indefinite"
                    />
                </rect>
            </g><g transform="rotate(30 50 50)">
                <rect
                    x="47"
                    y="24"
                    rx="3"
                    ry="6"
                    width="6"
                    height="12"
                    fill="#fe718d"
                >
                    <animate
                        attributeName="opacity"
                        values="1;0"
                        keyTimes="0;1"
                        dur="1s"
                        begin="-0.8333333333333334s"
                        repeatCount="indefinite"
                    />
                </rect>
            </g><g transform="rotate(60 50 50)">
                <rect
                    x="47"
                    y="24"
                    rx="3"
                    ry="6"
                    width="6"
                    height="12"
                    fill="#fe718d"
                >
                    <animate
                        attributeName="opacity"
                        values="1;0"
                        keyTimes="0;1"
                        dur="1s"
                        begin="-0.75s"
                        repeatCount="indefinite"
                    />
                </rect>
            </g><g transform="rotate(90 50 50)">
                <rect
                    x="47"
                    y="24"
                    rx="3"
                    ry="6"
                    width="6"
                    height="12"
                    fill="#fe718d"
                >
                    <animate
                        attributeName="opacity"
                        values="1;0"
                        keyTimes="0;1"
                        dur="1s"
                        begin="-0.6666666666666666s"
                        repeatCount="indefinite"
                    />
                </rect>
            </g><g transform="rotate(120 50 50)">
                <rect
                    x="47"
                    y="24"
                    rx="3"
                    ry="6"
                    width="6"
                    height="12"
                    fill="#fe718d"
                >
                    <animate
                        attributeName="opacity"
                        values="1;0"
                        keyTimes="0;1"
                        dur="1s"
                        begin="-0.5833333333333334s"
                        repeatCount="indefinite"
                    />
                </rect>
            </g><g transform="rotate(150 50 50)">
                <rect
                    x="47"
                    y="24"
                    rx="3"
                    ry="6"
                    width="6"
                    height="12"
                    fill="#fe718d"
                >
                    <animate
                        attributeName="opacity"
                        values="1;0"
                        keyTimes="0;1"
                        dur="1s"
                        begin="-0.5s"
                        repeatCount="indefinite"
                    />
                </rect>
            </g><g transform="rotate(180 50 50)">
                <rect
                    x="47"
                    y="24"
                    rx="3"
                    ry="6"
                    width="6"
                    height="12"
                    fill="#fe718d"
                >
                    <animate
                        attributeName="opacity"
                        values="1;0"
                        keyTimes="0;1"
                        dur="1s"
                        begin="-0.4166666666666667s"
                        repeatCount="indefinite"
                    />
                </rect>
            </g><g transform="rotate(210 50 50)">
                <rect
                    x="47"
                    y="24"
                    rx="3"
                    ry="6"
                    width="6"
                    height="12"
                    fill="#fe718d"
                >
                    <animate
                        attributeName="opacity"
                        values="1;0"
                        keyTimes="0;1"
                        dur="1s"
                        begin="-0.3333333333333333s"
                        repeatCount="indefinite"
                    />
                </rect>
            </g><g transform="rotate(240 50 50)">
                <rect
                    x="47"
                    y="24"
                    rx="3"
                    ry="6"
                    width="6"
                    height="12"
                    fill="#fe718d"
                >
                    <animate
                        attributeName="opacity"
                        values="1;0"
                        keyTimes="0;1"
                        dur="1s"
                        begin="-0.25s"
                        repeatCount="indefinite"
                    />
                </rect>
            </g><g transform="rotate(270 50 50)">
                <rect
                    x="47"
                    y="24"
                    rx="3"
                    ry="6"
                    width="6"
                    height="12"
                    fill="#fe718d"
                >
                    <animate
                        attributeName="opacity"
                        values="1;0"
                        keyTimes="0;1"
                        dur="1s"
                        begin="-0.16666666666666666s"
                        repeatCount="indefinite"
                    />
                </rect>
            </g><g transform="rotate(300 50 50)">
                <rect
                    x="47"
                    y="24"
                    rx="3"
                    ry="6"
                    width="6"
                    height="12"
                    fill="#fe718d"
                >
                    <animate
                        attributeName="opacity"
                        values="1;0"
                        keyTimes="0;1"
                        dur="1s"
                        begin="-0.08333333333333333s"
                        repeatCount="indefinite"
                    />
                </rect>
            </g><g transform="rotate(330 50 50)">
                <rect
                    x="47"
                    y="24"
                    rx="3"
                    ry="6"
                    width="6"
                    height="12"
                    fill="#fe718d"
                >
                    <animate
                        attributeName="opacity"
                        values="1;0"
                        keyTimes="0;1"
                        dur="1s"
                        begin="0s"
                        repeatCount="indefinite"
                    />
                </rect>
            </g>
        </svg>
    </div>
    <slot />
</div>
