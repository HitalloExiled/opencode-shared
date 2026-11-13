/**
 * A combo multi-select: a compact button that opens a checkbox-list dropdown.
 *
 * Shared by the plugins' filter rows (notes' scope/category/tag/projects and
 * plans' projects). Selections are an array of option values. Opening and
 * closing are owned by the parent, which also owns the "click outside any combo
 * closes it + Escape" handler, so this component needs no refs and no
 * per-combo listeners. The dropdown stays mounted while closed (checkboxes
 * keep state) and the search text resets on close.
 */
import type { Accessor } from "solid-js";
export type MultiSelectProps = {
    label: string;
    placeholder: string;
    options: string[];
    /** Display mapping (raw value -> localized label); selections keep the value. */
    display?: (opt: string) => string;
    /** Native tooltip per item (e.g. the full path behind a basename). */
    optionTitle?: (opt: string) => string | undefined;
    /** Live selection: an accessor, so `checked` stays tracked. */
    value: Accessor<string[]>;
    onValueChange: (v: string[]) => void;
    /** Which combo is open, shared by the row's combos. */
    openFilter: Accessor<string | null>;
    which: string;
    onOpenChange: () => void;
    /** The consuming plugin's translation function. */
    t: (key: string, ...args: unknown[]) => string;
    /** Extra class on the root, for row layout in the consuming plugin. */
    class?: string;
};
export declare function MultiSelect(props: MultiSelectProps): import("solid-js").JSX.Element;
