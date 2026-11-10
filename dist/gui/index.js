import { createComponent as s, insert as c, memo as T, template as b, effect as C, className as E, setAttribute as W } from "solid-js/web";
import { Show as v, createSignal as k, createEffect as G, onCleanup as V, createMemo as _ } from "solid-js";
import { usePlugin as x, Panel as X, Command as j, MenuItem as J } from "@opencode/plugin/gui";
const Q = 48, Y = 48;
function Z(e) {
  return Math.max(Q, e - Y);
}
var ee = /* @__PURE__ */ b('<div class="os-scroll-btn is-top">'), te = /* @__PURE__ */ b('<div class="os-scroll-btn is-bottom">');
const re = 24, ne = 200, le = "input, textarea, select, [contenteditable='true'], [contenteditable=''], [role='textbox']";
function ye(e) {
  const t = e.edge ?? re, n = e.margin ?? ne;
  let r, a, o, i, u, g = 0, f = 0;
  const [w, L] = k(!1), [M, I] = k(!0), [H, B] = k(!1), R = () => {
    var l;
    return (((l = e.visible) == null ? void 0 : l.call(e)) ?? !0) && document.visibilityState === "visible";
  }, p = () => e.hasMore() && !e.loadingMore() && R(), y = () => {
    if (!r) return;
    const l = r.scrollHeight - r.clientHeight;
    L(l > 1), I(r.scrollTop <= t), B(r.scrollTop >= l - t);
  }, $ = () => {
    g || (g = requestAnimationFrame(() => {
      g = 0, y();
    }));
  }, A = () => {
    f || (f = requestAnimationFrame(() => {
      if (f = 0, !r || !a || !p()) return;
      const l = r.getBoundingClientRect();
      a.getBoundingClientRect().top <= l.bottom + n && e.loadMore();
    }));
  }, m = (l) => r == null ? void 0 : r.scrollTo({
    top: l,
    behavior: "smooth"
  }), S = () => r == null ? void 0 : r.focus({
    preventScroll: !0
  }), D = () => {
    m(0), S();
  }, P = () => {
    r && (m(r.scrollHeight), p() && e.loadMore(), S());
  }, F = (l) => l instanceof HTMLElement && l.closest(le) !== null, z = (l) => {
    if (l.defaultPrevented || l.altKey || l.ctrlKey || l.metaKey || F(l.target) || !r || r.scrollHeight <= r.clientHeight) return;
    const d = Z(r.clientHeight);
    switch (l.key) {
      case "Home":
        l.preventDefault(), m(0);
        break;
      case "End":
        l.preventDefault(), m(r.scrollHeight), p() && e.loadMore();
        break;
      case "PageUp":
        l.preventDefault(), m(Math.max(0, r.scrollTop - d));
        break;
      case "PageDown":
        l.preventDefault(), m(Math.min(r.scrollHeight, r.scrollTop + d));
        break;
      default:
        return;
    }
  }, N = () => {
    if (u == null || u(), u = void 0, !r) return;
    const l = r, d = () => $();
    l.addEventListener("scroll", d, {
      passive: !0
    }), u = () => l.removeEventListener("scroll", d), i == null || i.disconnect(), i = new ResizeObserver($), i.observe(r), o == null || o.disconnect(), o = new IntersectionObserver((q) => {
      q.some((U) => U.isIntersecting) && p() && e.loadMore();
    }, {
      root: r,
      rootMargin: `${n}px 0px`
    }), a && o.observe(a), y();
  }, O = (l) => {
    r = l, N();
  }, K = (l) => {
    a = l, o && o.observe(l);
  };
  return G(() => {
    var l, d;
    e.hasMore(), e.loadingMore(), (l = e.visible) == null || l.call(e), (d = e.items) == null || d.call(e), $(), A();
  }), V(() => {
    u == null || u(), i == null || i.disconnect(), o == null || o.disconnect(), cancelAnimationFrame(g), cancelAnimationFrame(f);
  }), {
    ref: O,
    sentinelRef: K,
    scrollable: w,
    atTop: M,
    atBottom: H,
    measure: y,
    toTop: D,
    toBottom: P,
    onKeyDown: z
  };
}
function $e(e) {
  const t = x();
  return [s(v, {
    get when() {
      return T(() => !!e.nav.scrollable())() && !e.nav.atTop();
    },
    get children() {
      var n = ee();
      return c(n, s(t.ui.Tooltip, {
        get value() {
          return e.topLabel;
        },
        keys: ["Home"],
        get children() {
          return s(t.ui.IconButton, {
            get icon() {
              return e.topIcon ?? "arrow-up";
            },
            get label() {
              return e.topLabel;
            },
            variant: "neutral",
            size: "normal",
            get onClick() {
              return e.nav.toTop;
            }
          });
        }
      })), n;
    }
  }), s(v, {
    get when() {
      return T(() => !!e.nav.scrollable())() && !e.nav.atBottom();
    },
    get children() {
      var n = te();
      return c(n, s(t.ui.Tooltip, {
        get value() {
          return e.bottomLabel;
        },
        keys: ["End"],
        get children() {
          return s(t.ui.IconButton, {
            get icon() {
              return e.bottomIcon ?? "arrow-down-to-line";
            },
            get label() {
              return e.bottomLabel;
            },
            variant: "neutral",
            size: "normal",
            get onClick() {
              return e.nav.toBottom;
            }
          });
        }
      })), n;
    }
  })];
}
const oe = `
.os-scroll { scrollbar-width: thin; scrollbar-color: var(--v2-border-border-strong) transparent; scroll-behavior: smooth; }
.os-scroll::-webkit-scrollbar { width: 10px; }
.os-scroll::-webkit-scrollbar-thumb { background: var(--v2-border-border-strong); border-radius: 8px; border: 3px solid transparent; background-clip: padding-box; }
.os-scroll:focus-visible { outline: 2px solid var(--v2-border-border-focus); outline-offset: -2px; }
.os-scroll-btn { position: absolute; left: 50%; transform: translateX(-50%); z-index: 10; display: flex; }
.os-scroll-btn.is-top { top: 8px; }
.os-scroll-btn.is-bottom { bottom: 8px; }
.os-scroll-btn [data-component="icon-button-v2"] { box-shadow: var(--v2-elevation-raised); }
.os-scroll-sentinel { height: 1px; flex: 0 0 auto; }
`;
var ae = /* @__PURE__ */ b("<div class=os-empty><div class=os-empty-title>"), ie = /* @__PURE__ */ b("<div class=os-empty-hint>"), se = /* @__PURE__ */ b("<div class=os-error role=alert><span class=os-error-text>"), ce = /* @__PURE__ */ b("<div><span>"), ue = /* @__PURE__ */ b("<div class=os-end>");
function ke(e) {
  const t = x();
  return (() => {
    var n = ae(), r = n.firstChild;
    return c(n, s(v, {
      get when() {
        return e.icon;
      },
      children: (a) => s(t.ui.Icon, {
        get name() {
          return a();
        },
        size: "large",
        class: "os-empty-icon"
      })
    }), r), c(r, () => e.title), c(n, s(v, {
      get when() {
        return e.hint;
      },
      children: (a) => (() => {
        var o = ie();
        return c(o, a), o;
      })()
    }), null), n;
  })();
}
function Te(e) {
  const t = x();
  return (() => {
    var n = se(), r = n.firstChild;
    return c(r, () => e.message), c(n, s(v, {
      get when() {
        return T(() => !!e.retryLabel)() && e.onRetry;
      },
      get children() {
        return s(t.ui.Button, {
          size: "small",
          variant: "ghost",
          onClick: () => {
            var a;
            return (a = e.onRetry) == null ? void 0 : a.call(e);
          },
          get children() {
            return e.retryLabel;
          }
        });
      }
    }), null), n;
  })();
}
function _e(e) {
  const t = x();
  return (() => {
    var n = ce(), r = n.firstChild;
    return c(n, s(t.ui.Loader, {
      size: "small"
    }), r), c(r, () => e.label), C(() => E(n, e.class ? `os-loading ${e.class}` : "os-loading")), n;
  })();
}
function Se(e) {
  return (() => {
    var t = ue();
    return c(t, () => e.label), t;
  })();
}
const de = `
.os-empty { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 6px; padding: 24px 10px; color: var(--v2-text-text-muted); }
.os-empty-icon { color: var(--v2-text-text-faint); }
.os-empty-title { font-weight: 600; color: var(--v2-text-text-base); }
.os-empty-hint { font-size: 11.5px; line-height: 1.45; }
.os-error { display: flex; flex-direction: column; align-items: flex-start; gap: 6px; padding: 8px 10px; border-radius: 6px; color: var(--v2-state-fg-danger); background: var(--v2-state-bg-danger); border: 1px solid var(--v2-state-border-danger); white-space: pre-wrap; }
.os-error-text { font-size: 12px; line-height: 1.45; overflow-wrap: anywhere; }
.os-loading { display: flex; align-items: center; gap: 8px; padding: 8px 2px; color: var(--v2-text-text-muted); }
.os-end { color: var(--v2-text-text-faint); font-size: 10px; text-align: center; padding: 4px 0 8px; }
`;
var ge = /* @__PURE__ */ b("<span>");
function Ce(e) {
  const t = () => {
    const n = e.tone ?? "neutral";
    return `os-chip${n === "neutral" ? "" : ` is-${n}`}${e.class ? ` ${e.class}` : ""}`;
  };
  return (() => {
    var n = ge();
    return c(n, () => e.label), C((r) => {
      var a = t(), o = e.title;
      return a !== r.e && E(n, r.e = a), o !== r.t && W(n, "title", r.t = o), r;
    }, {
      e: void 0,
      t: void 0
    }), n;
  })();
}
const be = `
.os-chip { display: inline-flex; align-items: center; gap: 4px; padding: 1px 6px; border-radius: 999px; font-size: 10.5px; font-weight: 600; line-height: 1.6; white-space: nowrap; background: var(--v2-overlay-simple-overlay-pressed); color: var(--v2-text-text-muted); border: 1px solid transparent; }
.os-chip.is-info { background: var(--v2-state-bg-info); color: var(--v2-state-fg-info); border-color: var(--v2-state-border-info); }
.os-chip.is-success { background: var(--v2-state-bg-success); color: var(--v2-state-fg-success); border-color: var(--v2-state-border-success); }
.os-chip.is-warning { background: var(--v2-state-bg-warning); color: var(--v2-state-fg-warning); border-color: var(--v2-state-border-warning); }
.os-chip.is-danger { background: var(--v2-state-bg-danger); color: var(--v2-state-fg-danger); border-color: var(--v2-state-border-danger); }
`;
function me(e) {
  return (e ?? "").trim().toLowerCase().replace(/[-_]/g, "").startsWith("pt") ? "pt-br" : "en-us";
}
function ve(e) {
  return e === "pt-br" ? "pt-BR" : "en-US";
}
function fe(e, t) {
  return e.replace(/\{(\d+)\}/g, (n, r) => String(t[Number(r)] ?? ""));
}
function Ee(e, t) {
  const n = { "en-us": e, "pt-br": t }, r = () => {
    const i = x();
    return _(() => me(i.locale.locale()));
  };
  return { useLocale: r, useI18nTag: () => {
    const i = r();
    return _(() => ve(i()));
  }, useT: () => {
    const i = r();
    return (u, ...g) => {
      const w = n[i()][u] ?? (typeof g[0] == "string" ? g[0] : u);
      return fe(w, g);
    };
  }, tables: n };
}
function Le(e, t, n) {
  return new Intl.NumberFormat(t, n).format(e);
}
function Me(e, t, n) {
  return new Intl.DateTimeFormat(t, n).format(e);
}
function h(e, t) {
  return (e.locale.locale() ?? "").toLowerCase().startsWith("pt") ? t.pt : t.en;
}
function he(e, t) {
  return _(() => ({
    id: t.id,
    title: h(e, t.title),
    closable: t.closable ?? "compact",
    fallback: t.fallback ?? !1
  }));
}
function Ie(e, t) {
  const n = he(e, {
    id: t.id,
    title: t.title,
    closable: t.closable,
    fallback: t.fallback
  }), r = () => {
    const o = e.sessions.current();
    o && e.layout.open(`${e.id}:${t.id}`, o);
  }, a = {
    id: t.id,
    region: "side",
    mobile: {
      get title() {
        return h(e, t.title);
      },
      order: t.mobileOrder ?? 50,
      kind: "menu",
      icon: t.icon
    },
    closed: () => ({}),
    list: (o) => o.open.includes(t.id) ? [n()] : [],
    render: (o) => s(v, {
      get when() {
        return o.session.key;
      },
      keyed: !0,
      children: (i) => t.view({
        session: o.session
      })
    })
  };
  return e.add(X, () => a), e.add(j, () => ({
    id: `open-${t.id}`,
    get title() {
      return h(e, t.command.title);
    },
    get description() {
      return t.command.description ? h(e, t.command.description) : void 0;
    },
    ...t.bind ? {
      bind: t.bind
    } : {},
    group: "general",
    run: r
  })), e.add(J, () => ({
    menu: "session.panel",
    id: t.id,
    order: t.order,
    get title() {
      return h(e, t.title);
    },
    icon: t.icon,
    run: r
  })), {
    tab: n,
    open: r
  };
}
const He = `${oe}${de}${be}`;
export {
  be as CHIP_CSS,
  ke as EmptyState,
  Se as EndMarker,
  Te as ErrorBanner,
  _e as LoadingRow,
  oe as SCROLL_CSS,
  He as SHARED_CSS,
  de as STATES_CSS,
  $e as ScrollNav,
  Ce as StatusChip,
  Ee as createI18n,
  he as createPanelTab,
  ye as createScrollNav,
  Me as formatDate,
  Le as formatNumber,
  fe as interpolate,
  ve as intlTag,
  h as panelText,
  Ie as registerSidePanel,
  Z as scrollStep,
  me as supportedLocale
};
