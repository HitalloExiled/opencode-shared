import { createComponent as i, insert as s, memo as y, template as g, effect as C, className as M, setAttribute as K } from "solid-js/web";
import { Show as m, createSignal as w, createEffect as q, onCleanup as U, createMemo as $ } from "solid-js";
import { usePlugin as f, Panel as W, Command as G, MenuItem as V } from "@opencode/plugin/gui";
const j = 48, J = 48;
function Q(e) {
  return Math.max(j, e - J);
}
var X = /* @__PURE__ */ g('<div class="os-scroll-btn is-top">'), Y = /* @__PURE__ */ g('<div class="os-scroll-btn is-bottom">');
const Z = 24, ee = 200, te = "input, textarea, select, [contenteditable='true'], [contenteditable=''], [role='textbox']";
function xe(e) {
  const t = e.edge ?? Z, n = e.margin ?? ee;
  let r, a, o, c, b = 0, u = 0;
  const [T, x] = w(!1), [E, L] = w(!0), [I, H] = w(!1), B = () => {
    var l;
    return (((l = e.visible) == null ? void 0 : l.call(e)) ?? !0) && document.visibilityState === "visible";
  }, h = () => e.hasMore() && !e.loadingMore() && B(), p = () => {
    if (!r) return;
    const l = r.scrollHeight - r.clientHeight;
    x(l > 1), L(r.scrollTop <= t), H(r.scrollTop >= l - t);
  }, k = () => {
    b || (b = requestAnimationFrame(() => {
      b = 0, p();
    }));
  }, R = () => {
    u || (u = requestAnimationFrame(() => {
      if (u = 0, !r || !a || !h()) return;
      const l = r.getBoundingClientRect();
      a.getBoundingClientRect().top <= l.bottom + n && e.loadMore();
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
  }, P = (l) => l instanceof HTMLElement && l.closest(te) !== null, F = (l) => {
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
    r && (c == null || c.disconnect(), c = new ResizeObserver(k), c.observe(r), o == null || o.disconnect(), o = new IntersectionObserver((l) => {
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
    e.hasMore(), e.loadingMore(), (l = e.visible) == null || l.call(e), (d = e.items) == null || d.call(e), k(), R();
  }), U(() => {
    c == null || c.disconnect(), o == null || o.disconnect(), cancelAnimationFrame(b), cancelAnimationFrame(u);
  }), {
    ref: N,
    sentinelRef: O,
    scrollable: T,
    atTop: E,
    atBottom: I,
    measure: p,
    toTop: A,
    toBottom: D,
    onKeyDown: F
  };
}
function pe(e) {
  const t = f();
  return [i(m, {
    get when() {
      return y(() => !!e.nav.scrollable())() && !e.nav.atTop();
    },
    get children() {
      var n = X();
      return s(n, i(t.ui.Tooltip, {
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
            get onClick() {
              return e.nav.toTop;
            }
          });
        }
      })), n;
    }
  }), i(m, {
    get when() {
      return y(() => !!e.nav.scrollable())() && !e.nav.atBottom();
    },
    get children() {
      var n = Y();
      return s(n, i(t.ui.Tooltip, {
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
            get onClick() {
              return e.nav.toBottom;
            }
          });
        }
      })), n;
    }
  })];
}
const re = `
.os-scroll { scrollbar-width: thin; scrollbar-color: var(--v2-border-border-strong) transparent; }
.os-scroll::-webkit-scrollbar { width: 10px; }
.os-scroll::-webkit-scrollbar-thumb { background: var(--v2-border-border-strong); border-radius: 8px; border: 3px solid transparent; background-clip: padding-box; }
.os-scroll:focus-visible { outline: 2px solid var(--v2-border-border-focus); outline-offset: -2px; }
.os-scroll-btn { position: absolute; right: 8px; z-index: 10; display: flex; }
.os-scroll-btn.is-top { top: 8px; }
.os-scroll-btn.is-bottom { bottom: 8px; }
.os-scroll-btn [data-component="icon-button-v2"] { box-shadow: var(--v2-elevation-raised); }
.os-scroll-sentinel { height: 1px; flex: 0 0 auto; }
`;
var ne = /* @__PURE__ */ g("<div class=os-empty><div class=os-empty-title>"), le = /* @__PURE__ */ g("<div class=os-empty-hint>"), oe = /* @__PURE__ */ g("<div class=os-error role=alert><span class=os-error-text>"), ae = /* @__PURE__ */ g("<div><span>"), ce = /* @__PURE__ */ g("<div class=os-end>");
function we(e) {
  const t = f();
  return (() => {
    var n = ne(), r = n.firstChild;
    return s(n, i(m, {
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
    }), r), s(r, () => e.title), s(n, i(m, {
      get when() {
        return e.hint;
      },
      children: (a) => (() => {
        var o = le();
        return s(o, a), o;
      })()
    }), null), n;
  })();
}
function ye(e) {
  const t = f();
  return (() => {
    var n = oe(), r = n.firstChild;
    return s(r, () => e.message), s(n, i(m, {
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
function $e(e) {
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
    var t = ce();
    return s(t, () => e.label), t;
  })();
}
const ie = `
.os-empty { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 6px; padding: 24px 10px; color: var(--v2-text-text-muted); }
.os-empty-icon { color: var(--v2-text-text-faint); }
.os-empty-title { font-weight: 600; color: var(--v2-text-text-base); }
.os-empty-hint { font-size: 11.5px; line-height: 1.45; }
.os-error { display: flex; flex-direction: column; align-items: flex-start; gap: 6px; padding: 8px 10px; border-radius: 6px; color: var(--v2-state-fg-danger); background: var(--v2-state-bg-danger); border: 1px solid var(--v2-state-border-danger); white-space: pre-wrap; }
.os-error-text { font-size: 12px; line-height: 1.45; overflow-wrap: anywhere; }
.os-loading { display: flex; align-items: center; gap: 8px; padding: 8px 2px; color: var(--v2-text-text-muted); }
.os-end { color: var(--v2-text-text-faint); font-size: 10px; text-align: center; padding: 4px 0 8px; }
`;
var se = /* @__PURE__ */ g("<span>");
function ke(e) {
  const t = () => {
    const n = e.tone ?? "neutral";
    return `os-chip${n === "neutral" ? "" : ` is-${n}`}${e.class ? ` ${e.class}` : ""}`;
  };
  return (() => {
    var n = se();
    return s(n, () => e.label), C((r) => {
      var a = t(), o = e.title;
      return a !== r.e && M(n, r.e = a), o !== r.t && K(n, "title", r.t = o), r;
    }, {
      e: void 0,
      t: void 0
    }), n;
  })();
}
const ue = `
.os-chip { display: inline-flex; align-items: center; gap: 4px; padding: 1px 6px; border-radius: 999px; font-size: 10.5px; font-weight: 600; line-height: 1.6; white-space: nowrap; background: var(--v2-overlay-simple-overlay-pressed); color: var(--v2-text-text-muted); border: 1px solid transparent; }
.os-chip.is-info { background: var(--v2-state-bg-info); color: var(--v2-state-fg-info); border-color: var(--v2-state-border-info); }
.os-chip.is-success { background: var(--v2-state-bg-success); color: var(--v2-state-fg-success); border-color: var(--v2-state-border-success); }
.os-chip.is-warning { background: var(--v2-state-bg-warning); color: var(--v2-state-fg-warning); border-color: var(--v2-state-border-warning); }
.os-chip.is-danger { background: var(--v2-state-bg-danger); color: var(--v2-state-fg-danger); border-color: var(--v2-state-border-danger); }
`;
function de(e) {
  return (e ?? "").trim().toLowerCase().replace(/[-_]/g, "").startsWith("pt") ? "pt-br" : "en-us";
}
function ge(e) {
  return e === "pt-br" ? "pt-BR" : "en-US";
}
function be(e, t) {
  return e.replace(/\{(\d+)\}/g, (n, r) => String(t[Number(r)] ?? ""));
}
function Se(e, t) {
  const n = { "en-us": e, "pt-br": t }, r = () => {
    const c = f();
    return $(() => de(c.locale.locale()));
  };
  return { useLocale: r, useI18nTag: () => {
    const c = r();
    return $(() => ge(c()));
  }, useT: () => {
    const c = r();
    return (b, ...u) => {
      const x = n[c()][b] ?? (typeof u[0] == "string" ? u[0] : b);
      return be(x, u);
    };
  }, tables: n };
}
function _e(e, t, n) {
  return new Intl.NumberFormat(t, n).format(e);
}
function Ce(e, t, n) {
  return new Intl.DateTimeFormat(t, n).format(e);
}
function v(e, t) {
  return (e.locale.locale() ?? "").toLowerCase().startsWith("pt") ? t.pt : t.en;
}
function me(e, t) {
  return $(() => ({
    id: t.id,
    title: v(e, t.title),
    closable: t.closable ?? "compact",
    fallback: t.fallback ?? !1
  }));
}
function Me(e, t) {
  const n = me(e, {
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
        return v(e, t.title);
      },
      order: t.mobileOrder ?? 50,
      kind: "menu",
      icon: t.icon
    },
    closed: () => ({}),
    list: (o) => o.open.includes(t.id) ? [n()] : [],
    render: (o) => i(m, {
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
const Ee = `${re}${ie}${ue}`;
export {
  ue as CHIP_CSS,
  we as EmptyState,
  Te as EndMarker,
  ye as ErrorBanner,
  $e as LoadingRow,
  re as SCROLL_CSS,
  Ee as SHARED_CSS,
  ie as STATES_CSS,
  pe as ScrollNav,
  ke as StatusChip,
  Se as createI18n,
  me as createPanelTab,
  xe as createScrollNav,
  Ce as formatDate,
  _e as formatNumber,
  be as interpolate,
  ge as intlTag,
  v as panelText,
  Me as registerSidePanel,
  Q as scrollStep,
  de as supportedLocale
};
