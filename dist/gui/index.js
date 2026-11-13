import { createComponent as i, insert as c, memo as k, template as b, effect as C, className as L, setAttribute as G } from "solid-js/web";
import { Show as m, createSignal as T, createEffect as V, onCleanup as X, createMemo as S } from "solid-js";
import { usePlugin as x, Panel as j, Command as J, MenuItem as Q } from "@opencode/plugin/gui";
const Y = 48, Z = 48;
function ee(e) {
  return Math.max(Y, e - Z);
}
var te = /* @__PURE__ */ b('<div class="os-scroll-btn is-top">'), re = /* @__PURE__ */ b('<div class="os-scroll-btn is-bottom">');
const ne = 24, le = 200, oe = "input, textarea, select, [contenteditable='true'], [contenteditable=''], [role='textbox']";
function Te(e) {
  const t = e.edge ?? ne, n = e.margin ?? le;
  let r, a, o, s, u, g = 0, f = 0;
  const [w, E] = T(!1), [M, I] = T(!0), [B, H] = T(!1), R = () => {
    var l;
    return (((l = e.visible) == null ? void 0 : l.call(e)) ?? !0) && document.visibilityState === "visible";
  }, p = () => e.hasMore() && !e.loadingMore() && R(), y = () => {
    if (!r) return;
    const l = r.scrollHeight - r.clientHeight;
    E(l > 1), I(r.scrollTop <= t), H(r.scrollTop >= l - t);
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
  }, v = (l) => r == null ? void 0 : r.scrollTo({
    top: l,
    behavior: "smooth"
  }), _ = () => r == null ? void 0 : r.focus({
    preventScroll: !0
  }), D = () => {
    const l = r;
    if (!l) return;
    const d = l.style.scrollBehavior;
    l.style.scrollBehavior = "auto", l.scrollTop = 0, l.style.scrollBehavior = d;
  }, P = () => {
    v(0), _();
  }, F = () => {
    r && (v(r.scrollHeight), p() && e.loadMore(), _());
  }, z = (l) => l instanceof HTMLElement && l.closest(oe) !== null, N = (l) => {
    if (l.defaultPrevented || l.altKey || l.ctrlKey || l.metaKey || z(l.target) || !r || r.scrollHeight <= r.clientHeight) return;
    const d = ee(r.clientHeight);
    switch (l.key) {
      case "Home":
        l.preventDefault(), v(0);
        break;
      case "End":
        l.preventDefault(), v(r.scrollHeight), p() && e.loadMore();
        break;
      case "PageUp":
        l.preventDefault(), v(Math.max(0, r.scrollTop - d));
        break;
      case "PageDown":
        l.preventDefault(), v(Math.min(r.scrollHeight, r.scrollTop + d));
        break;
      default:
        return;
    }
  }, O = () => {
    if (u == null || u(), u = void 0, !r) return;
    const l = r, d = () => $();
    l.addEventListener("scroll", d, {
      passive: !0
    }), u = () => l.removeEventListener("scroll", d), s == null || s.disconnect(), s = new ResizeObserver($), s.observe(r), o == null || o.disconnect(), o = new IntersectionObserver((U) => {
      U.some((W) => W.isIntersecting) && p() && e.loadMore();
    }, {
      root: r,
      rootMargin: `${n}px 0px`
    }), a && o.observe(a), y();
  }, K = (l) => {
    r = l, O();
  }, q = (l) => {
    a = l, o && o.observe(l);
  };
  return V(() => {
    var l, d;
    e.hasMore(), e.loadingMore(), (l = e.visible) == null || l.call(e), (d = e.items) == null || d.call(e), $(), A();
  }), X(() => {
    u == null || u(), s == null || s.disconnect(), o == null || o.disconnect(), cancelAnimationFrame(g), cancelAnimationFrame(f);
  }), {
    ref: K,
    sentinelRef: q,
    scrollable: w,
    atTop: M,
    atBottom: B,
    measure: y,
    reset: D,
    toTop: P,
    toBottom: F,
    onKeyDown: N
  };
}
function ke(e) {
  const t = x();
  return [i(m, {
    get when() {
      return k(() => !!e.nav.scrollable())() && !e.nav.atTop();
    },
    get children() {
      var n = te();
      return c(n, i(t.ui.Tooltip, {
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
      return k(() => !!e.nav.scrollable())() && !e.nav.atBottom();
    },
    get children() {
      var n = re();
      return c(n, i(t.ui.Tooltip, {
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
const ae = `
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
var se = /* @__PURE__ */ b("<div class=os-empty><div class=os-empty-title>"), ie = /* @__PURE__ */ b("<div class=os-empty-hint>"), ce = /* @__PURE__ */ b("<div class=os-error role=alert><span class=os-error-text>"), ue = /* @__PURE__ */ b("<div><span>"), de = /* @__PURE__ */ b("<div class=os-end>");
function Se(e) {
  const t = x();
  return (() => {
    var n = se(), r = n.firstChild;
    return c(n, i(m, {
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
    }), r), c(r, () => e.title), c(n, i(m, {
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
function _e(e) {
  const t = x();
  return (() => {
    var n = ce(), r = n.firstChild;
    return c(r, () => e.message), c(n, i(m, {
      get when() {
        return k(() => !!e.retryLabel)() && e.onRetry;
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
function Ce(e) {
  const t = x();
  return (() => {
    var n = ue(), r = n.firstChild;
    return c(n, i(t.ui.Loader, {
      size: "small"
    }), r), c(r, () => e.label), C(() => L(n, e.class ? `os-loading ${e.class}` : "os-loading")), n;
  })();
}
function Le(e) {
  return (() => {
    var t = de();
    return c(t, () => e.label), t;
  })();
}
const ge = `
.os-empty { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 6px; padding: 24px 10px; color: var(--v2-text-text-muted); }
.os-empty-icon { color: var(--v2-text-text-faint); }
.os-empty-title { font-weight: 600; color: var(--v2-text-text-base); }
.os-empty-hint { font-size: 11.5px; line-height: 1.45; }
.os-error { display: flex; flex-direction: column; align-items: flex-start; gap: 6px; padding: 8px 10px; border-radius: 6px; color: var(--v2-state-fg-danger); background: var(--v2-state-bg-danger); border: 1px solid var(--v2-state-border-danger); white-space: pre-wrap; }
.os-error-text { font-size: 12px; line-height: 1.45; overflow-wrap: anywhere; }
.os-loading { display: flex; align-items: center; gap: 8px; padding: 8px 2px; color: var(--v2-text-text-muted); }
.os-end { color: var(--v2-text-text-faint); font-size: 10px; text-align: center; padding: 4px 0 8px; }
`;
var be = /* @__PURE__ */ b("<span>");
function Ee(e) {
  const t = () => {
    const n = e.tone ?? "neutral";
    return `os-chip${n === "neutral" ? "" : ` is-${n}`}${e.class ? ` ${e.class}` : ""}`;
  };
  return (() => {
    var n = be();
    return c(n, () => e.label), C((r) => {
      var a = t(), o = e.title;
      return a !== r.e && L(n, r.e = a), o !== r.t && G(n, "title", r.t = o), r;
    }, {
      e: void 0,
      t: void 0
    }), n;
  })();
}
const ve = `
.os-chip { display: inline-flex; align-items: center; gap: 4px; padding: 1px 6px; border-radius: 999px; font-size: 10.5px; font-weight: 600; line-height: 1.6; white-space: nowrap; background: var(--v2-overlay-simple-overlay-pressed); color: var(--v2-text-text-muted); border: 1px solid transparent; }
.os-chip.is-info { background: var(--v2-state-bg-info); color: var(--v2-state-fg-info); border-color: var(--v2-state-border-info); }
.os-chip.is-success { background: var(--v2-state-bg-success); color: var(--v2-state-fg-success); border-color: var(--v2-state-border-success); }
.os-chip.is-warning { background: var(--v2-state-bg-warning); color: var(--v2-state-fg-warning); border-color: var(--v2-state-border-warning); }
.os-chip.is-danger { background: var(--v2-state-bg-danger); color: var(--v2-state-fg-danger); border-color: var(--v2-state-border-danger); }
`;
function me(e) {
  return (e ?? "").trim().toLowerCase().replace(/[-_]/g, "").startsWith("pt") ? "pt-br" : "en-us";
}
function fe(e) {
  return e === "pt-br" ? "pt-BR" : "en-US";
}
function he(e, t) {
  return e.replace(/\{(\d+)\}/g, (n, r) => String(t[Number(r)] ?? ""));
}
function Me(e, t) {
  const n = { "en-us": e, "pt-br": t }, r = () => {
    const s = x();
    return S(() => me(s.locale.locale()));
  };
  return { useLocale: r, useI18nTag: () => {
    const s = r();
    return S(() => fe(s()));
  }, useT: () => {
    const s = r();
    return (u, ...g) => {
      const w = n[s()][u] ?? (typeof g[0] == "string" ? g[0] : u);
      return he(w, g);
    };
  }, tables: n };
}
function Ie(e, t, n) {
  return new Intl.NumberFormat(t, n).format(e);
}
function Be(e, t, n) {
  return new Intl.DateTimeFormat(t, n).format(e);
}
function h(e, t) {
  return (e.locale.locale() ?? "").toLowerCase().startsWith("pt") ? t.pt : t.en;
}
function xe(e, t) {
  return S(() => ({
    id: t.id,
    title: h(e, t.title),
    closable: t.closable ?? "compact",
    fallback: t.fallback ?? !1
  }));
}
function He(e, t) {
  const n = xe(e, {
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
    render: (o) => i(m, {
      get when() {
        return o.session.key;
      },
      keyed: !0,
      children: (s) => t.view({
        session: o.session
      })
    })
  };
  return e.add(j, () => a), e.add(J, () => ({
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
  })), e.add(Q, () => ({
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
const pe = `
.os-list { display: flex; flex-direction: column; gap: 10px; }
`, Re = `${ae}${pe}${ge}${ve}`;
export {
  ve as CHIP_CSS,
  Se as EmptyState,
  Le as EndMarker,
  _e as ErrorBanner,
  Ce as LoadingRow,
  ae as SCROLL_CSS,
  Re as SHARED_CSS,
  ge as STATES_CSS,
  ke as ScrollNav,
  Ee as StatusChip,
  Me as createI18n,
  xe as createPanelTab,
  Te as createScrollNav,
  Be as formatDate,
  Ie as formatNumber,
  he as interpolate,
  fe as intlTag,
  h as panelText,
  He as registerSidePanel,
  ee as scrollStep,
  me as supportedLocale
};
