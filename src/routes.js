import LandingPage from "./ui/routes/LandingPage.svelte";
import Reauth from "./ui/routes/Reauth.svelte";
import CharSelect from "./ui/routes/CharSelect.svelte";

export default {
    "/": LandingPage,
    "/char-select": CharSelect,
    "/reauth": Reauth,
};
