/**
 * Side-panel registration, shared by every plugin so the Panel, the command
 * and the session-panel menu item keep the same shape:
 *
 *  - one side tab, listed only while it is open in the strip;
 *  - a mobile entry in the More menu;
 *  - "Recently closed" support (`closed`);
 *  - a locale-reactive command and menu item.
 */

import { createMemo, Show } from "solid-js";
import type { Accessor, JSX } from "solid-js";
import { Command, MenuItem, Panel } from "@opencode/plugin/gui";
import type {
  IconName,
  MountedSession,
  Panel as PanelType,
  PanelTab,
  SessionPanelMenuItem,
  SetupContext,
} from "@opencode/plugin/gui";

export type PanelText = { readonly pt: string; readonly en: string };

export type SidePanelOptions = {
  /** Panel and tab id; the host key becomes `${plugin}:${id}`. */
  id: string;
  /** Tab, menu and mobile label. */
  title: PanelText;
  /** Icon in the session-panel menu and the mobile entry. */
  icon: IconName;
  /** Order among the `session.panel` menu items (native actions use 10-30). */
  order: number;
  /** Command label and description. */
  command: { title: PanelText; description?: PanelText };
  /** Default keybind. Omit it when the letter is taken or there is none. */
  bind?: string;
  /** Tab close button; defaults to "compact". */
  closable?: PanelTab["closable"];
  /** Opt into the host's fallback selection. Defaults to false. */
  fallback?: boolean;
  /** Order in the mobile More menu; defaults to 50. */
  mobileOrder?: number;
  /** The panel content, mounted once per session. */
  view: (props: { session: MountedSession }) => JSX.Element;
};

/** The label for the active locale. */
export function panelText(ctx: { locale: { locale(): string } }, text: PanelText): string {
  return (ctx.locale.locale() ?? "").toLowerCase().startsWith("pt") ? text.pt : text.en;
}

/** A locale-reactive tab descriptor, for panels that register their own tabs. */
export function createPanelTab<D>(
  ctx: SetupContext<D>,
  options: {
    id: string;
    title: PanelText;
    closable?: PanelTab["closable"];
    fallback?: boolean;
  },
): Accessor<PanelTab> {
  return createMemo<PanelTab>(() => ({
    id: options.id,
    title: panelText(ctx, options.title),
    closable: options.closable ?? "compact",
    fallback: options.fallback ?? false,
  }));
}

export function registerSidePanel<D>(
  ctx: SetupContext<D>,
  options: SidePanelOptions,
): { tab: Accessor<PanelTab>; open: () => void } {
  const tab = createPanelTab(ctx, {
    id: options.id,
    title: options.title,
    closable: options.closable,
    fallback: options.fallback,
  });

  const open = () => {
    const session = ctx.sessions.current();
    if (session) ctx.layout.open(`${ctx.id}:${options.id}`, session);
  };

  const panel: PanelType = {
    id: options.id,
    region: "side",
    mobile: {
      get title() {
        return panelText(ctx, options.title);
      },
      order: options.mobileOrder ?? 50,
      kind: "menu",
      icon: options.icon,
    },
    closed: () => ({}),
    list: (input) => (input.open.includes(options.id) ? [tab()] : []),
    render: (props) => (
      <Show when={props.session.key} keyed>
        {(_key) => options.view({ session: props.session })}
      </Show>
    ),
  };
  ctx.add(Panel, () => panel);

  ctx.add(Command, () => ({
    id: `open-${options.id}`,
    get title() {
      return panelText(ctx, options.command.title);
    },
    get description() {
      return options.command.description ? panelText(ctx, options.command.description) : undefined;
    },
    ...(options.bind ? { bind: options.bind } : {}),
    group: "general",
    run: open,
  }));

  ctx.add(MenuItem, (): SessionPanelMenuItem => ({
    menu: "session.panel",
    id: options.id,
    order: options.order,
    get title() {
      return panelText(ctx, options.title);
    },
    icon: options.icon,
    run: open,
  }));

  return { tab, open };
}
