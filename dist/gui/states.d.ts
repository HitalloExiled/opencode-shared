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
export declare const STATES_CSS: string;
