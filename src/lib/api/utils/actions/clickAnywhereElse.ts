export const clickAnywhereElse = (node) => {
    const handleCLick = (event: MouseEvent) => {
        if (!node.contains(event.target)) {
            node.dispatchEvent(new CustomEvent("outclick"));
        }
    };

    document.addEventListener("click", handleCLick);
    document.addEventListener("contextmenu", handleCLick);

    return {
        destroy() {
            document.removeEventListener("click", handleCLick);
            document.removeEventListener("contextmenu", handleCLick);
        },
    };
};
