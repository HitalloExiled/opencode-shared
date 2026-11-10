/**
 * Scroll navigation for side panels.
 *
 * One scroll container per panel gets keyboard navigation (Home, End, PageUp,
 * PageDown), a floating pair of "to top" / "to bottom" buttons, and infinite
 * scroll: a sentinel at the end of the list asks for the next chunk while it
 * is within `margin` px of the viewport.
 *
 * The controller is created in the view's reactive scope; the view passes
 * `nav.ref` to the scrolling element, `nav.sentinelRef` to the sentinel, and
 * `nav.onKeyDown` to the element. `ScrollNav` renders the buttons.
 */
import { type Accessor } from "solid-js";
import type { IconName } from "@opencode/plugin/gui";
export { scrollStep } from "./scroll-math";
export type ScrollNavOptions = {
    /** More items can be appended. */
    hasMore: () => boolean;
    /** A chunk is in flight. */
    loadingMore: () => boolean;
    /** Appends the next chunk. */
    loadMore: () => void;
    /** The panel is on screen; defaults to always. */
    visible?: () => boolean;
    /** Item count; a new value triggers the fill check. */
    items?: () => number;
    /** Distance from an edge that counts as "at" it, in px. */
    edge?: number;
    /** Prefetch distance before the sentinel, in px. */
    margin?: number;
};
export type ScrollController = {
    ref: (element: HTMLDivElement) => void;
    sentinelRef: (element: HTMLDivElement) => void;
    scrollable: Accessor<boolean>;
    atTop: Accessor<boolean>;
    atBottom: Accessor<boolean>;
    /** Recomputes the edge state; call it after a layout that is not observed. */
    measure: () => void;
    toTop: () => void;
    toBottom: () => void;
    onKeyDown: (event: KeyboardEvent) => void;
};
export declare function createScrollNav(options: ScrollNavOptions): ScrollController;
export type ScrollNavProps = {
    nav: ScrollController;
    topLabel: string;
    bottomLabel: string;
    topIcon?: IconName;
    bottomIcon?: IconName;
};
/** Two floating buttons at the top and bottom edges of the scroll area. */
export declare function ScrollNav(props: ScrollNavProps): import("solid-js").JSX.Element;
export declare const SCROLL_CSS = "\n.os-scroll { scrollbar-width: thin; scrollbar-color: var(--v2-border-border-strong) transparent; }\n.os-scroll::-webkit-scrollbar { width: 10px; }\n.os-scroll::-webkit-scrollbar-thumb { background: var(--v2-border-border-strong); border-radius: 8px; border: 3px solid transparent; background-clip: padding-box; }\n.os-scroll:focus-visible { outline: 2px solid var(--v2-border-border-focus); outline-offset: -2px; }\n.os-scroll-btn { position: absolute; left: 50%; transform: translateX(-50%); z-index: 10; display: flex; }\n.os-scroll-btn.is-top { top: 8px; }\n.os-scroll-btn.is-bottom { bottom: 8px; }\n.os-scroll-btn [data-component=\"icon-button-v2\"] { box-shadow: var(--v2-elevation-raised); }\n.os-scroll-sentinel { height: 1px; flex: 0 0 auto; }\n";
