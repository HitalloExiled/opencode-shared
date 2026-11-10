import { createComponent as i, memo as y, insert as s, effect as _, className as M, template as m, setAttribute as K } from "solid-js/web";
import { Show as b, createSignal as w, createEffect as q, onCleanup as U, createMemo as T } from "solid-js";
import { usePlugin as v, Panel as W, Command as G, MenuItem as V } from "@opencode/plugin/gui";
const j = 48, J = 48;
function Q(e) {
  return Math.max(j, e - J);
}
const X = 24, Y = 200, Z = "input, textarea, select, [contenteditable='true'], [contenteditable=''], [role='textbox']";
function ve(e) {
  const t = e.edge ?? X, n = e.margin ?? Y;
  let r, a, o, c, g = 0, u = 0;
  const [k, x] = w(!1), [E, L] = w(!0), [I, H] = w(!1), B = () => {
    var l;
    return (((l = e.visible) == null ? void 0 : l.call(e)) ?? !0) && document.visibilityState === "visible";
  }, h = () => e.hasMore() && !e.loadingMore() && B(), p = () => {
    if (!r) return;
    const l = r.scrollHeight - r.clientHeight;
    x(l > 1), L(r.scrollTop <= t), H(r.scrollTop >= l - t);
  }, S = () => {
    g || (g = requestAnimationFrame(() => {
      g = 0, p();
    }));
  }, R = () => {
    u || (u = requestAnimationFrame(() => {
      if (u = 0, !r || !a || !h()) return;
      const l = r.getBoundingClientRect();
      a.getBoundingClientRect().top <= l.bottom + n && e.loadMore();
    }));
  }, $ = () => matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", C = () => r == null ? void 0 : r.focus({
    preventScroll: !0
  }), A = () => {
    r == null || r.scrollTo({
      top: 0,
      behavior: $()
    }), C();
  }, D = () => {
    r && (r.scrollTo({
      top: r.scrollHeight,
      behavior: $()
    }), h() && e.loadMore(), C());
  }, P = (l) => l instanceof HTMLElement && l.closest(Z) !== null, F = (l) => {
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
    r && (c == null || c.disconnect(), c = new ResizeObserver(S), c.observe(r), o == null || o.disconnect(), o = new IntersectionObserver((l) => {
      l.some((d) => d.isIntersecting) && h() && e.loadMore();
    }, {
      root: r,
      rootMargin: `${n}px 0px`
    }), a && o.observe(a), p());
  }, N = (l) => {
    r = l, z();
  }, O = (l) => {
    a = l, o && o.observe(l);
  };
  return q(() => {
    var l, d;
    e.hasMore(), e.loadingMore(), (l = e.visible) == null || l.call(e), (d = e.items) == null || d.call(e), S(), R();
  }), U(() => {
    c == null || c.disconnect(), o == null || o.disconnect(), cancelAnimationFrame(g), cancelAnimationFrame(u);
  }), {
    ref: N,
    sentinelRef: O,
    scrollable: k,
    atTop: E,
    atBottom: I,
    measure: p,
    toTop: A,
    toBottom: D,
    onKeyDown: F
  };
}
function he(e) {
  const t = v();
  return [i(b, {
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
            class: "os-scroll-btn is-top",
            get onClick() {
              return e.nav.toTop;
            }
          });
        }
      });
    }
  }), i(b, {
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
            class: "os-scroll-btn is-bottom",
            get onClick() {
              return e.nav.toBottom;
            }
          });
        }
      });
    }
  })];
}
const ee = `
.os-scroll { scrollbar-width: thin; scrollbar-color: var(--v2-border-border-strong) transparent; }
.os-scroll::-webkit-scrollbar { width: 10px; }
.os-scroll::-webkit-scrollbar-thumb { background: var(--v2-border-border-strong); border-radius: 8px; border: 3px solid transparent; background-clip: padding-box; }
.os-scroll:focus-visible { outline: 2px solid var(--v2-border-border-focus); outline-offset: -2px; }
.os-scroll-btn { position: absolute; right: 8px; z-index: 10; box-shadow: var(--v2-elevation-raised); }
.os-scroll-btn.is-top { top: 8px; }
.os-scroll-btn.is-bottom { bottom: 8px; }
.os-scroll-sentinel { height: 1px; flex: 0 0 auto; }
`;
var te = /* @__PURE__ */ m("<div class=os-empty><div class=os-empty-title>"), re = /* @__PURE__ */ m("<div class=os-empty-hint>"), ne = /* @__PURE__ */ m("<div class=os-error role=alert><span class=os-error-text>"), le = /* @__PURE__ */ m("<div><span>"), oe = /* @__PURE__ */ m("<div class=os-end>");
function xe(e) {
  const t = v();
  return (() => {
    var n = te(), r = n.firstChild;
    return s(n, i(b, {
      get when() {
        return e.icon;
      },
      children: (a) => i(t.ui.Icon, {
        get name() {
          return a();
        },
        size: "large",
        class: "os-empty-icon"
      })
    }), r), s(r, () => e.title), s(n, i(b, {
      get when() {
        return e.hint;
      },
      children: (a) => (() => {
        var o = re();
        return s(o, a), o;
      })()
    }), null), n;
  })();
}
function pe(e) {
  const t = v();
  return (() => {
    var n = ne(), r = n.firstChild;
    return s(r, () => e.message), s(n, i(b, {
      get when() {
        return y(() => !!e.retryLabel)() && e.onRetry;
      },
      get children() {
        return i(t.ui.Button, {
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
function we(e) {
  const t = v();
  return (() => {
    var n = le(), r = n.firstChild;
    return s(n, i(t.ui.Loader, {
      size: "small"
    }), r), s(r, () => e.label), _(() => M(n, e.class ? `os-loading ${e.class}` : "os-loading")), n;
  })();
}
function ye(e) {
  return (() => {
    var t = oe();
    return s(t, () => e.label), t;
  })();
}
const ae = `
.os-empty { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 6px; padding: 24px 10px; color: var(--v2-text-text-muted); }
.os-empty-icon { color: var(--v2-text-text-faint); }
.os-empty-title { font-weight: 600; color: var(--v2-text-text-base); }
.os-empty-hint { font-size: 11.5px; line-height: 1.45; }
.os-error { display: flex; flex-direction: column; align-items: flex-start; gap: 6px; padding: 8px 10px; border-radius: 6px; color: var(--v2-state-fg-danger); background: var(--v2-state-bg-danger); border: 1px solid var(--v2-state-border-danger); white-space: pre-wrap; }
.os-error-text { font-size: 12px; line-height: 1.45; overflow-wrap: anywhere; }
.os-loading { display: flex; align-items: center; gap: 8px; padding: 8px 2px; color: var(--v2-text-text-muted); }
.os-end { color: var(--v2-text-text-faint); font-size: 10px; text-align: center; padding: 4px 0 8px; }
`;
var ce = /* @__PURE__ */ m("<span>");
function Te(e) {
  const t = () => {
    const n = e.tone ?? "neutral";
    return `os-chip${n === "neutral" ? "" : ` is-${n}`}${e.class ? ` ${e.class}` : ""}`;
  };
  return (() => {
    var n = ce();
    return s(n, () => e.label), _((r) => {
      var a = t(), o = e.title;
      return a !== r.e && M(n, r.e = a), o !== r.t && K(n, "title", r.t = o), r;
    }, {
      e: void 0,
      t: void 0
    }), n;
  })();
}
const ie = `
.os-chip { display: inline-flex; align-items: center; gap: 4px; padding: 1px 6px; border-radius: 999px; font-size: 10.5px; font-weight: 600; line-height: 1.6; white-space: nowrap; background: var(--v2-overlay-simple-overlay-pressed); color: var(--v2-text-text-muted); border: 1px solid transparent; }
.os-chip.is-info { background: var(--v2-state-bg-info); color: var(--v2-state-fg-info); border-color: var(--v2-state-border-info); }
.os-chip.is-success { background: var(--v2-state-bg-success); color: var(--v2-state-fg-success); border-color: var(--v2-state-border-success); }
.os-chip.is-warning { background: var(--v2-state-bg-warning); color: var(--v2-state-fg-warning); border-color: var(--v2-state-border-warning); }
.os-chip.is-danger { background: var(--v2-state-bg-danger); color: var(--v2-state-fg-danger); border-color: var(--v2-state-border-danger); }
`;
function se(e) {
  return (e ?? "").trim().toLowerCase().replace(/[-_]/g, "").startsWith("pt") ? "pt-br" : "en-us";
}
function ue(e) {
  return e === "pt-br" ? "pt-BR" : "en-US";
}
function de(e, t) {
  return e.replace(/\{(\d+)\}/g, (n, r) => String(t[Number(r)] ?? ""));
}
function ke(e, t) {
  const n = { "en-us": e, "pt-br": t }, r = () => {
    const c = v();
    return T(() => se(c.locale.locale()));
  };
  return { useLocale: r, useI18nTag: () => {
    const c = r();
    return T(() => ue(c()));
  }, useT: () => {
    const c = r();
    return (g, ...u) => {
      const x = n[c()][g] ?? (typeof u[0] == "string" ? u[0] : g);
      return de(x, u);
    };
  }, tables: n };
}
function Se(e, t, n) {
  return new Intl.NumberFormat(t, n).format(e);
}
function $e(e, t, n) {
  return new Intl.DateTimeFormat(t, n).format(e);
}
function f(e, t) {
  return (e.locale.locale() ?? "").toLowerCase().startsWith("pt") ? t.pt : t.en;
}
function ge(e, t) {
  return T(() => ({
    id: t.id,
    title: f(e, t.title),
    closable: t.closable ?? "compact",
    fallback: t.fallback ?? !1
  }));
}
function Ce(e, t) {
  const n = ge(e, {
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
        return f(e, t.title);
      },
      order: t.mobileOrder ?? 50,
      kind: "menu",
      icon: t.icon
    },
    closed: () => ({}),
    list: (o) => o.open.includes(t.id) ? [n()] : [],
    render: (o) => i(b, {
      get when() {
        return o.session.key;
      },
      keyed: !0,
      children: (c) => t.view({
        session: o.session
      })
    })
  };
  return e.add(W, () => a), e.add(G, () => ({
    id: `open-${t.id}`,
    get title() {
      return f(e, t.command.title);
    },
    get description() {
      return t.command.description ? f(e, t.command.description) : void 0;
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
      return f(e, t.title);
    },
    icon: t.icon,
    run: r
  })), {
    tab: n,
    open: r
  };
}
const _e = `${ee}${ae}${ie}`;
export {
  ie as CHIP_CSS,
  xe as EmptyState,
  ye as EndMarker,
  pe as ErrorBanner,
  we as LoadingRow,
  ee as SCROLL_CSS,
  _e as SHARED_CSS,
  ae as STATES_CSS,
  he as ScrollNav,
  Te as StatusChip,
  ke as createI18n,
  ge as createPanelTab,
  ve as createScrollNav,
  $e as formatDate,
  Se as formatNumber,
  de as interpolate,
  ue as intlTag,
  f as panelText,
  Ce as registerSidePanel,
  Q as scrollStep,
  se as supportedLocale
};
