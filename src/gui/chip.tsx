/** Status chips: one pill shape, tones from the app's state tokens. */

import chipCss from "./chip.scss?inline";

export type ChipTone = "neutral" | "info" | "success" | "warning" | "danger";

export type StatusChipProps = {
  label: string;
  tone?: ChipTone;
  title?: string;
  class?: string;
};

export function StatusChip(props: StatusChipProps) {
  const classes = () => {
    const tone = props.tone ?? "neutral";
    return `os-chip${tone === "neutral" ? "" : ` is-${tone}`}${props.class ? ` ${props.class}` : ""}`;
  };
  return (
    <span class={classes()} title={props.title}>
      {props.label}
    </span>
  );
}

export const CHIP_CSS = chipCss;
