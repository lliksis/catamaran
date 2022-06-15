<div class="layout">
    <div id="main">
        <slot name="main-panel" />
    </div>
    <div id="side">
        <slot name="side-panel" />
    </div>
</div>
<div id="related">
    <slot name="related-panel" />
</div>

<style>
    .layout {
        display: grid;
        grid-template-areas: "main side";
        height: 100vh;
        width: 100vw;
        color: white;
    }

    #main {
        overflow-y: auto;
        grid-area: main;
        width: 60vw;
    }

    #side {
        overflow-y: auto;
        grid-area: side;
        width: 40vw;
        background-color: rgba(44, 42, 53, 0.86);
    }

    #related {
        position: fixed;
        bottom: 0;
        left: calc(50% - 250px);
        width: 500px;
        background-color: rgba(44, 42, 53);
    }

    @media only screen and (max-width: 1025px) {
        #side {
            width: 50vw;
        }
        #main {
            width: 50vw;
        }
    }

    @media only screen and (max-width: 930px) {
        .layout {
            overflow-x: scroll;
            scroll-snap-type: x mandatory;
        }

        #main {
            width: 100vw;
            scroll-snap-align: start;
        }

        #side {
            width: 100vw;
            scroll-snap-align: start;
        }
    }
</style>
