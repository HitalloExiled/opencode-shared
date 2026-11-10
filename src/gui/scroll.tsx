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

import { createEffect, createSignal, onCleanup, Show, type Accessor } from "solid-js";
import { usePlugin } from "@opencode/plugin/gui";
import type { IconName } from "@opencode/plugin/gui";
import { scrollStep } from "./scroll-math";

export { scrollStep } from "./scroll-math";

const EDGE = 24;
const PREFETCH = 200;
const EDITABLE =
  "input, textarea, select, [contenteditable='true'], [contenteditable=''], [role='textbox']";

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

export function createScrollNav(options: ScrollNavOptions): ScrollController {
  const edge = options.edge ?? EDGE;
  const margin = options.margin ?? PREFETCH;
  let element: HTMLDivElement | undefined;
  let sentinel: HTMLDivElement | undefined;
  let observer: IntersectionObserver | undefined;
  let resize: ResizeObserver | undefined;
  let measureFrame = 0;
  let fillFrame = 0;

  const [scrollable, setScrollable] = createSignal(false);
  const [atTop, setAtTop] = createSignal(true);
  const [atBottom, setAtBottom] = createSignal(false);

  const visible = () =>
    (options.visible?.() ?? true) && document.visibilityState === "visible";
  const canLoad = () => options.hasMore() && !options.loadingMore() && visible();

  const measure = () => {
    if (!element) return;
    const max = element.scrollHeight - element.clientHeight;
    setScrollable(max > 1);
    setAtTop(element.scrollTop <= edge);
    setAtBottom(element.scrollTop >= max - edge);
  };

  const scheduleMeasure = () => {
    if (measureFrame) return;
    measureFrame = requestAnimationFrame(() => {
      measureFrame = 0;
      measure();
    });
  };

  // Run after a chunk lands: if the sentinel is still within reach, ask for
  // another. The observer only fires on an intersection change, so a list
  // shorter than the viewport needs this safety net.
  const fill = () => {
    if (fillFrame) return;
    fillFrame = requestAnimationFrame(() => {
      fillFrame = 0;
      if (!element || !sentinel || !canLoad()) return;
      const root = element.getBoundingClientRect();
      const end = sentinel.getBoundingClientRect();
      if (end.top <= root.bottom + margin) options.loadMore();
    });
  };

  const behavior = (): ScrollBehavior =>
    matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

  const focus = () => element?.focus({ preventScroll: true });

  const toTop = () => {
    element?.scrollTo({ top: 0, behavior: behavior() });
    focus();
  };

  const toBottom = () => {
    if (!element) return;
    element.scrollTo({ top: element.scrollHeight, behavior: behavior() });
    if (canLoad()) options.loadMore();
    focus();
  };

  const isEditable = (target: EventTarget | null) =>
    target instanceof HTMLElement && target.closest(EDITABLE) !== null;

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
    if (isEditable(event.target)) return;
    if (!element || element.scrollHeight <= element.clientHeight) return;

    const step = scrollStep(element.clientHeight);
    switch (event.key) {
      case "Home":
        event.preventDefault();
        element.scrollTop = 0;
        break;
      case "End":
        event.preventDefault();
        element.scrollTop = element.scrollHeight;
        if (canLoad()) options.loadMore();
        break;
      case "PageUp":
        event.preventDefault();
        element.scrollTop = Math.max(0, element.scrollTop - step);
        break;
      case "PageDown":
        event.preventDefault();
        element.scrollTop = Math.min(element.scrollHeight, element.scrollTop + step);
        break;
      default:
        return;
    }
  };

  const connect = () => {
    if (!element) return;
    resize?.disconnect();
    resize = new ResizeObserver(scheduleMeasure);
    resize.observe(element);
    observer?.disconnect();
    observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting) && canLoad()) options.loadMore();
      },
      { root: element, rootMargin: `${margin}px 0px` },
    );
    if (sentinel) observer.observe(sentinel);
    measure();
  };

  const ref = (next: HTMLDivElement) => {
    element = next;
    connect();
  };

  const sentinelRef = (next: HTMLDivElement) => {
    sentinel = next;
    if (observer) observer.observe(next);
  };

  // Re-measure and refill whenever the data or the visibility changes.
  createEffect(() => {
    options.hasMore();
    options.loadingMore();
    options.visible?.();
    options.items?.();
    scheduleMeasure();
    fill();
  });

  onCleanup(() => {
    resize?.disconnect();
    observer?.disconnect();
    cancelAnimationFrame(measureFrame);
    cancelAnimationFrame(fillFrame);
  });

  return { ref, sentinelRef, scrollable, atTop, atBottom, measure, toTop, toBottom, onKeyDown };
}

export type ScrollNavProps = {
  nav: ScrollController;
  topLabel: string;
  bottomLabel: string;
  topIcon?: IconName;
  bottomIcon?: IconName;
};

/** Two floating buttons at the top and bottom edges of the scroll area. */
export function ScrollNav(props: ScrollNavProps) {
  const ctx = usePlugin();
  return (
    <>
      <Show when={props.nav.scrollable() && !props.nav.atTop()}>
        <ctx.ui.Tooltip value={props.topLabel} keys={["Home"]}>
          <ctx.ui.IconButton
            icon={props.topIcon ?? "arrow-up"}
            label={props.topLabel}
            variant="neutral"
            size="normal"
            class="os-scroll-btn is-top"
            onClick={props.nav.toTop}
          />
        </ctx.ui.Tooltip>
      </Show>
      <Show when={props.nav.scrollable() && !props.nav.atBottom()}>
        <ctx.ui.Tooltip value={props.bottomLabel} keys={["End"]}>
          <ctx.ui.IconButton
            icon={props.bottomIcon ?? "arrow-down-to-line"}
            label={props.bottomLabel}
            variant="neutral"
            size="normal"
            class="os-scroll-btn is-bottom"
            onClick={props.nav.toBottom}
          />
        </ctx.ui.Tooltip>
      </Show>
    </>
  );
}

export const SCROLL_CSS = `
.os-scroll { scrollbar-width: thin; scrollbar-color: var(--v2-border-border-strong) transparent; }
.os-scroll::-webkit-scrollbar { width: 10px; }
.os-scroll::-webkit-scrollbar-thumb { background: var(--v2-border-border-strong); border-radius: 8px; border: 3px solid transparent; background-clip: padding-box; }
.os-scroll:focus-visible { outline: 2px solid var(--v2-border-border-focus); outline-offset: -2px; }
.os-scroll-btn { position: absolute; right: 8px; z-index: 10; box-shadow: var(--v2-elevation-raised); }
.os-scroll-btn.is-top { top: 8px; }
.os-scroll-btn.is-bottom { bottom: 8px; }
.os-scroll-sentinel { height: 1px; flex: 0 0 auto; }
`;
