import CharSelect from "./app/pages/CharSelect.svelte";
import Vendors from "./app/pages/Vendors.svelte";

export default {
    "/": CharSelect,
    "/:membershipId/:membershipType/:characterId": Vendors,
};
