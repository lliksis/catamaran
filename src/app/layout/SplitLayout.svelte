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

<div class="layout">
    <div id="main">
        <slot name="main-panel" />
    </div>
    <div id="side">
        <slot name="side-panel" />
    </div>
</div>
