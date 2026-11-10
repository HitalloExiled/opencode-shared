/**
 * Localization for plugin GUIs. EN-US is the source table and the fallback;
 * PT-BR is a full typed table, so a missing key fails the build.
 */
import type { Accessor } from "solid-js";
export type SupportedLocale = "en-us" | "pt-br";
export type Bundle = Record<string, string>;
export type Translate = (key: string, ...args: unknown[]) => string;
/** Maps any OpenCode locale tag to the two supported bundles. */
export declare function supportedLocale(raw?: string): SupportedLocale;
/** The BCP 47 tag for Intl formatters. */
export declare function intlTag(locale: SupportedLocale): string;
/**
 * Replaces `{0}`, `{1}`… with the arguments. A key missing from the active
 * table falls back to the first string argument (a raw value), then to the key
 * itself, so the UI never renders an empty string.
 */
export declare function interpolate(template: string, args: readonly unknown[]): string;
export type I18n<T extends Bundle> = {
    /** "pt-br" when the app locale is Portuguese, "en-us" otherwise. */
    useLocale(): Accessor<SupportedLocale>;
    /** A BCP 47 tag for Intl, e.g. "pt-BR". */
    useI18nTag(): Accessor<string>;
    /** The translate function for the active locale. */
    useT(): Translate;
    /** The resolved tables, for tests and diagnostics. */
    tables: Record<SupportedLocale, Bundle>;
};
export declare function createI18n<T extends Bundle>(en: T, pt: Record<keyof T, string>): I18n<T>;
export declare function formatNumber(value: number, tag: string, options?: Intl.NumberFormatOptions): string;
export declare function formatDate(value: number | Date, tag: string, options?: Intl.DateTimeFormatOptions): string;
