/**
 * Shared states: empty list, inline error (with an optional retry), loading
 * row and end-of-list marker. All use the app tokens, so they follow the
 * user's theme.
 */

import { Show } from "solid-js";
import { usePlugin } from "@opencode/plugin/gui";
import type { IconName } from "@opencode/plugin/gui";
import statesCss from "./states.scss?inline";

export type EmptyStateProps = {
  title: string;
  hint?: string;
  icon?: IconName;
};

export function EmptyState(props: EmptyStateProps) {
  const ctx = usePlugin();
  return (
    <div class="os-empty">
      <Show when={props.icon}>
        {(icon) => <ctx.ui.Icon name={icon()} size="large" class="os-empty-icon" />}
      </Show>
      <div class="os-empty-title">{props.title}</div>
      <Show when={props.hint}>{(hint) => <div class="os-empty-hint">{hint()}</div>}</Show>
    </div>
  );
}

export type ErrorBannerProps = {
  message: string;
  retryLabel?: string;
  onRetry?: () => void;
};

export function ErrorBanner(props: ErrorBannerProps) {
  const ctx = usePlugin();
  return (
    <div class="os-error" role="alert">
      <span class="os-error-text">{props.message}</span>
      <Show when={props.retryLabel && props.onRetry}>
        <ctx.ui.Button size="small" variant="ghost" onClick={() => props.onRetry?.()}>
          {props.retryLabel}
        </ctx.ui.Button>
      </Show>
    </div>
  );
}

export type LoadingRowProps = {
  label: string;
  class?: string;
};

export function LoadingRow(props: LoadingRowProps) {
  const ctx = usePlugin();
  return (
    <div class={props.class ? `os-loading ${props.class}` : "os-loading"}>
      <ctx.ui.Loader size="small" />
      <span>{props.label}</span>
    </div>
  );
}

export function EndMarker(props: { label: string }) {
  return <div class="os-end">{props.label}</div>;
}

export const STATES_CSS = statesCss;
