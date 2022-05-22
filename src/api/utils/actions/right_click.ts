export const rightClick = (node: Node) => {
    const click = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        document.dispatchEvent(new CustomEvent("opencontext"));
        return false;
    };
    node.addEventListener("contextmenu", click);

    return {
        destroy: () => {
            node.removeEventListener("contextmenu", click);
        },
    };
};
