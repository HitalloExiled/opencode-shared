/**
 * Shared states: empty list, inline error (with an optional retry), loading
 * row and end-of-list marker. All use the app tokens, so they follow the
 * user's theme.
 */
import type { IconName } from "@opencode/plugin/gui";
export type EmptyStateProps = {
    title: string;
    hint?: string;
    icon?: IconName;
};
export declare function EmptyState(props: EmptyStateProps): import("solid-js").JSX.Element;
export type ErrorBannerProps = {
    message: string;
    retryLabel?: string;
    onRetry?: () => void;
};
export declare function ErrorBanner(props: ErrorBannerProps): import("solid-js").JSX.Element;
export type LoadingRowProps = {
    label: string;
    class?: string;
};
export declare function LoadingRow(props: LoadingRowProps): import("solid-js").JSX.Element;
export declare function EndMarker(props: {
    label: string;
}): import("solid-js").JSX.Element;
export declare const STATES_CSS = "\n.os-empty { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 6px; padding: 24px 10px; color: var(--v2-text-text-muted); }\n.os-empty-icon { color: var(--v2-text-text-faint); }\n.os-empty-title { font-weight: 600; color: var(--v2-text-text-base); }\n.os-empty-hint { font-size: 11.5px; line-height: 1.45; }\n.os-error { display: flex; flex-direction: column; align-items: flex-start; gap: 6px; padding: 8px 10px; border-radius: 6px; color: var(--v2-state-fg-danger); background: var(--v2-state-bg-danger); border: 1px solid var(--v2-state-border-danger); white-space: pre-wrap; }\n.os-error-text { font-size: 12px; line-height: 1.45; overflow-wrap: anywhere; }\n.os-loading { display: flex; align-items: center; gap: 8px; padding: 8px 2px; color: var(--v2-text-text-muted); }\n.os-end { color: var(--v2-text-text-faint); font-size: 10px; text-align: center; padding: 4px 0 8px; }\n";
