import { createComponent as u, insert as i, memo as L, template as b, effect as T, className as N, setAttribute as C, delegateEvents as X, addEventListener as J } from "solid-js/web";
import { Show as x, createSignal as F, createEffect as K, onCleanup as Q, createMemo as P } from "solid-js";
import { usePlugin as z, Panel as Y, Command as Z, MenuItem as ee } from "@opencode/plugin/gui";
const te = 48, re = 48;
function ne(e) {
  return Math.max(te, e - re);
}
var le = /* @__PURE__ */ b('<div class="os-scroll-btn is-top">'), oe = /* @__PURE__ */ b('<div class="os-scroll-btn is-bottom">');
const ae = 24, ie = 200, se = "input, textarea, select, [contenteditable='true'], [contenteditable=''], [role='textbox']";
function De(e) {
  const t = e.edge ?? ae, n = e.margin ?? ie;
  let r, c, a, v, g, h = 0, d = 0;
  const [f, y] = F(!1), [w, D] = F(!0), [B, I] = F(!1), O = () => {
    var o;
    return (((o = e.visible) == null ? void 0 : o.call(e)) ?? !0) && document.visibilityState === "visible";
  }, S = () => e.hasMore() && !e.loadingMore() && O(), k = () => {
    if (!r) return;
    const o = r.scrollHeight - r.clientHeight;
    y(o > 1), D(r.scrollTop <= t), I(r.scrollTop >= o - t);
  }, E = () => {
    h || (h = requestAnimationFrame(() => {
      h = 0, k();
    }));
  }, l = () => {
    d || (d = requestAnimationFrame(() => {
      if (d = 0, !r || !c || !S()) return;
      const o = r.getBoundingClientRect();
      c.getBoundingClientRect().top <= o.bottom + n && e.loadMore();
    }));
  }, s = (o) => r == null ? void 0 : r.scrollTo({
    top: o,
    behavior: "smooth"
  }), m = () => r == null ? void 0 : r.focus({
    preventScroll: !0
  }), _ = () => {
    const o = r;
    if (!o) return;
    const p = o.style.scrollBehavior;
    o.style.scrollBehavior = "auto", o.scrollTop = 0, o.style.scrollBehavior = p;
  }, M = () => {
    s(0), m();
  }, $ = () => {
    r && (s(r.scrollHeight), S() && e.loadMore(), m());
  }, R = (o) => o instanceof HTMLElement && o.closest(se) !== null, A = (o) => {
    if (o.defaultPrevented || o.altKey || o.ctrlKey || o.metaKey || R(o.target) || !r || r.scrollHeight <= r.clientHeight) return;
    const p = ne(r.clientHeight);
    switch (o.key) {
      case "Home":
        o.preventDefault(), s(0);
        break;
      case "End":
        o.preventDefault(), s(r.scrollHeight), S() && e.loadMore();
        break;
      case "PageUp":
        o.preventDefault(), s(Math.max(0, r.scrollTop - p));
        break;
      case "PageDown":
        o.preventDefault(), s(Math.min(r.scrollHeight, r.scrollTop + p));
        break;
      default:
        return;
    }
  }, V = () => {
    if (g == null || g(), g = void 0, !r) return;
    const o = r, p = () => E();
    o.addEventListener("scroll", p, {
      passive: !0
    }), g = () => o.removeEventListener("scroll", p), v == null || v.disconnect(), v = new ResizeObserver(E), v.observe(r), a == null || a.disconnect(), a = new IntersectionObserver((W) => {
      W.some((G) => G.isIntersecting) && S() && e.loadMore();
    }, {
      root: r,
      rootMargin: `${n}px 0px`
    }), c && a.observe(c), k();
  }, q = (o) => {
    r = o, V();
  }, U = (o) => {
    c = o, a && a.observe(o);
  };
  return K(() => {
    var o, p;
    e.hasMore(), e.loadingMore(), (o = e.visible) == null || o.call(e), (p = e.items) == null || p.call(e), E(), l();
  }), Q(() => {
    g == null || g(), v == null || v.disconnect(), a == null || a.disconnect(), cancelAnimationFrame(h), cancelAnimationFrame(d);
  }), {
    ref: q,
    sentinelRef: U,
    scrollable: f,
    atTop: w,
    atBottom: B,
    measure: k,
    reset: _,
    toTop: M,
    toBottom: $,
    onKeyDown: A
  };
}
function Re(e) {
  const t = z();
  return [u(x, {
    get when() {
      return L(() => !!e.nav.scrollable())() && !e.nav.atTop();
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
      return L(() => !!e.nav.scrollable())() && !e.nav.atBottom();
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
var de = /* @__PURE__ */ b("<div class=os-empty><div class=os-empty-title>"), ue = /* @__PURE__ */ b("<div class=os-empty-hint>"), ve = /* @__PURE__ */ b("<div class=os-error role=alert><span class=os-error-text>"), me = /* @__PURE__ */ b("<div><span>"), be = /* @__PURE__ */ b("<div class=os-end>");
function Ae(e) {
  const t = z();
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
function Fe(e) {
  const t = z();
  return (() => {
    var n = ve(), r = n.firstChild;
    return i(r, () => e.message), i(n, u(x, {
      get when() {
        return L(() => !!e.retryLabel)() && e.onRetry;
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
function Ne(e) {
  const t = z();
  return (() => {
    var n = me(), r = n.firstChild;
    return i(n, u(t.ui.Loader, {
      size: "small"
    }), r), i(r, () => e.label), T(() => N(n, e.class ? `os-loading ${e.class}` : "os-loading")), n;
  })();
}
function Oe(e) {
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
var fe = /* @__PURE__ */ b("<span>");
function je(e) {
  const t = () => {
    const n = e.tone ?? "neutral";
    return `os-chip${n === "neutral" ? "" : ` is-${n}`}${e.class ? ` ${e.class}` : ""}`;
  };
  return (() => {
    var n = fe();
    return i(n, () => e.label), T((r) => {
      var c = t(), a = e.title;
      return c !== r.e && N(n, r.e = c), a !== r.t && C(n, "title", r.t = a), r;
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
function Ke(e, t) {
  const n = { "en-us": e, "pt-br": t }, r = () => {
    const v = z();
    return P(() => he(v.locale.locale()));
  };
  return { useLocale: r, useI18nTag: () => {
    const v = r();
    return P(() => pe(v()));
  }, useT: () => {
    const v = r();
    return (g, ...h) => {
      const f = n[v()][g] ?? (typeof h[0] == "string" ? h[0] : g);
      return we(f, h);
    };
  }, tables: n };
}
function Ve(e, t, n) {
  return new Intl.NumberFormat(t, n).format(e);
}
function qe(e, t, n) {
  return new Intl.DateTimeFormat(t, n).format(e);
}
var ye = /* @__PURE__ */ b('<span class="oc-ms-btn-label is-placeholder">'), $e = /* @__PURE__ */ b("<span class=oc-ms-tags>"), ke = /* @__PURE__ */ b("<span class=oc-ms-caret aria-hidden=true>"), _e = /* @__PURE__ */ b("<span class=oc-ms-x role=button tabindex=0><span class=oc-ms-clear aria-hidden=true>×"), Ce = /* @__PURE__ */ b("<div class=oc-ms-empty>"), Se = /* @__PURE__ */ b(`<div><style>
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
.oc-ms .oc-ms-divider { height: 1px; margin: 4px 2px; background: var(--v2-border-border-muted); }
</style><div class=oc-ms-row><button class=oc-ms-btn type=button><div class=oc-ms-btn-content></div></button></div><div><div class=oc-ms-head><span></span></div><div class=oc-ms-search><input type=text class=oc-ms-search-input></div><div class=oc-ms-list>`), Te = /* @__PURE__ */ b("<span class=oc-ms-tag>"), Le = /* @__PURE__ */ b('<span class="oc-ms-tag oc-ms-tag-more">+'), Ee = /* @__PURE__ */ b("<label class=oc-ms-option><input type=checkbox><span>"), Me = /* @__PURE__ */ b("<div class=oc-ms-divider>");
const j = (e, t) => e.toLowerCase().includes(t.toLowerCase());
function Ue(e) {
  const t = z(), n = (d) => {
    var f;
    return ((f = e.display) == null ? void 0 : f.call(e, d)) ?? d;
  }, r = P(() => e.openFilter() === e.which), c = (d, f) => {
    const y = e.value();
    f ? e.onValueChange(y.includes(d) ? y : [...y, d]) : e.onValueChange(y.filter((w) => w !== d));
  }, a = () => e.onValueChange([]), [v, g] = F("");
  K(() => {
    r() || g("");
  });
  const h = P(() => {
    const d = v().trim();
    return d ? e.options.filter((f) => j(f, d) || j(n(f), d)) : e.options;
  });
  return (() => {
    var d = Se(), f = d.firstChild, y = f.nextSibling, w = y.firstChild, D = w.firstChild, B = y.nextSibling, I = B.firstChild, O = I.firstChild, S = I.nextSibling, k = S.firstChild, E = S.nextSibling;
    return J(w, "click", e.onOpenChange, !0), i(D, u(x, {
      get when() {
        return e.value().length === 0;
      },
      get children() {
        var l = ye();
        return i(l, () => e.placeholder), l;
      }
    }), null), i(D, u(x, {
      get when() {
        return e.value().length > 0;
      },
      get children() {
        var l = $e();
        return i(l, () => e.value().slice(0, 2).map((s) => (() => {
          var m = Te();
          return i(m, () => n(s)), m;
        })()), null), i(l, (() => {
          var s = L(() => e.value().length > 2);
          return () => s() && (() => {
            var m = Le();
            return m.firstChild, i(m, () => e.value().length - 2, null), m;
          })();
        })(), null), l;
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
        var l = _e();
        return l.$$keydown = (s) => {
          (s.key === "Enter" || s.key === " ") && (s.preventDefault(), s.stopPropagation(), a());
        }, l.$$click = (s) => {
          s.stopPropagation(), a();
        }, T(() => C(l, "aria-label", e.t("filter.clearLabel", e.label))), l;
      }
    }), null), i(O, () => e.label), i(I, u(x, {
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
    }), null), k.$$input = (l) => g(l.target.value), i(E, u(x, {
      get when() {
        return L(() => v().trim() !== "")() && h().length === 0;
      },
      get children() {
        var l = Ce();
        return i(l, () => e.t("filter.none")), l;
      }
    }), null), i(E, () => h().map((l, s) => [L(() => L(() => {
      var m;
      return !!(s > 0 && ((m = e.dividerBefore) != null && m.call(e, l)));
    })() ? Me() : null), (() => {
      var m = Ee(), _ = m.firstChild, M = _.nextSibling;
      return _.addEventListener("change", ($) => c(l, $.target.checked)), i(M, () => n(l)), T(() => {
        var $;
        return C(m, "title", ($ = e.optionTitle) == null ? void 0 : $.call(e, l));
      }), T(() => _.checked = e.value().includes(l)), m;
    })()]), null), T((l) => {
      var s = e.class ? `oc-ms ${e.class}` : "oc-ms", m = r(), _ = e.label, M = r() ? "oc-ms-panel" : "oc-ms-panel is-hidden", $ = !r(), R = e.t("filter.searchPlaceholder"), A = e.t("filter.searchLabel", e.label);
      return s !== l.e && N(d, l.e = s), m !== l.t && C(w, "aria-expanded", l.t = m), _ !== l.a && C(w, "aria-label", l.a = _), M !== l.o && N(B, l.o = M), $ !== l.i && C(B, "aria-hidden", l.i = $), R !== l.n && C(k, "placeholder", l.n = R), A !== l.s && C(k, "aria-label", l.s = A), l;
    }, {
      e: void 0,
      t: void 0,
      a: void 0,
      o: void 0,
      i: void 0,
      n: void 0,
      s: void 0
    }), T(() => k.value = v()), d;
  })();
}
X(["click", "keydown", "input"]);
function H(e, t) {
  return (e.locale.locale() ?? "").toLowerCase().startsWith("pt") ? t.pt : t.en;
}
function ze(e, t) {
  return P(() => ({
    id: t.id,
    title: H(e, t.title),
    closable: t.closable ?? "compact",
    fallback: t.fallback ?? !1
  }));
}
function We(e, t) {
  const n = ze(e, {
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
        return H(e, t.title);
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
      return H(e, t.command.title);
    },
    get description() {
      return t.command.description ? H(e, t.command.description) : void 0;
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
      return H(e, t.title);
    },
    icon: t.icon,
    run: r
  })), {
    tab: n,
    open: r
  };
}
const Be = `
.os-list { display: flex; flex-direction: column; gap: 10px; }
`, Ge = `${ce}${Be}${ge}${xe}`;
export {
  xe as CHIP_CSS,
  Ae as EmptyState,
  Oe as EndMarker,
  Fe as ErrorBanner,
  Ne as LoadingRow,
  Ue as MultiSelect,
  ce as SCROLL_CSS,
  Ge as SHARED_CSS,
  ge as STATES_CSS,
  Re as ScrollNav,
  je as StatusChip,
  Ke as createI18n,
  ze as createPanelTab,
  De as createScrollNav,
  qe as formatDate,
  Ve as formatNumber,
  we as interpolate,
  pe as intlTag,
  H as panelText,
  We as registerSidePanel,
  ne as scrollStep,
  he as supportedLocale
};
