import Reauth from "./app/pages/Reauth.svelte";
import CharSelect from "./app/pages/CharSelect.svelte";
import Vendors from "./app/pages/Vendors.svelte";

export default {
    "/": CharSelect,
    "/:membershipId/:characterId": Vendors,
};
