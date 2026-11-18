/** Status chips: one pill shape, tones from the app's state tokens. */
export type ChipTone = "neutral" | "info" | "success" | "warning" | "danger";
export type StatusChipProps = {
    label: string;
    tone?: ChipTone;
    title?: string;
    class?: string;
};
export declare function StatusChip(props: StatusChipProps): import("solid-js").JSX.Element;
export declare const CHIP_CSS: string;
