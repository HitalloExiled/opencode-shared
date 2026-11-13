import { createComponent as u, insert as i, memo as I, template as m, effect as S, className as N, setAttribute as _, delegateEvents as X, addEventListener as J } from "solid-js/web";
import { Show as x, createSignal as F, createEffect as K, onCleanup as Q, createMemo as H } from "solid-js";
import { usePlugin as E, Panel as Y, Command as Z, MenuItem as ee } from "@opencode/plugin/gui";
const te = 48, re = 48;
function ne(e) {
  return Math.max(te, e - re);
}
var le = /* @__PURE__ */ m('<div class="os-scroll-btn is-top">'), oe = /* @__PURE__ */ m('<div class="os-scroll-btn is-bottom">');
const ae = 24, ie = 200, se = "input, textarea, select, [contenteditable='true'], [contenteditable=''], [role='textbox']";
function Pe(e) {
  const t = e.edge ?? ae, n = e.margin ?? ie;
  let r, c, a, v, g, h = 0, d = 0;
  const [f, y] = F(!1), [w, P] = F(!0), [M, z] = F(!1), O = () => {
    var l;
    return (((l = e.visible) == null ? void 0 : l.call(e)) ?? !0) && document.visibilityState === "visible";
  }, C = () => e.hasMore() && !e.loadingMore() && O(), k = () => {
    if (!r) return;
    const l = r.scrollHeight - r.clientHeight;
    y(l > 1), P(r.scrollTop <= t), z(r.scrollTop >= l - t);
  }, T = () => {
    h || (h = requestAnimationFrame(() => {
      h = 0, k();
    }));
  }, o = () => {
    d || (d = requestAnimationFrame(() => {
      if (d = 0, !r || !c || !C()) return;
      const l = r.getBoundingClientRect();
      c.getBoundingClientRect().top <= l.bottom + n && e.loadMore();
    }));
  }, s = (l) => r == null ? void 0 : r.scrollTo({
    top: l,
    behavior: "smooth"
  }), b = () => r == null ? void 0 : r.focus({
    preventScroll: !0
  }), L = () => {
    const l = r;
    if (!l) return;
    const p = l.style.scrollBehavior;
    l.style.scrollBehavior = "auto", l.scrollTop = 0, l.style.scrollBehavior = p;
  }, $ = () => {
    s(0), b();
  }, D = () => {
    r && (s(r.scrollHeight), C() && e.loadMore(), b());
  }, R = (l) => l instanceof HTMLElement && l.closest(se) !== null, A = (l) => {
    if (l.defaultPrevented || l.altKey || l.ctrlKey || l.metaKey || R(l.target) || !r || r.scrollHeight <= r.clientHeight) return;
    const p = ne(r.clientHeight);
    switch (l.key) {
      case "Home":
        l.preventDefault(), s(0);
        break;
      case "End":
        l.preventDefault(), s(r.scrollHeight), C() && e.loadMore();
        break;
      case "PageUp":
        l.preventDefault(), s(Math.max(0, r.scrollTop - p));
        break;
      case "PageDown":
        l.preventDefault(), s(Math.min(r.scrollHeight, r.scrollTop + p));
        break;
      default:
        return;
    }
  }, V = () => {
    if (g == null || g(), g = void 0, !r) return;
    const l = r, p = () => T();
    l.addEventListener("scroll", p, {
      passive: !0
    }), g = () => l.removeEventListener("scroll", p), v == null || v.disconnect(), v = new ResizeObserver(T), v.observe(r), a == null || a.disconnect(), a = new IntersectionObserver((W) => {
      W.some((G) => G.isIntersecting) && C() && e.loadMore();
    }, {
      root: r,
      rootMargin: `${n}px 0px`
    }), c && a.observe(c), k();
  }, q = (l) => {
    r = l, V();
  }, U = (l) => {
    c = l, a && a.observe(l);
  };
  return K(() => {
    var l, p;
    e.hasMore(), e.loadingMore(), (l = e.visible) == null || l.call(e), (p = e.items) == null || p.call(e), T(), o();
  }), Q(() => {
    g == null || g(), v == null || v.disconnect(), a == null || a.disconnect(), cancelAnimationFrame(h), cancelAnimationFrame(d);
  }), {
    ref: q,
    sentinelRef: U,
    scrollable: f,
    atTop: w,
    atBottom: M,
    measure: k,
    reset: L,
    toTop: $,
    toBottom: D,
    onKeyDown: A
  };
}
function De(e) {
  const t = E();
  return [u(x, {
    get when() {
      return I(() => !!e.nav.scrollable())() && !e.nav.atTop();
    },
    get children() {
      var n = le();
      return i(n, u(t.ui.Tooltip, {
        get value() {
          return e.topLabel;
        },
        keys: ["Home"],
        get children() {
          return u(t.ui.IconButton, {
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
  }), u(x, {
    get when() {
      return I(() => !!e.nav.scrollable())() && !e.nav.atBottom();
    },
    get children() {
      var n = oe();
      return i(n, u(t.ui.Tooltip, {
        get value() {
          return e.bottomLabel;
        },
        keys: ["End"],
        get children() {
          return u(t.ui.IconButton, {
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
const ce = `
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
var de = /* @__PURE__ */ m("<div class=os-empty><div class=os-empty-title>"), ue = /* @__PURE__ */ m("<div class=os-empty-hint>"), ve = /* @__PURE__ */ m("<div class=os-error role=alert><span class=os-error-text>"), me = /* @__PURE__ */ m("<div><span>"), be = /* @__PURE__ */ m("<div class=os-end>");
function Re(e) {
  const t = E();
  return (() => {
    var n = de(), r = n.firstChild;
    return i(n, u(x, {
      get when() {
        return e.icon;
      },
      children: (c) => u(t.ui.Icon, {
        get name() {
          return c();
        },
        size: "large",
        class: "os-empty-icon"
      })
    }), r), i(r, () => e.title), i(n, u(x, {
      get when() {
        return e.hint;
      },
      children: (c) => (() => {
        var a = ue();
        return i(a, c), a;
      })()
    }), null), n;
  })();
}
function Ae(e) {
  const t = E();
  return (() => {
    var n = ve(), r = n.firstChild;
    return i(r, () => e.message), i(n, u(x, {
      get when() {
        return I(() => !!e.retryLabel)() && e.onRetry;
      },
      get children() {
        return u(t.ui.Button, {
          size: "small",
          variant: "ghost",
          onClick: () => {
            var c;
            return (c = e.onRetry) == null ? void 0 : c.call(e);
          },
          get children() {
            return e.retryLabel;
          }
        });
      }
    }), null), n;
  })();
}
function Fe(e) {
  const t = E();
  return (() => {
    var n = me(), r = n.firstChild;
    return i(n, u(t.ui.Loader, {
      size: "small"
    }), r), i(r, () => e.label), S(() => N(n, e.class ? `os-loading ${e.class}` : "os-loading")), n;
  })();
}
function Ne(e) {
  return (() => {
    var t = be();
    return i(t, () => e.label), t;
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
var fe = /* @__PURE__ */ m("<span>");
function Oe(e) {
  const t = () => {
    const n = e.tone ?? "neutral";
    return `os-chip${n === "neutral" ? "" : ` is-${n}`}${e.class ? ` ${e.class}` : ""}`;
  };
  return (() => {
    var n = fe();
    return i(n, () => e.label), S((r) => {
      var c = t(), a = e.title;
      return c !== r.e && N(n, r.e = c), a !== r.t && _(n, "title", r.t = a), r;
    }, {
      e: void 0,
      t: void 0
    }), n;
  })();
}
const xe = `
.os-chip { display: inline-flex; align-items: center; gap: 4px; padding: 1px 6px; border-radius: 999px; font-size: 10.5px; font-weight: 600; line-height: 1.6; white-space: nowrap; background: var(--v2-overlay-simple-overlay-pressed); color: var(--v2-text-text-muted); border: 1px solid transparent; }
.os-chip.is-info { background: var(--v2-state-bg-info); color: var(--v2-state-fg-info); border-color: var(--v2-state-border-info); }
.os-chip.is-success { background: var(--v2-state-bg-success); color: var(--v2-state-fg-success); border-color: var(--v2-state-border-success); }
.os-chip.is-warning { background: var(--v2-state-bg-warning); color: var(--v2-state-fg-warning); border-color: var(--v2-state-border-warning); }
.os-chip.is-danger { background: var(--v2-state-bg-danger); color: var(--v2-state-fg-danger); border-color: var(--v2-state-border-danger); }
`;
function he(e) {
  return (e ?? "").trim().toLowerCase().replace(/[-_]/g, "").startsWith("pt") ? "pt-br" : "en-us";
}
function pe(e) {
  return e === "pt-br" ? "pt-BR" : "en-US";
}
function we(e, t) {
  return e.replace(/\{(\d+)\}/g, (n, r) => String(t[Number(r)] ?? ""));
}
function je(e, t) {
  const n = { "en-us": e, "pt-br": t }, r = () => {
    const v = E();
    return H(() => he(v.locale.locale()));
  };
  return { useLocale: r, useI18nTag: () => {
    const v = r();
    return H(() => pe(v()));
  }, useT: () => {
    const v = r();
    return (g, ...h) => {
      const f = n[v()][g] ?? (typeof h[0] == "string" ? h[0] : g);
      return we(f, h);
    };
  }, tables: n };
}
function Ke(e, t, n) {
  return new Intl.NumberFormat(t, n).format(e);
}
function Ve(e, t, n) {
  return new Intl.DateTimeFormat(t, n).format(e);
}
var ye = /* @__PURE__ */ m('<span class="oc-ms-btn-label is-placeholder">'), $e = /* @__PURE__ */ m("<span class=oc-ms-tags>"), ke = /* @__PURE__ */ m("<span class=oc-ms-caret aria-hidden=true>"), _e = /* @__PURE__ */ m("<span class=oc-ms-x role=button tabindex=0><span class=oc-ms-clear aria-hidden=true>×"), Ce = /* @__PURE__ */ m("<div class=oc-ms-empty>"), Se = /* @__PURE__ */ m(`<div><style>
.oc-ms { position: relative; }
.oc-ms .oc-ms-row { display: flex; gap: 4px; align-items: stretch; }
.oc-ms .oc-ms-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  flex: 1;
  width: auto;
  min-width: 0;
  min-height: 34px;
  padding: 5px 10px;
  border: 1px solid var(--v2-border-border-muted);
  border-radius: 4px;
  background: var(--v2-background-bg-layer-02);
  color: var(--v2-text-text-base);
  font: inherit;
  cursor: pointer;
  user-select: none;
  text-align: left;
}
.oc-ms .oc-ms-btn:hover { border-color: var(--v2-border-border-strong); }
.oc-ms .oc-ms-btn:focus-visible { outline: 2px solid var(--v2-border-border-focus); outline-offset: 0; }
.oc-ms .oc-ms-btn-label {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.oc-ms .oc-ms-btn-label.is-placeholder { color: var(--v2-text-text-faint); font-style: italic; }
.oc-ms .oc-ms-btn-content { flex: 1; min-width: 0; display: flex; align-items: center; justify-content: flex-start; gap: 6px; }
.oc-ms .oc-ms-tags { display: inline-flex; align-items: center; gap: 6px; max-width: none; overflow: visible; }
.oc-ms .oc-ms-tag {
  display: inline-flex;
  align-items: center;
  max-width: none;
  overflow: visible;
  padding: 1px 6px;
  border: 1px solid var(--v2-border-border-muted);
  border-radius: 4px;
  background: var(--v2-overlay-simple-overlay-pressed);
  color: var(--v2-text-text-base);
  font-size: 11.5px;
  font-weight: 500;
  white-space: nowrap;
}
.oc-ms .oc-ms-tag-more { background: transparent; border: 0; color: var(--v2-text-text-muted); }
.oc-ms .oc-ms-caret {
  flex: 0 0 auto;
  width: 8px;
  height: 8px;
  border-left: 1.5px solid currentColor;
  border-bottom: 1.5px solid currentColor;
  transform: rotate(45deg);
  transition: transform 0.12s ease;
}
.oc-ms .oc-ms-x {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 4px;
  color: var(--v2-text-text-muted);
  cursor: pointer;
}
.oc-ms .oc-ms-x:hover { background: var(--v2-overlay-simple-overlay-hover); color: var(--v2-text-text-base); }
.oc-ms .oc-ms-x:focus-visible { outline: 2px solid var(--v2-border-border-focus); outline-offset: 0; }
.oc-ms .oc-ms-clear { font-size: 15px; line-height: 1; }
.oc-ms .oc-ms-panel {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  z-index: 1000;
  max-height: 280px;
  overflow-y: auto;
  background: var(--v2-background-bg-base);
  border: 1px solid var(--v2-border-border-muted);
  border-radius: 6px;
  box-shadow: 0 12px 28px rgb(0 0 0 / 0.35);
}
.oc-ms .oc-ms-panel.is-hidden { display: none; }
.oc-ms .oc-ms-head {
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 6px 8px;
  font-size: 11px;
  font-weight: 550;
  color: var(--v2-text-text-muted);
  border-bottom: 1px solid var(--v2-border-border-muted);
  background: var(--v2-background-bg-base);
}
.oc-ms .oc-ms-list { display: flex; flex-direction: column; gap: 2px; padding: 4px; }
.oc-ms .oc-ms-search { padding: 4px 8px; }
.oc-ms .oc-ms-search-input {
  width: 100%;
  box-sizing: border-box;
  padding: 3px 6px;
  border: 1px solid var(--v2-border-border-muted);
  border-radius: 4px;
  background: var(--v2-background-bg-layer-02);
  color: var(--v2-text-text-base);
  font: inherit;
  font-size: 12.5px;
}
.oc-ms .oc-ms-search-input:focus { outline: 2px solid var(--v2-border-border-focus); outline-offset: 0; }
.oc-ms .oc-ms-empty { padding: 12px 8px; font-size: 12.5px; color: var(--v2-text-text-faint); }
.oc-ms .oc-ms-option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12.5px;
  color: var(--v2-text-text-base);
}
.oc-ms .oc-ms-option:hover { background: var(--v2-overlay-simple-overlay-pressed); }
.oc-ms .oc-ms-option input[type="checkbox"] {
  margin: 0;
  flex: 0 0 auto;
  accent-color: var(--v2-state-fg-success);
}
.oc-ms .oc-ms-option span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
</style><div class=oc-ms-row><button class=oc-ms-btn type=button><div class=oc-ms-btn-content></div></button></div><div><div class=oc-ms-head><span></span></div><div class=oc-ms-search><input type=text class=oc-ms-search-input></div><div class=oc-ms-list>`), Te = /* @__PURE__ */ m("<span class=oc-ms-tag>"), Le = /* @__PURE__ */ m('<span class="oc-ms-tag oc-ms-tag-more">+'), Ee = /* @__PURE__ */ m("<label class=oc-ms-option><input type=checkbox><span>");
const j = (e, t) => e.toLowerCase().includes(t.toLowerCase());
function qe(e) {
  const t = E(), n = (d) => {
    var f;
    return ((f = e.display) == null ? void 0 : f.call(e, d)) ?? d;
  }, r = H(() => e.openFilter() === e.which), c = (d, f) => {
    const y = e.value();
    f ? e.onValueChange(y.includes(d) ? y : [...y, d]) : e.onValueChange(y.filter((w) => w !== d));
  }, a = () => e.onValueChange([]), [v, g] = F("");
  K(() => {
    r() || g("");
  });
  const h = H(() => {
    const d = v().trim();
    return d ? e.options.filter((f) => j(f, d) || j(n(f), d)) : e.options;
  });
  return (() => {
    var d = Se(), f = d.firstChild, y = f.nextSibling, w = y.firstChild, P = w.firstChild, M = y.nextSibling, z = M.firstChild, O = z.firstChild, C = z.nextSibling, k = C.firstChild, T = C.nextSibling;
    return J(w, "click", e.onOpenChange, !0), i(P, u(x, {
      get when() {
        return e.value().length === 0;
      },
      get children() {
        var o = ye();
        return i(o, () => e.placeholder), o;
      }
    }), null), i(P, u(x, {
      get when() {
        return e.value().length > 0;
      },
      get children() {
        var o = $e();
        return i(o, () => e.value().slice(0, 2).map((s) => (() => {
          var b = Te();
          return i(b, () => n(s)), b;
        })()), null), i(o, (() => {
          var s = I(() => e.value().length > 2);
          return () => s() && (() => {
            var b = Le();
            return b.firstChild, i(b, () => e.value().length - 2, null), b;
          })();
        })(), null), o;
      }
    }), null), i(w, u(x, {
      get when() {
        return e.value().length === 0;
      },
      get children() {
        return ke();
      }
    }), null), i(w, u(x, {
      get when() {
        return e.value().length > 0;
      },
      get children() {
        var o = _e();
        return o.$$keydown = (s) => {
          (s.key === "Enter" || s.key === " ") && (s.preventDefault(), s.stopPropagation(), a());
        }, o.$$click = (s) => {
          s.stopPropagation(), a();
        }, S(() => _(o, "aria-label", e.t("filter.clearLabel", e.label))), o;
      }
    }), null), i(O, () => e.label), i(z, u(x, {
      get when() {
        return e.value().length > 0;
      },
      get children() {
        return u(t.ui.Button, {
          size: "small",
          variant: "ghost",
          onClick: a,
          get children() {
            return e.t("filter.clear");
          }
        });
      }
    }), null), k.$$input = (o) => g(o.target.value), i(T, u(x, {
      get when() {
        return I(() => v().trim() !== "")() && h().length === 0;
      },
      get children() {
        var o = Ce();
        return i(o, () => e.t("filter.none")), o;
      }
    }), null), i(T, () => h().map((o) => (() => {
      var s = Ee(), b = s.firstChild, L = b.nextSibling;
      return b.addEventListener("change", ($) => c(o, $.target.checked)), i(L, () => n(o)), S(() => {
        var $;
        return _(s, "title", ($ = e.optionTitle) == null ? void 0 : $.call(e, o));
      }), S(() => b.checked = e.value().includes(o)), s;
    })()), null), S((o) => {
      var s = e.class ? `oc-ms ${e.class}` : "oc-ms", b = r(), L = e.label, $ = r() ? "oc-ms-panel" : "oc-ms-panel is-hidden", D = !r(), R = e.t("filter.searchPlaceholder"), A = e.t("filter.searchLabel", e.label);
      return s !== o.e && N(d, o.e = s), b !== o.t && _(w, "aria-expanded", o.t = b), L !== o.a && _(w, "aria-label", o.a = L), $ !== o.o && N(M, o.o = $), D !== o.i && _(M, "aria-hidden", o.i = D), R !== o.n && _(k, "placeholder", o.n = R), A !== o.s && _(k, "aria-label", o.s = A), o;
    }, {
      e: void 0,
      t: void 0,
      a: void 0,
      o: void 0,
      i: void 0,
      n: void 0,
      s: void 0
    }), S(() => k.value = v()), d;
  })();
}
X(["click", "keydown", "input"]);
function B(e, t) {
  return (e.locale.locale() ?? "").toLowerCase().startsWith("pt") ? t.pt : t.en;
}
function Me(e, t) {
  return H(() => ({
    id: t.id,
    title: B(e, t.title),
    closable: t.closable ?? "compact",
    fallback: t.fallback ?? !1
  }));
}
function Ue(e, t) {
  const n = Me(e, {
    id: t.id,
    title: t.title,
    closable: t.closable,
    fallback: t.fallback
  }), r = () => {
    const a = e.sessions.current();
    a && e.layout.open(`${e.id}:${t.id}`, a);
  }, c = {
    id: t.id,
    region: "side",
    mobile: {
      get title() {
        return B(e, t.title);
      },
      order: t.mobileOrder ?? 50,
      kind: "menu",
      icon: t.icon
    },
    closed: () => ({}),
    list: (a) => a.open.includes(t.id) ? [n()] : [],
    render: (a) => u(x, {
      get when() {
        return a.session.key;
      },
      keyed: !0,
      children: (v) => t.view({
        session: a.session
      })
    })
  };
  return e.add(Y, () => c), e.add(Z, () => ({
    id: `open-${t.id}`,
    get title() {
      return B(e, t.command.title);
    },
    get description() {
      return t.command.description ? B(e, t.command.description) : void 0;
    },
    ...t.bind ? {
      bind: t.bind
    } : {},
    group: "general",
    run: r
  })), e.add(ee, () => ({
    menu: "session.panel",
    id: t.id,
    order: t.order,
    get title() {
      return B(e, t.title);
    },
    icon: t.icon,
    run: r
  })), {
    tab: n,
    open: r
  };
}
const ze = `
.os-list { display: flex; flex-direction: column; gap: 10px; }
`, We = `${ce}${ze}${ge}${xe}`;
export {
  xe as CHIP_CSS,
  Re as EmptyState,
  Ne as EndMarker,
  Ae as ErrorBanner,
  Fe as LoadingRow,
  qe as MultiSelect,
  ce as SCROLL_CSS,
  We as SHARED_CSS,
  ge as STATES_CSS,
  De as ScrollNav,
  Oe as StatusChip,
  je as createI18n,
  Me as createPanelTab,
  Pe as createScrollNav,
  Ve as formatDate,
  Ke as formatNumber,
  we as interpolate,
  pe as intlTag,
  B as panelText,
  Ue as registerSidePanel,
  ne as scrollStep,
  he as supportedLocale
};
