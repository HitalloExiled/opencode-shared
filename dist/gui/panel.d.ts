/**
 * Side-panel registration, shared by every plugin so the Panel, the command
 * and the session-panel menu item keep the same shape:
 *
 *  - one side tab, listed only while it is open in the strip;
 *  - a mobile entry in the More menu;
 *  - "Recently closed" support (`closed`);
 *  - a locale-reactive command and menu item.
 */
import type { Accessor, JSX } from "solid-js";
import type { IconName, MountedSession, PanelTab, SetupContext } from "@opencode/plugin/gui";
export type PanelText = {
    readonly pt: string;
    readonly en: string;
};
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
    command: {
        title: PanelText;
        description?: PanelText;
    };
    /** Default keybind. Omit it when the letter is taken or there is none. */
    bind?: string;
    /** Tab close button; defaults to "compact". */
    closable?: PanelTab["closable"];
    /** Opt into the host's fallback selection. Defaults to false. */
    fallback?: boolean;
    /** Order in the mobile More menu; defaults to 50. */
    mobileOrder?: number;
    /** The panel content, mounted once per session. */
    view: (props: {
        session: MountedSession;
    }) => JSX.Element;
};
/** The label for the active locale. */
export declare function panelText(ctx: {
    locale: {
        locale(): string;
    };
}, text: PanelText): string;
/** A locale-reactive tab descriptor, for panels that register their own tabs. */
export declare function createPanelTab<D>(ctx: SetupContext<D>, options: {
    id: string;
    title: PanelText;
    closable?: PanelTab["closable"];
    fallback?: boolean;
}): Accessor<PanelTab>;
export declare function registerSidePanel<D>(ctx: SetupContext<D>, options: SidePanelOptions): {
    tab: Accessor<PanelTab>;
    open: () => void;
};
