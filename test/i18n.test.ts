import { describe, expect, test } from "bun:test";
import {
  formatDate,
  formatNumber,
  interpolate,
  intlTag,
  supportedLocale,
} from "../src/gui/i18n";

describe("supportedLocale", () => {
  test("maps Portuguese tags to pt-br", () => {
    expect(supportedLocale("pt-BR")).toBe("pt-br");
    expect(supportedLocale("pt_BR")).toBe("pt-br");
    expect(supportedLocale("pt")).toBe("pt-br");
  });

  test("falls back to en-us", () => {
    expect(supportedLocale("en-US")).toBe("en-us");
    expect(supportedLocale("fr-FR")).toBe("en-us");
    expect(supportedLocale("")).toBe("en-us");
    expect(supportedLocale(undefined)).toBe("en-us");
  });
});

describe("intlTag", () => {
  test("returns BCP 47 tags", () => {
    expect(intlTag("pt-br")).toBe("pt-BR");
    expect(intlTag("en-us")).toBe("en-US");
  });
});

describe("interpolate", () => {
  test("replaces positional placeholders", () => {
    expect(interpolate("Page {0} of {1}", [2, 5])).toBe("Page 2 of 5");
  });

  test("keeps unknown placeholders empty instead of their token", () => {
    expect(interpolate("{0} / {1}", ["a"])).toBe("a / ");
  });
});

describe("Intl helpers", () => {
  test("formatNumber follows the locale", () => {
    expect(formatNumber(1234.5, "en-US")).toBe("1,234.5");
    expect(formatNumber(1234.5, "pt-BR")).toBe("1.234,5");
  });

  test("formatDate accepts a Date", () => {
    expect(formatDate(new Date(2026, 0, 2), "en-US", { day: "2-digit", month: "2-digit", year: "numeric" })).toBe(
      "01/02/2026",
    );
  });
});
