import { describe, expect, test } from "bun:test";
import { scrollStep } from "../src/gui/scroll-math";

describe("scrollStep", () => {
  test("keeps a line of overlap", () => {
    expect(scrollStep(600)).toBe(552);
  });

  test("never returns a tiny step", () => {
    expect(scrollStep(40)).toBe(48);
    expect(scrollStep(0)).toBe(48);
  });
});
