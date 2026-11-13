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

import { createEffect, createMemo, createSignal, Show } from "solid-js"
import type { Accessor } from "solid-js"
import { usePlugin } from "@opencode/plugin/gui"

export type MultiSelectProps = {
  label: string
  placeholder: string
  options: string[]
  /** Display mapping (raw value -> localized label); selections keep the value. */
  display?: (opt: string) => string
  /** Native tooltip per item (e.g. the full path behind a basename). */
  optionTitle?: (opt: string) => string | undefined
  /** Live selection: an accessor, so `checked` stays tracked. */
  value: Accessor<string[]>
  onValueChange: (v: string[]) => void
  /** Which combo is open, shared by the row's combos. */
  openFilter: Accessor<string | null>
  which: string
  onOpenChange: () => void
  /** The consuming plugin's translation function. */
  t: (key: string, ...args: unknown[]) => string
  /** Extra class on the root, for row layout in the consuming plugin. */
  class?: string
}

const CSS = `
.oc-ms { position: relative; }
.oc-ms .oc-ms-row { display: flex; gap: 4px; align-items: stretch; }
.oc-ms .oc-ms-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  flex: 1;
  width: auto;
  min-width: 0;
  min-height: 34px;
  padding: 5px 10px;
  border: 1px solid var(--v2-border-border-muted);
  border-radius: 4px;
  background: var(--v2-background-bg-layer-02);
  color: var(--v2-text-text-base);
  font: inherit;
  cursor: pointer;
  user-select: none;
  text-align: left;
}
.oc-ms .oc-ms-btn:hover { border-color: var(--v2-border-border-strong); }
.oc-ms .oc-ms-btn:focus-visible { outline: 2px solid var(--v2-border-border-focus); outline-offset: 0; }
.oc-ms .oc-ms-btn-label {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.oc-ms .oc-ms-btn-label.is-placeholder { color: var(--v2-text-text-faint); font-style: italic; }
.oc-ms .oc-ms-btn-content { flex: 1; min-width: 0; display: flex; align-items: center; justify-content: flex-start; gap: 6px; }
.oc-ms .oc-ms-tags { display: inline-flex; align-items: center; gap: 6px; max-width: none; overflow: visible; }
.oc-ms .oc-ms-tag {
  display: inline-flex;
  align-items: center;
  max-width: none;
  overflow: visible;
  padding: 1px 6px;
  border: 1px solid var(--v2-border-border-muted);
  border-radius: 4px;
  background: var(--v2-overlay-simple-overlay-pressed);
  color: var(--v2-text-text-base);
  font-size: 11.5px;
  font-weight: 500;
  white-space: nowrap;
}
.oc-ms .oc-ms-tag-more { background: transparent; border: 0; color: var(--v2-text-text-muted); }
.oc-ms .oc-ms-caret {
  flex: 0 0 auto;
  width: 8px;
  height: 8px;
  border-left: 1.5px solid currentColor;
  border-bottom: 1.5px solid currentColor;
  transform: rotate(45deg);
  transition: transform 0.12s ease;
}
.oc-ms .oc-ms-x {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 4px;
  color: var(--v2-text-text-muted);
  cursor: pointer;
}
.oc-ms .oc-ms-x:hover { background: var(--v2-overlay-simple-overlay-hover); color: var(--v2-text-text-base); }
.oc-ms .oc-ms-x:focus-visible { outline: 2px solid var(--v2-border-border-focus); outline-offset: 0; }
.oc-ms .oc-ms-clear { font-size: 15px; line-height: 1; }
.oc-ms .oc-ms-panel {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  z-index: 1000;
  max-height: 280px;
  overflow-y: auto;
  background: var(--v2-background-bg-base);
  border: 1px solid var(--v2-border-border-muted);
  border-radius: 6px;
  box-shadow: 0 12px 28px rgb(0 0 0 / 0.35);
}
.oc-ms .oc-ms-panel.is-hidden { display: none; }
.oc-ms .oc-ms-head {
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 6px 8px;
  font-size: 11px;
  font-weight: 550;
  color: var(--v2-text-text-muted);
  border-bottom: 1px solid var(--v2-border-border-muted);
  background: var(--v2-background-bg-base);
}
.oc-ms .oc-ms-list { display: flex; flex-direction: column; gap: 2px; padding: 4px; }
.oc-ms .oc-ms-search { padding: 4px 8px; }
.oc-ms .oc-ms-search-input {
  width: 100%;
  box-sizing: border-box;
  padding: 3px 6px;
  border: 1px solid var(--v2-border-border-muted);
  border-radius: 4px;
  background: var(--v2-background-bg-layer-02);
  color: var(--v2-text-text-base);
  font: inherit;
  font-size: 12.5px;
}
.oc-ms .oc-ms-search-input:focus { outline: 2px solid var(--v2-border-border-focus); outline-offset: 0; }
.oc-ms .oc-ms-empty { padding: 12px 8px; font-size: 12.5px; color: var(--v2-text-text-faint); }
.oc-ms .oc-ms-option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12.5px;
  color: var(--v2-text-text-base);
}
.oc-ms .oc-ms-option:hover { background: var(--v2-overlay-simple-overlay-pressed); }
.oc-ms .oc-ms-option input[type="checkbox"] {
  margin: 0;
  flex: 0 0 auto;
  accent-color: var(--v2-state-fg-success);
}
.oc-ms .oc-ms-option span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
`

const matches = (text: string, query: string): boolean =>
  text.toLowerCase().includes(query.toLowerCase())

export function MultiSelect(props: MultiSelectProps) {
  const ctx = usePlugin()
  const show = (opt: string) => props.display?.(opt) ?? opt
  // Reactive open state (memo => a signal <Show> can track), driven by the
  // shared `openFilter` so only one combo is open at a time.
  const open = createMemo(() => props.openFilter() === props.which)

  // Derive the next selection from the checkbox's actual post-click state
  // (e.target.checked), not from a render-time snapshot: unchecking always
  // drops the option, even if the DOM diverged from the signal.
  const toggle = (opt: string, checked: boolean) => {
    const current = props.value()
    if (checked) props.onValueChange(current.includes(opt) ? current : [...current, opt])
    else props.onValueChange(current.filter((v) => v !== opt))
  }
  const clear = () => props.onValueChange([])

  // Free-text search that narrows the options shown; resets on close. The
  // selection is untouched by the search.
  const [search, setSearch] = createSignal("")
  createEffect(() => {
    if (!open()) setSearch("")
  })
  // Matches both the raw value and the display text, so a translated label
  // and its stored value are both findable.
  const visibleOptions = createMemo(() => {
    const q = search().trim()
    if (!q) return props.options
    return props.options.filter((opt) => matches(opt, q) || matches(show(opt), q))
  })

  return (
    <div class={props.class ? `oc-ms ${props.class}` : "oc-ms"}>
      <style>{CSS}</style>
      <div class="oc-ms-row">
        <button
          class="oc-ms-btn"
          type="button"
          aria-expanded={open()}
          aria-label={props.label}
          onClick={props.onOpenChange}
        >
          <div class="oc-ms-btn-content">
            <Show when={props.value().length === 0}>
              <span class="oc-ms-btn-label is-placeholder">{props.placeholder}</span>
            </Show>
            <Show when={props.value().length > 0}>
              <span class="oc-ms-tags">
                {props.value().slice(0, 2).map((opt) => (
                  <span class="oc-ms-tag">{show(opt)}</span>
                ))}
                {props.value().length > 2 && (
                  <span class="oc-ms-tag oc-ms-tag-more">+{props.value().length - 2}</span>
                )}
              </span>
            </Show>
          </div>
          <Show when={props.value().length === 0}>
            <span class="oc-ms-caret" aria-hidden="true" />
          </Show>
          <Show when={props.value().length > 0}>
            <span
              class="oc-ms-x"
              role="button"
              aria-label={props.t("filter.clearLabel", props.label)}
              tabIndex={0}
              onClick={(event) => {
                event.stopPropagation()
                clear()
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault()
                  event.stopPropagation()
                  clear()
                }
              }}
            >
              <span class="oc-ms-clear" aria-hidden="true">×</span>
            </span>
          </Show>
        </button>
      </div>

      <div class={open() ? "oc-ms-panel" : "oc-ms-panel is-hidden"} aria-hidden={!open()}>
        <div class="oc-ms-head">
          <span>{props.label}</span>
          <Show when={props.value().length > 0}>
            <ctx.ui.Button size="small" variant="ghost" onClick={clear}>
              {props.t("filter.clear")}
            </ctx.ui.Button>
          </Show>
        </div>
        <div class="oc-ms-search">
          <input
            type="text"
            class="oc-ms-search-input"
            placeholder={props.t("filter.searchPlaceholder")}
            aria-label={props.t("filter.searchLabel", props.label)}
            value={search()}
            onInput={(event) => setSearch((event.target as HTMLInputElement).value)}
          />
        </div>
        <div class="oc-ms-list">
          <Show when={search().trim() !== "" && visibleOptions().length === 0}>
            <div class="oc-ms-empty">{props.t("filter.none")}</div>
          </Show>
          {visibleOptions().map((opt) => (
            <label class="oc-ms-option" title={props.optionTitle?.(opt)}>
              <input
                type="checkbox"
                checked={props.value().includes(opt)}
                onChange={(event) => toggle(opt, event.target.checked)}
              />
              <span>{show(opt)}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
