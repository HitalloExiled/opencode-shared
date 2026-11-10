/**
 * Pure scroll math, kept apart from the Solid component so tests do not need
 * a Solid runtime.
 */

const MIN_STEP = 48;
const OVERLAP = 48;

/** One page of keyboard scrolling, keeping a line of overlap. */
export function scrollStep(clientHeight: number): number {
  return Math.max(MIN_STEP, clientHeight - OVERLAP);
}
