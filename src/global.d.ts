declare module "*.json" {
    const value: any;
    export default value;
}

declare namespace svelte.JSX {
    interface DOMAttributes<T> {
        onopencontext?: () => void;
        onoutclick?: () => void;
    }
}
