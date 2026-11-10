/**
 * Localization for plugin GUIs. EN-US is the source table and the fallback;
 * PT-BR is a full typed table, so a missing key fails the build.
 */

import { createMemo } from "solid-js";
import type { Accessor } from "solid-js";
import { usePlugin } from "@opencode/plugin/gui";

export type SupportedLocale = "en-us" | "pt-br";
export type Bundle = Record<string, string>;
export type Translate = (key: string, ...args: unknown[]) => string;

/** Maps any OpenCode locale tag to the two supported bundles. */
export function supportedLocale(raw?: string): SupportedLocale {
  const tag = (raw ?? "").trim().toLowerCase().replace(/[-_]/g, "");
  return tag.startsWith("pt") ? "pt-br" : "en-us";
}

/** The BCP 47 tag for Intl formatters. */
export function intlTag(locale: SupportedLocale): string {
  return locale === "pt-br" ? "pt-BR" : "en-US";
}

/**
 * Replaces `{0}`, `{1}`… with the arguments. A key missing from the active
 * table falls back to the first string argument (a raw value), then to the key
 * itself, so the UI never renders an empty string.
 */
export function interpolate(template: string, args: readonly unknown[]): string {
  return template.replace(/\{(\d+)\}/g, (_, index: string) => String(args[Number(index)] ?? ""));
}

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

export function createI18n<T extends Bundle>(en: T, pt: Record<keyof T, string>): I18n<T> {
  const tables: Record<SupportedLocale, Bundle> = { "en-us": en, "pt-br": pt };

  const useLocale = (): Accessor<SupportedLocale> => {
    const ctx = usePlugin();
    return createMemo(() => supportedLocale(ctx.locale.locale()));
  };

  const useI18nTag = (): Accessor<string> => {
    const locale = useLocale();
    return createMemo(() => intlTag(locale()));
  };

  const useT = (): Translate => {
    const locale = useLocale();
    return (key: string, ...args: unknown[]): string => {
      const table = tables[locale()];
      const value = table[key] ?? (typeof args[0] === "string" ? args[0] : key);
      return interpolate(value, args);
    };
  };

  return { useLocale, useI18nTag, useT, tables };
}

export function formatNumber(
  value: number,
  tag: string,
  options?: Intl.NumberFormatOptions,
): string {
  return new Intl.NumberFormat(tag, options).format(value);
}

export function formatDate(
  value: number | Date,
  tag: string,
  options?: Intl.DateTimeFormatOptions,
): string {
  return new Intl.DateTimeFormat(tag, options).format(value);
}
