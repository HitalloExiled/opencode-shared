/**
 * Pure scroll math, kept apart from the Solid component so tests do not need
 * a Solid runtime.
 */
/** One page of keyboard scrolling, keeping a line of overlap. */
export declare function scrollStep(clientHeight: number): number;
