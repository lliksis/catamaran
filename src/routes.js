import LandingPage from "./app/routes/LandingPage.svelte";
import Reauth from "./app/routes/Reauth.svelte";
import CharSelect from "./app/routes/CharSelect.svelte";

export default {
    "/": LandingPage,
    "/char-select": CharSelect,
    "/reauth": Reauth,
};
