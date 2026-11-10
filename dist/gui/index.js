import { insert as s, createComponent as i, memo as y, template as b, effect as C, className as M, setAttribute as K } from "solid-js/web";
import { Show as m, createSignal as w, createEffect as q, onCleanup as U, createMemo as T } from "solid-js";
import { usePlugin as f, Panel as W, Command as G, MenuItem as V } from "@opencode/plugin/gui";
const j = 48, J = 48;
function Q(e) {
  return Math.max(j, e - J);
}
var X = /* @__PURE__ */ b("<div class=os-scroll-nav>");
const Y = 24, Z = 200, ee = "input, textarea, select, [contenteditable='true'], [contenteditable=''], [role='textbox']";
function he(e) {
  const t = e.edge ?? Y, n = e.margin ?? Z;
  let r, o, a, c, g = 0, u = 0;
  const [$, x] = w(!1), [E, L] = w(!0), [I, H] = w(!1), B = () => {
    var l;
    return (((l = e.visible) == null ? void 0 : l.call(e)) ?? !0) && document.visibilityState === "visible";
  }, h = () => e.hasMore() && !e.loadingMore() && B(), p = () => {
    if (!r) return;
    const l = r.scrollHeight - r.clientHeight;
    x(l > 1), L(r.scrollTop <= t), H(r.scrollTop >= l - t);
  }, k = () => {
    g || (g = requestAnimationFrame(() => {
      g = 0, p();
    }));
  }, R = () => {
    u || (u = requestAnimationFrame(() => {
      if (u = 0, !r || !o || !h()) return;
      const l = r.getBoundingClientRect();
      o.getBoundingClientRect().top <= l.bottom + n && e.loadMore();
    }));
  }, S = () => matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", _ = () => r == null ? void 0 : r.focus({
    preventScroll: !0
  }), A = () => {
    r == null || r.scrollTo({
      top: 0,
      behavior: S()
    }), _();
  }, D = () => {
    r && (r.scrollTo({
      top: r.scrollHeight,
      behavior: S()
    }), h() && e.loadMore(), _());
  }, P = (l) => l instanceof HTMLElement && l.closest(ee) !== null, F = (l) => {
    if (l.defaultPrevented || l.altKey || l.ctrlKey || l.metaKey || P(l.target) || !r || r.scrollHeight <= r.clientHeight) return;
    const d = Q(r.clientHeight);
    switch (l.key) {
      case "Home":
        l.preventDefault(), r.scrollTop = 0;
        break;
      case "End":
        l.preventDefault(), r.scrollTop = r.scrollHeight, h() && e.loadMore();
        break;
      case "PageUp":
        l.preventDefault(), r.scrollTop = Math.max(0, r.scrollTop - d);
        break;
      case "PageDown":
        l.preventDefault(), r.scrollTop = Math.min(r.scrollHeight, r.scrollTop + d);
        break;
      default:
        return;
    }
  }, z = () => {
    r && (c == null || c.disconnect(), c = new ResizeObserver(k), c.observe(r), a == null || a.disconnect(), a = new IntersectionObserver((l) => {
      l.some((d) => d.isIntersecting) && h() && e.loadMore();
    }, {
      root: r,
      rootMargin: `${n}px 0px`
    }), o && a.observe(o), p());
  }, N = (l) => {
    r = l, z();
  }, O = (l) => {
    o = l, a && a.observe(l);
  };
  return q(() => {
    var l, d;
    e.hasMore(), e.loadingMore(), (l = e.visible) == null || l.call(e), (d = e.items) == null || d.call(e), k(), R();
  }), U(() => {
    c == null || c.disconnect(), a == null || a.disconnect(), cancelAnimationFrame(g), cancelAnimationFrame(u);
  }), {
    ref: N,
    sentinelRef: O,
    scrollable: $,
    atTop: E,
    atBottom: I,
    measure: p,
    toTop: A,
    toBottom: D,
    onKeyDown: F
  };
}
function xe(e) {
  const t = f();
  return (() => {
    var n = X();
    return s(n, i(m, {
      get when() {
        return y(() => !!e.nav.scrollable())() && !e.nav.atTop();
      },
      get children() {
        return i(t.ui.Tooltip, {
          get value() {
            return e.topLabel;
          },
          keys: ["Home"],
          get children() {
            return i(t.ui.IconButton, {
              get icon() {
                return e.topIcon ?? "arrow-up";
              },
              get label() {
                return e.topLabel;
              },
              variant: "neutral",
              size: "normal",
              class: "os-scroll-btn",
              get onClick() {
                return e.nav.toTop;
              }
            });
          }
        });
      }
    }), null), s(n, i(m, {
      get when() {
        return y(() => !!e.nav.scrollable())() && !e.nav.atBottom();
      },
      get children() {
        return i(t.ui.Tooltip, {
          get value() {
            return e.bottomLabel;
          },
          keys: ["End"],
          get children() {
            return i(t.ui.IconButton, {
              get icon() {
                return e.bottomIcon ?? "arrow-down-to-line";
              },
              get label() {
                return e.bottomLabel;
              },
              variant: "neutral",
              size: "normal",
              class: "os-scroll-btn",
              get onClick() {
                return e.nav.toBottom;
              }
            });
          }
        });
      }
    }), null), n;
  })();
}
const te = `
.os-scroll { scrollbar-width: thin; scrollbar-color: var(--v2-border-border-strong) transparent; }
.os-scroll::-webkit-scrollbar { width: 10px; }
.os-scroll::-webkit-scrollbar-thumb { background: var(--v2-border-border-strong); border-radius: 8px; border: 3px solid transparent; background-clip: padding-box; }
.os-scroll:focus-visible { outline: 2px solid var(--v2-border-border-focus); outline-offset: -2px; }
.os-scroll-nav { position: absolute; right: 10px; bottom: 10px; z-index: 10; display: flex; flex-direction: column; gap: 6px; }
.os-scroll-btn { box-shadow: var(--v2-elevation-raised); }
.os-scroll-sentinel { height: 1px; flex: 0 0 auto; }
`;
var re = /* @__PURE__ */ b("<div class=os-empty><div class=os-empty-title>"), ne = /* @__PURE__ */ b("<div class=os-empty-hint>"), le = /* @__PURE__ */ b("<div class=os-error role=alert><span class=os-error-text>"), ae = /* @__PURE__ */ b("<div><span>"), oe = /* @__PURE__ */ b("<div class=os-end>");
function pe(e) {
  const t = f();
  return (() => {
    var n = re(), r = n.firstChild;
    return s(n, i(m, {
      get when() {
        return e.icon;
      },
      children: (o) => i(t.ui.Icon, {
        get name() {
          return o();
        },
        size: "large",
        class: "os-empty-icon"
      })
    }), r), s(r, () => e.title), s(n, i(m, {
      get when() {
        return e.hint;
      },
      children: (o) => (() => {
        var a = ne();
        return s(a, o), a;
      })()
    }), null), n;
  })();
}
function we(e) {
  const t = f();
  return (() => {
    var n = le(), r = n.firstChild;
    return s(r, () => e.message), s(n, i(m, {
      get when() {
        return y(() => !!e.retryLabel)() && e.onRetry;
      },
      get children() {
        return i(t.ui.Button, {
          size: "small",
          variant: "ghost",
          onClick: () => {
            var o;
            return (o = e.onRetry) == null ? void 0 : o.call(e);
          },
          get children() {
            return e.retryLabel;
          }
        });
      }
    }), null), n;
  })();
}
function ye(e) {
  const t = f();
  return (() => {
    var n = ae(), r = n.firstChild;
    return s(n, i(t.ui.Loader, {
      size: "small"
    }), r), s(r, () => e.label), C(() => M(n, e.class ? `os-loading ${e.class}` : "os-loading")), n;
  })();
}
function Te(e) {
  return (() => {
    var t = oe();
    return s(t, () => e.label), t;
  })();
}
const ce = `
.os-empty { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 6px; padding: 24px 10px; color: var(--v2-text-text-muted); }
.os-empty-icon { color: var(--v2-text-text-faint); }
.os-empty-title { font-weight: 600; color: var(--v2-text-text-base); }
.os-empty-hint { font-size: 11.5px; line-height: 1.45; }
.os-error { display: flex; flex-direction: column; align-items: flex-start; gap: 6px; padding: 8px 10px; border-radius: 6px; color: var(--v2-state-fg-danger); background: var(--v2-state-bg-danger); border: 1px solid var(--v2-state-border-danger); white-space: pre-wrap; }
.os-error-text { font-size: 12px; line-height: 1.45; overflow-wrap: anywhere; }
.os-loading { display: flex; align-items: center; gap: 8px; padding: 8px 2px; color: var(--v2-text-text-muted); }
.os-end { color: var(--v2-text-text-faint); font-size: 10px; text-align: center; padding: 4px 0 8px; }
`;
var ie = /* @__PURE__ */ b("<span>");
function $e(e) {
  const t = () => {
    const n = e.tone ?? "neutral";
    return `os-chip${n === "neutral" ? "" : ` is-${n}`}${e.class ? ` ${e.class}` : ""}`;
  };
  return (() => {
    var n = ie();
    return s(n, () => e.label), C((r) => {
      var o = t(), a = e.title;
      return o !== r.e && M(n, r.e = o), a !== r.t && K(n, "title", r.t = a), r;
    }, {
      e: void 0,
      t: void 0
    }), n;
  })();
}
const se = `
.os-chip { display: inline-flex; align-items: center; gap: 4px; padding: 1px 6px; border-radius: 999px; font-size: 10.5px; font-weight: 600; line-height: 1.6; white-space: nowrap; background: var(--v2-overlay-simple-overlay-pressed); color: var(--v2-text-text-muted); border: 1px solid transparent; }
.os-chip.is-info { background: var(--v2-state-bg-info); color: var(--v2-state-fg-info); border-color: var(--v2-state-border-info); }
.os-chip.is-success { background: var(--v2-state-bg-success); color: var(--v2-state-fg-success); border-color: var(--v2-state-border-success); }
.os-chip.is-warning { background: var(--v2-state-bg-warning); color: var(--v2-state-fg-warning); border-color: var(--v2-state-border-warning); }
.os-chip.is-danger { background: var(--v2-state-bg-danger); color: var(--v2-state-fg-danger); border-color: var(--v2-state-border-danger); }
`;
function ue(e) {
  return (e ?? "").trim().toLowerCase().replace(/[-_]/g, "").startsWith("pt") ? "pt-br" : "en-us";
}
function de(e) {
  return e === "pt-br" ? "pt-BR" : "en-US";
}
function ge(e, t) {
  return e.replace(/\{(\d+)\}/g, (n, r) => String(t[Number(r)] ?? ""));
}
function ke(e, t) {
  const n = { "en-us": e, "pt-br": t }, r = () => {
    const c = f();
    return T(() => ue(c.locale.locale()));
  };
  return { useLocale: r, useI18nTag: () => {
    const c = r();
    return T(() => de(c()));
  }, useT: () => {
    const c = r();
    return (g, ...u) => {
      const x = n[c()][g] ?? (typeof u[0] == "string" ? u[0] : g);
      return ge(x, u);
    };
  }, tables: n };
}
function Se(e, t, n) {
  return new Intl.NumberFormat(t, n).format(e);
}
function _e(e, t, n) {
  return new Intl.DateTimeFormat(t, n).format(e);
}
function v(e, t) {
  return (e.locale.locale() ?? "").toLowerCase().startsWith("pt") ? t.pt : t.en;
}
function be(e, t) {
  return T(() => ({
    id: t.id,
    title: v(e, t.title),
    closable: t.closable ?? "compact",
    fallback: t.fallback ?? !1
  }));
}
function Ce(e, t) {
  const n = be(e, {
    id: t.id,
    title: t.title,
    closable: t.closable,
    fallback: t.fallback
  }), r = () => {
    const a = e.sessions.current();
    a && e.layout.open(`${e.id}:${t.id}`, a);
  }, o = {
    id: t.id,
    region: "side",
    mobile: {
      get title() {
        return v(e, t.title);
      },
      order: t.mobileOrder ?? 50,
      kind: "menu",
      icon: t.icon
    },
    closed: () => ({}),
    list: (a) => a.open.includes(t.id) ? [n()] : [],
    render: (a) => i(m, {
      get when() {
        return a.session.key;
      },
      keyed: !0,
      children: (c) => t.view({
        session: a.session
      })
    })
  };
  return e.add(W, () => o), e.add(G, () => ({
    id: `open-${t.id}`,
    get title() {
      return v(e, t.command.title);
    },
    get description() {
      return t.command.description ? v(e, t.command.description) : void 0;
    },
    ...t.bind ? {
      bind: t.bind
    } : {},
    group: "general",
    run: r
  })), e.add(V, () => ({
    menu: "session.panel",
    id: t.id,
    order: t.order,
    get title() {
      return v(e, t.title);
    },
    icon: t.icon,
    run: r
  })), {
    tab: n,
    open: r
  };
}
const Me = `${te}${ce}${se}`;
export {
  se as CHIP_CSS,
  pe as EmptyState,
  Te as EndMarker,
  we as ErrorBanner,
  ye as LoadingRow,
  te as SCROLL_CSS,
  Me as SHARED_CSS,
  ce as STATES_CSS,
  xe as ScrollNav,
  $e as StatusChip,
  ke as createI18n,
  be as createPanelTab,
  he as createScrollNav,
  _e as formatDate,
  Se as formatNumber,
  ge as interpolate,
  de as intlTag,
  v as panelText,
  Ce as registerSidePanel,
  Q as scrollStep,
  ue as supportedLocale
};
