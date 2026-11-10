/**
 * All shared CSS in one string. A plugin renders `<style>{SHARED_CSS}</style>`
 * once per panel: the app loads a single bundle, so components ship their
 * styles as strings instead of importing .css files.
 */

import { SCROLL_CSS } from "./scroll";
import { STATES_CSS } from "./states";
import { CHIP_CSS } from "./chip";

export const SHARED_CSS = `${SCROLL_CSS}${STATES_CSS}${CHIP_CSS}`;
