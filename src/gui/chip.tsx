/** Status chips: one pill shape, tones from the app's state tokens. */

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

export const CHIP_CSS = `
.os-chip { display: inline-flex; align-items: center; gap: 4px; padding: 1px 6px; border-radius: 999px; font-size: 10.5px; font-weight: 600; line-height: 1.6; white-space: nowrap; background: var(--v2-overlay-simple-overlay-pressed); color: var(--v2-text-text-muted); border: 1px solid transparent; }
.os-chip.is-info { background: var(--v2-state-bg-info); color: var(--v2-state-fg-info); border-color: var(--v2-state-border-info); }
.os-chip.is-success { background: var(--v2-state-bg-success); color: var(--v2-state-fg-success); border-color: var(--v2-state-border-success); }
.os-chip.is-warning { background: var(--v2-state-bg-warning); color: var(--v2-state-fg-warning); border-color: var(--v2-state-border-warning); }
.os-chip.is-danger { background: var(--v2-state-bg-danger); color: var(--v2-state-fg-danger); border-color: var(--v2-state-border-danger); }
`;
