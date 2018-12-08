!(function(t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? e(exports, require("react"))
    : "function" == typeof define && define.amd
    ? define(["exports", "react"], e)
    : e((t.ReactRouterDOM = {}), t.React);
})(this, function(t, e) {
  "use strict";
  e = e && e.hasOwnProperty("default") ? e.default : e;
  var n = function() {};
  "undefined" != typeof window
    ? window
    : "undefined" != typeof global
    ? global
    : "undefined" != typeof self && self;
  function o(t, e) {
    return t((e = { exports: {} }), e.exports), e.exports;
  }
  function r(t) {
    return function() {
      return t;
    };
  }
  var i = function() {};
  (i.thatReturns = r),
    (i.thatReturnsFalse = r(!1)),
    (i.thatReturnsTrue = r(!0)),
    (i.thatReturnsNull = r(null)),
    (i.thatReturnsThis = function() {
      return this;
    }),
    (i.thatReturnsArgument = function(t) {
      return t;
    });
  var a = i,
    c = function(t) {};
  var s = function(t, e, n, o, r, i, a, s) {
      if ((c(e), !t)) {
        var u;
        if (void 0 === e)
          u = new Error(
            "Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings."
          );
        else {
          var p = [n, o, r, i, a, s],
            l = 0;
          (u = new Error(
            e.replace(/%s/g, function() {
              return p[l++];
            })
          )).name = "Invariant Violation";
        }
        throw ((u.framesToPop = 1), u);
      }
    },
    u = Object.getOwnPropertySymbols,
    p = Object.prototype.hasOwnProperty,
    l = Object.prototype.propertyIsEnumerable;
  (function() {
    try {
      if (!Object.assign) return !1;
      var t = new String("abc");
      if (((t[5] = "de"), "5" === Object.getOwnPropertyNames(t)[0])) return !1;
      for (var e = {}, n = 0; n < 10; n++) e["_" + String.fromCharCode(n)] = n;
      if (
        "0123456789" !==
        Object.getOwnPropertyNames(e)
          .map(function(t) {
            return e[t];
          })
          .join("")
      )
        return !1;
      var o = {};
      return (
        "abcdefghijklmnopqrst".split("").forEach(function(t) {
          o[t] = t;
        }),
        "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, o)).join("")
      );
    } catch (t) {
      return !1;
    }
  })() && Object.assign;
  var f = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",
    h = o(function(t) {
      t.exports = (function() {
        function t(t, e, n, o, r, i) {
          i !== f &&
            s(
              !1,
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
            );
        }
        function e() {
          return t;
        }
        t.isRequired = t;
        var n = {
          array: t,
          bool: t,
          func: t,
          number: t,
          object: t,
          string: t,
          symbol: t,
          any: t,
          arrayOf: e,
          element: t,
          instanceOf: e,
          node: t,
          objectOf: e,
          oneOf: e,
          oneOfType: e,
          shape: e,
          exact: e
        };
        return (n.checkPropTypes = a), (n.PropTypes = n), n;
      })();
    }),
    d = function(t, e, n, o, r, i, a, c) {
      if (!t) {
        var s;
        if (void 0 === e)
          s = new Error(
            "Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings."
          );
        else {
          var u = [n, o, r, i, a, c],
            p = 0;
          (s = new Error(
            e.replace(/%s/g, function() {
              return u[p++];
            })
          )).name = "Invariant Violation";
        }
        throw ((s.framesToPop = 1), s);
      }
    };
  function y(t) {
    return "/" === t.charAt(0);
  }
  function v(t, e) {
    for (var n = e, o = n + 1, r = t.length; o < r; n += 1, o += 1) t[n] = t[o];
    t.pop();
  }
  var m =
    "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
      ? function(t) {
          return typeof t;
        }
      : function(t) {
          return t &&
            "function" == typeof Symbol &&
            t.constructor === Symbol &&
            t !== Symbol.prototype
            ? "symbol"
            : typeof t;
        };
  var b = function(t) {
      return "/" === t.charAt(0) ? t : "/" + t;
    },
    g = function(t) {
      return "/" === t.charAt(0) ? t.substr(1) : t;
    },
    w = function(t, e) {
      return new RegExp("^" + e + "(\\/|\\?|#|$)", "i").test(t);
    },
    O = function(t, e) {
      return w(t, e) ? t.substr(e.length) : t;
    },
    x = function(t) {
      return "/" === t.charAt(t.length - 1) ? t.slice(0, -1) : t;
    },
    R = function(t) {
      var e = t.pathname,
        n = t.search,
        o = t.hash,
        r = e || "/";
      return (
        n && "?" !== n && (r += "?" === n.charAt(0) ? n : "?" + n),
        o && "#" !== o && (r += "#" === o.charAt(0) ? o : "#" + o),
        r
      );
    },
    P =
      Object.assign ||
      function(t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e];
          for (var o in n)
            Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
        }
        return t;
      },
    j = function(t, e, n, o) {
      var r = void 0;
      "string" == typeof t
        ? ((r = (function(t) {
            var e = t || "/",
              n = "",
              o = "",
              r = e.indexOf("#");
            -1 !== r && ((o = e.substr(r)), (e = e.substr(0, r)));
            var i = e.indexOf("?");
            return (
              -1 !== i && ((n = e.substr(i)), (e = e.substr(0, i))),
              {
                pathname: e,
                search: "?" === n ? "" : n,
                hash: "#" === o ? "" : o
              }
            );
          })(t)).state = e)
        : (void 0 === (r = P({}, t)).pathname && (r.pathname = ""),
          r.search
            ? "?" !== r.search.charAt(0) && (r.search = "?" + r.search)
            : (r.search = ""),
          r.hash
            ? "#" !== r.hash.charAt(0) && (r.hash = "#" + r.hash)
            : (r.hash = ""),
          void 0 !== e && void 0 === r.state && (r.state = e));
      try {
        r.pathname = decodeURI(r.pathname);
      } catch (t) {
        throw t instanceof URIError
          ? new URIError(
              'Pathname "' +
                r.pathname +
                '" could not be decoded. This is likely caused by an invalid percent-encoding.'
            )
          : t;
      }
      return (
        n && (r.key = n),
        o
          ? r.pathname
            ? "/" !== r.pathname.charAt(0) &&
              (r.pathname = (function(t) {
                var e =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : "",
                  n = (t && t.split("/")) || [],
                  o = (e && e.split("/")) || [],
                  r = t && y(t),
                  i = e && y(e),
                  a = r || i;
                if (
                  (t && y(t)
                    ? (o = n)
                    : n.length && (o.pop(), (o = o.concat(n))),
                  !o.length)
                )
                  return "/";
                var c = void 0;
                if (o.length) {
                  var s = o[o.length - 1];
                  c = "." === s || ".." === s || "" === s;
                } else c = !1;
                for (var u = 0, p = o.length; p >= 0; p--) {
                  var l = o[p];
                  "." === l
                    ? v(o, p)
                    : ".." === l
                    ? (v(o, p), u++)
                    : u && (v(o, p), u--);
                }
                if (!a) for (; u--; u) o.unshift("..");
                !a || "" === o[0] || (o[0] && y(o[0])) || o.unshift("");
                var f = o.join("/");
                return c && "/" !== f.substr(-1) && (f += "/"), f;
              })(r.pathname, o.pathname))
            : (r.pathname = o.pathname)
          : r.pathname || (r.pathname = "/"),
        r
      );
    },
    E = function(t, e) {
      return (
        t.pathname === e.pathname &&
        t.search === e.search &&
        t.hash === e.hash &&
        t.key === e.key &&
        (function t(e, n) {
          if (e === n) return !0;
          if (null == e || null == n) return !1;
          if (Array.isArray(e))
            return (
              Array.isArray(n) &&
              e.length === n.length &&
              e.every(function(e, o) {
                return t(e, n[o]);
              })
            );
          var o = void 0 === e ? "undefined" : m(e);
          if (o !== (void 0 === n ? "undefined" : m(n))) return !1;
          if ("object" === o) {
            var r = e.valueOf(),
              i = n.valueOf();
            if (r !== e || i !== n) return t(r, i);
            var a = Object.keys(e),
              c = Object.keys(n);
            return (
              a.length === c.length &&
              a.every(function(o) {
                return t(e[o], n[o]);
              })
            );
          }
          return !1;
        })(t.state, e.state)
      );
    },
    T = function() {
      var t = null,
        e = [];
      return {
        setPrompt: function(e) {
          return (
            n(null == t, "A history supports only one prompt at a time"),
            (t = e),
            function() {
              t === e && (t = null);
            }
          );
        },
        confirmTransitionTo: function(e, o, r, i) {
          if (null != t) {
            var a = "function" == typeof t ? t(e, o) : t;
            "string" == typeof a
              ? "function" == typeof r
                ? r(a, i)
                : (n(
                    !1,
                    "A history needs a getUserConfirmation function in order to use a prompt message"
                  ),
                  i(!0))
              : i(!1 !== a);
          } else i(!0);
        },
        appendListener: function(t) {
          var n = !0,
            o = function() {
              n && t.apply(void 0, arguments);
            };
          return (
            e.push(o),
            function() {
              (n = !1),
                (e = e.filter(function(t) {
                  return t !== o;
                }));
            }
          );
        },
        notifyListeners: function() {
          for (var t = arguments.length, n = Array(t), o = 0; o < t; o++)
            n[o] = arguments[o];
          e.forEach(function(t) {
            return t.apply(void 0, n);
          });
        }
      };
    },
    C = !(
      "undefined" == typeof window ||
      !window.document ||
      !window.document.createElement
    ),
    S = function(t, e, n) {
      return t.addEventListener
        ? t.addEventListener(e, n, !1)
        : t.attachEvent("on" + e, n);
    },
    k = function(t, e, n) {
      return t.removeEventListener
        ? t.removeEventListener(e, n, !1)
        : t.detachEvent("on" + e, n);
    },
    A = function(t, e) {
      return e(window.confirm(t));
    },
    _ =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function(t) {
            return typeof t;
          }
        : function(t) {
            return t &&
              "function" == typeof Symbol &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          },
    M =
      Object.assign ||
      function(t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e];
          for (var o in n)
            Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
        }
        return t;
      },
    L = function() {
      try {
        return window.history.state || {};
      } catch (t) {
        return {};
      }
    },
    q = function() {
      var t =
        arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      d(C, "Browser history needs a DOM");
      var e,
        o = window.history,
        r =
          ((-1 === (e = window.navigator.userAgent).indexOf("Android 2.") &&
            -1 === e.indexOf("Android 4.0")) ||
            -1 === e.indexOf("Mobile Safari") ||
            -1 !== e.indexOf("Chrome") ||
            -1 !== e.indexOf("Windows Phone")) &&
          window.history &&
          "pushState" in window.history,
        i = !(-1 === window.navigator.userAgent.indexOf("Trident")),
        a = t.forceRefresh,
        c = void 0 !== a && a,
        s = t.getUserConfirmation,
        u = void 0 === s ? A : s,
        p = t.keyLength,
        l = void 0 === p ? 6 : p,
        f = t.basename ? x(b(t.basename)) : "",
        h = function(t) {
          var e = t || {},
            o = e.key,
            r = e.state,
            i = window.location,
            a = i.pathname + i.search + i.hash;
          return (
            n(
              !f || w(a, f),
              'You are attempting to use a basename on a page whose URL path does not begin with the basename. Expected path "' +
                a +
                '" to begin with "' +
                f +
                '".'
            ),
            f && (a = O(a, f)),
            j(a, r, o)
          );
        },
        y = function() {
          return Math.random()
            .toString(36)
            .substr(2, l);
        },
        v = T(),
        m = function(t) {
          M($, t),
            ($.length = o.length),
            v.notifyListeners($.location, $.action);
        },
        g = function(t) {
          (function(t) {
            return (
              void 0 === t.state && -1 === navigator.userAgent.indexOf("CriOS")
            );
          })(t) || q(h(t.state));
        },
        P = function() {
          q(h(L()));
        },
        E = !1,
        q = function(t) {
          if (E) (E = !1), m();
          else {
            v.confirmTransitionTo(t, "POP", u, function(e) {
              e ? m({ action: "POP", location: t }) : U(t);
            });
          }
        },
        U = function(t) {
          var e = $.location,
            n = Y.indexOf(e.key);
          -1 === n && (n = 0);
          var o = Y.indexOf(t.key);
          -1 === o && (o = 0);
          var r = n - o;
          r && ((E = !0), I(r));
        },
        H = h(L()),
        Y = [H.key],
        W = function(t) {
          return f + R(t);
        },
        I = function(t) {
          o.go(t);
        },
        N = 0,
        B = function(t) {
          1 === (N += t)
            ? (S(window, "popstate", g), i && S(window, "hashchange", P))
            : 0 === N &&
              (k(window, "popstate", g), i && k(window, "hashchange", P));
        },
        D = !1,
        $ = {
          length: o.length,
          action: "POP",
          location: H,
          createHref: W,
          push: function(t, e) {
            n(
              !(
                "object" === (void 0 === t ? "undefined" : _(t)) &&
                void 0 !== t.state &&
                void 0 !== e
              ),
              "You should avoid providing a 2nd state argument to push when the 1st argument is a location-like object that already has state; it is ignored"
            );
            var i = j(t, e, y(), $.location);
            v.confirmTransitionTo(i, "PUSH", u, function(t) {
              if (t) {
                var e = W(i),
                  a = i.key,
                  s = i.state;
                if (r)
                  if ((o.pushState({ key: a, state: s }, null, e), c))
                    window.location.href = e;
                  else {
                    var u = Y.indexOf($.location.key),
                      p = Y.slice(0, -1 === u ? 0 : u + 1);
                    p.push(i.key), (Y = p), m({ action: "PUSH", location: i });
                  }
                else
                  n(
                    void 0 === s,
                    "Browser history cannot push state in browsers that do not support HTML5 history"
                  ),
                    (window.location.href = e);
              }
            });
          },
          replace: function(t, e) {
            n(
              !(
                "object" === (void 0 === t ? "undefined" : _(t)) &&
                void 0 !== t.state &&
                void 0 !== e
              ),
              "You should avoid providing a 2nd state argument to replace when the 1st argument is a location-like object that already has state; it is ignored"
            );
            var i = j(t, e, y(), $.location);
            v.confirmTransitionTo(i, "REPLACE", u, function(t) {
              if (t) {
                var e = W(i),
                  a = i.key,
                  s = i.state;
                if (r)
                  if ((o.replaceState({ key: a, state: s }, null, e), c))
                    window.location.replace(e);
                  else {
                    var u = Y.indexOf($.location.key);
                    -1 !== u && (Y[u] = i.key),
                      m({ action: "REPLACE", location: i });
                  }
                else
                  n(
                    void 0 === s,
                    "Browser history cannot replace state in browsers that do not support HTML5 history"
                  ),
                    window.location.replace(e);
              }
            });
          },
          go: I,
          goBack: function() {
            return I(-1);
          },
          goForward: function() {
            return I(1);
          },
          block: function() {
            var t =
                arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
              e = v.setPrompt(t);
            return (
              D || (B(1), (D = !0)),
              function() {
                return D && ((D = !1), B(-1)), e();
              }
            );
          },
          listen: function(t) {
            var e = v.appendListener(t);
            return (
              B(1),
              function() {
                B(-1), e();
              }
            );
          }
        };
      return $;
    },
    U =
      Object.assign ||
      function(t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e];
          for (var o in n)
            Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
        }
        return t;
      },
    H = {
      hashbang: {
        encodePath: function(t) {
          return "!" === t.charAt(0) ? t : "!/" + g(t);
        },
        decodePath: function(t) {
          return "!" === t.charAt(0) ? t.substr(1) : t;
        }
      },
      noslash: { encodePath: g, decodePath: b },
      slash: { encodePath: b, decodePath: b }
    },
    Y = function() {
      var t = window.location.href,
        e = t.indexOf("#");
      return -1 === e ? "" : t.substring(e + 1);
    },
    W = function(t) {
      var e = window.location.href.indexOf("#");
      window.location.replace(
        window.location.href.slice(0, e >= 0 ? e : 0) + "#" + t
      );
    },
    I = function() {
      var t =
        arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      d(C, "Hash history needs a DOM");
      var e = window.history,
        o = -1 === window.navigator.userAgent.indexOf("Firefox"),
        r = t.getUserConfirmation,
        i = void 0 === r ? A : r,
        a = t.hashType,
        c = void 0 === a ? "slash" : a,
        s = t.basename ? x(b(t.basename)) : "",
        u = H[c],
        p = u.encodePath,
        l = u.decodePath,
        f = function() {
          var t = l(Y());
          return (
            n(
              !s || w(t, s),
              'You are attempting to use a basename on a page whose URL path does not begin with the basename. Expected path "' +
                t +
                '" to begin with "' +
                s +
                '".'
            ),
            s && (t = O(t, s)),
            j(t)
          );
        },
        h = T(),
        y = function(t) {
          U(F, t),
            (F.length = e.length),
            h.notifyListeners(F.location, F.action);
        },
        v = !1,
        m = null,
        g = function() {
          var t = Y(),
            e = p(t);
          if (t !== e) W(e);
          else {
            var n = f(),
              o = F.location;
            if (!v && E(o, n)) return;
            if (m === R(n)) return;
            (m = null), P(n);
          }
        },
        P = function(t) {
          if (v) (v = !1), y();
          else {
            h.confirmTransitionTo(t, "POP", i, function(e) {
              e ? y({ action: "POP", location: t }) : _(t);
            });
          }
        },
        _ = function(t) {
          var e = F.location,
            n = I.lastIndexOf(R(e));
          -1 === n && (n = 0);
          var o = I.lastIndexOf(R(t));
          -1 === o && (o = 0);
          var r = n - o;
          r && ((v = !0), N(r));
        },
        M = Y(),
        L = p(M);
      M !== L && W(L);
      var q = f(),
        I = [R(q)],
        N = function(t) {
          n(o, "Hash history go(n) causes a full page reload in this browser"),
            e.go(t);
        },
        B = 0,
        D = function(t) {
          1 === (B += t)
            ? S(window, "hashchange", g)
            : 0 === B && k(window, "hashchange", g);
        },
        $ = !1,
        F = {
          length: e.length,
          action: "POP",
          location: q,
          createHref: function(t) {
            return "#" + p(s + R(t));
          },
          push: function(t, e) {
            n(void 0 === e, "Hash history cannot push state; it is ignored");
            var o = j(t, void 0, void 0, F.location);
            h.confirmTransitionTo(o, "PUSH", i, function(t) {
              if (t) {
                var e = R(o),
                  r = p(s + e);
                if (Y() !== r) {
                  (m = e),
                    (function(t) {
                      window.location.hash = t;
                    })(r);
                  var i = I.lastIndexOf(R(F.location)),
                    a = I.slice(0, -1 === i ? 0 : i + 1);
                  a.push(e), (I = a), y({ action: "PUSH", location: o });
                } else
                  n(
                    !1,
                    "Hash history cannot PUSH the same path; a new entry will not be added to the history stack"
                  ),
                    y();
              }
            });
          },
          replace: function(t, e) {
            n(void 0 === e, "Hash history cannot replace state; it is ignored");
            var o = j(t, void 0, void 0, F.location);
            h.confirmTransitionTo(o, "REPLACE", i, function(t) {
              if (t) {
                var e = R(o),
                  n = p(s + e);
                Y() !== n && ((m = e), W(n));
                var r = I.indexOf(R(F.location));
                -1 !== r && (I[r] = e), y({ action: "REPLACE", location: o });
              }
            });
          },
          go: N,
          goBack: function() {
            return N(-1);
          },
          goForward: function() {
            return N(1);
          },
          block: function() {
            var t =
                arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
              e = h.setPrompt(t);
            return (
              $ || (D(1), ($ = !0)),
              function() {
                return $ && (($ = !1), D(-1)), e();
              }
            );
          },
          listen: function(t) {
            var e = h.appendListener(t);
            return (
              D(1),
              function() {
                D(-1), e();
              }
            );
          }
        };
      return F;
    },
    N =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function(t) {
            return typeof t;
          }
        : function(t) {
            return t &&
              "function" == typeof Symbol &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          },
    B =
      Object.assign ||
      function(t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e];
          for (var o in n)
            Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
        }
        return t;
      },
    D = function(t, e, n) {
      return Math.min(Math.max(t, e), n);
    },
    $ = function() {
      var t =
          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
        e = t.getUserConfirmation,
        o = t.initialEntries,
        r = void 0 === o ? ["/"] : o,
        i = t.initialIndex,
        a = void 0 === i ? 0 : i,
        c = t.keyLength,
        s = void 0 === c ? 6 : c,
        u = T(),
        p = function(t) {
          B(v, t),
            (v.length = v.entries.length),
            u.notifyListeners(v.location, v.action);
        },
        l = function() {
          return Math.random()
            .toString(36)
            .substr(2, s);
        },
        f = D(a, 0, r.length - 1),
        h = r.map(function(t) {
          return j(t, void 0, "string" == typeof t ? l() : t.key || l());
        }),
        d = R,
        y = function(t) {
          var n = D(v.index + t, 0, v.entries.length - 1),
            o = v.entries[n];
          u.confirmTransitionTo(o, "POP", e, function(t) {
            t ? p({ action: "POP", location: o, index: n }) : p();
          });
        },
        v = {
          length: h.length,
          action: "POP",
          location: h[f],
          index: f,
          entries: h,
          createHref: d,
          push: function(t, o) {
            n(
              !(
                "object" === (void 0 === t ? "undefined" : N(t)) &&
                void 0 !== t.state &&
                void 0 !== o
              ),
              "You should avoid providing a 2nd state argument to push when the 1st argument is a location-like object that already has state; it is ignored"
            );
            var r = j(t, o, l(), v.location);
            u.confirmTransitionTo(r, "PUSH", e, function(t) {
              if (t) {
                var e = v.index + 1,
                  n = v.entries.slice(0);
                n.length > e ? n.splice(e, n.length - e, r) : n.push(r),
                  p({ action: "PUSH", location: r, index: e, entries: n });
              }
            });
          },
          replace: function(t, o) {
            n(
              !(
                "object" === (void 0 === t ? "undefined" : N(t)) &&
                void 0 !== t.state &&
                void 0 !== o
              ),
              "You should avoid providing a 2nd state argument to replace when the 1st argument is a location-like object that already has state; it is ignored"
            );
            var r = j(t, o, l(), v.location);
            u.confirmTransitionTo(r, "REPLACE", e, function(t) {
              t &&
                ((v.entries[v.index] = r),
                p({ action: "REPLACE", location: r }));
            });
          },
          go: y,
          goBack: function() {
            return y(-1);
          },
          goForward: function() {
            return y(1);
          },
          canGo: function(t) {
            var e = v.index + t;
            return e >= 0 && e < v.entries.length;
          },
          block: function() {
            var t =
              arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            return u.setPrompt(t);
          },
          listen: function(t) {
            return u.appendListener(t);
          }
        };
      return v;
    },
    F =
      Object.assign ||
      function(t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e];
          for (var o in n)
            Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
        }
        return t;
      };
  function K(t, e) {
    if (!t)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      );
    return !e || ("object" != typeof e && "function" != typeof e) ? t : e;
  }
  var V = (function(t) {
    function o() {
      var e, n;
      !(function(t, e) {
        if (!(t instanceof e))
          throw new TypeError("Cannot call a class as a function");
      })(this, o);
      for (var r = arguments.length, i = Array(r), a = 0; a < r; a++)
        i[a] = arguments[a];
      return (
        (e = n = K(this, t.call.apply(t, [this].concat(i)))),
        (n.state = {
          match: n.computeMatch(n.props.history.location.pathname)
        }),
        K(n, e)
      );
    }
    return (
      (function(t, e) {
        if ("function" != typeof e && null !== e)
          throw new TypeError(
            "Super expression must either be null or a function, not " +
              typeof e
          );
        (t.prototype = Object.create(e && e.prototype, {
          constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          e &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(t, e)
              : (t.__proto__ = e));
      })(o, t),
      (o.prototype.getChildContext = function() {
        return {
          router: F({}, this.context.router, {
            history: this.props.history,
            route: {
              location: this.props.history.location,
              match: this.state.match
            }
          })
        };
      }),
      (o.prototype.computeMatch = function(t) {
        return { path: "/", url: "/", params: {}, isExact: "/" === t };
      }),
      (o.prototype.componentWillMount = function() {
        var t = this,
          n = this.props,
          o = n.children,
          r = n.history;
        d(
          null == o || 1 === e.Children.count(o),
          "A <Router> may have only one child element"
        ),
          (this.unlisten = r.listen(function() {
            t.setState({ match: t.computeMatch(r.location.pathname) });
          }));
      }),
      (o.prototype.componentWillReceiveProps = function(t) {
        n(
          this.props.history === t.history,
          "You cannot change <Router history>"
        );
      }),
      (o.prototype.componentWillUnmount = function() {
        this.unlisten();
      }),
      (o.prototype.render = function() {
        var t = this.props.children;
        return t ? e.Children.only(t) : null;
      }),
      o
    );
  })(e.Component);
  (V.propTypes = { history: h.object.isRequired, children: h.node }),
    (V.contextTypes = { router: h.object }),
    (V.childContextTypes = { router: h.object.isRequired });
  var J =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function(t) {
            return typeof t;
          }
        : function(t) {
            return t &&
              "function" == typeof Symbol &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          },
    G = function(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    },
    z =
      Object.assign ||
      function(t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e];
          for (var o in n)
            Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
        }
        return t;
      },
    Q = function(t, e) {
      if ("function" != typeof e && null !== e)
        throw new TypeError(
          "Super expression must either be null or a function, not " + typeof e
        );
      (t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      })),
        e &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(t, e)
            : (t.__proto__ = e));
    },
    X = function(t, e) {
      var n = {};
      for (var o in t)
        e.indexOf(o) >= 0 ||
          (Object.prototype.hasOwnProperty.call(t, o) && (n[o] = t[o]));
      return n;
    },
    Z = function(t, e) {
      if (!t)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return !e || ("object" != typeof e && "function" != typeof e) ? t : e;
    },
    tt = (function(t) {
      function n() {
        var e, o;
        G(this, n);
        for (var r = arguments.length, i = Array(r), a = 0; a < r; a++)
          i[a] = arguments[a];
        return (
          (e = o = Z(this, t.call.apply(t, [this].concat(i)))),
          (o.history = q(o.props)),
          Z(o, e)
        );
      }
      return (
        Q(n, t),
        (n.prototype.componentWillMount = function() {}),
        (n.prototype.render = function() {
          return e.createElement(V, {
            history: this.history,
            children: this.props.children
          });
        }),
        n
      );
    })(e.Component),
    et = (function(t) {
      function n() {
        var e, o;
        G(this, n);
        for (var r = arguments.length, i = Array(r), a = 0; a < r; a++)
          i[a] = arguments[a];
        return (
          (e = o = Z(this, t.call.apply(t, [this].concat(i)))),
          (o.history = I(o.props)),
          Z(o, e)
        );
      }
      return (
        Q(n, t),
        (n.prototype.componentWillMount = function() {}),
        (n.prototype.render = function() {
          return e.createElement(V, {
            history: this.history,
            children: this.props.children
          });
        }),
        n
      );
    })(e.Component),
    nt = function(t) {
      return !!(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey);
    },
    ot = (function(t) {
      function n() {
        var e, o;
        G(this, n);
        for (var r = arguments.length, i = Array(r), a = 0; a < r; a++)
          i[a] = arguments[a];
        return (
          (e = o = Z(this, t.call.apply(t, [this].concat(i)))),
          (o.handleClick = function(t) {
            if (
              (o.props.onClick && o.props.onClick(t),
              !t.defaultPrevented &&
                0 === t.button &&
                !o.props.target &&
                !nt(t))
            ) {
              t.preventDefault();
              var e = o.context.router.history,
                n = o.props,
                r = n.replace,
                i = n.to;
              r ? e.replace(i) : e.push(i);
            }
          }),
          Z(o, e)
        );
      }
      return (
        Q(n, t),
        (n.prototype.render = function() {
          var t = this.props,
            n = (t.replace, t.to),
            o = t.innerRef,
            r = X(t, ["replace", "to", "innerRef"]);
          this.context.router || d(!1), void 0 === n && d(!1);
          var i = this.context.router.history,
            a = "string" == typeof n ? j(n, null, null, i.location) : n,
            c = i.createHref(a);
          return e.createElement(
            "a",
            z({}, r, { onClick: this.handleClick, href: c, ref: o })
          );
        }),
        n
      );
    })(e.Component);
  function rt(t, e) {
    if (!t)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      );
    return !e || ("object" != typeof e && "function" != typeof e) ? t : e;
  }
  (ot.defaultProps = { replace: !1 }),
    (ot.contextTypes = {
      router: h.shape({
        history: h.shape({
          push: h.func.isRequired,
          replace: h.func.isRequired,
          createHref: h.func.isRequired
        }).isRequired
      }).isRequired
    });
  var it = (function(t) {
    function o() {
      var e, n;
      !(function(t, e) {
        if (!(t instanceof e))
          throw new TypeError("Cannot call a class as a function");
      })(this, o);
      for (var r = arguments.length, i = Array(r), a = 0; a < r; a++)
        i[a] = arguments[a];
      return (
        (e = n = rt(this, t.call.apply(t, [this].concat(i)))),
        (n.history = $(n.props)),
        rt(n, e)
      );
    }
    return (
      (function(t, e) {
        if ("function" != typeof e && null !== e)
          throw new TypeError(
            "Super expression must either be null or a function, not " +
              typeof e
          );
        (t.prototype = Object.create(e && e.prototype, {
          constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          e &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(t, e)
              : (t.__proto__ = e));
      })(o, t),
      (o.prototype.componentWillMount = function() {
        n(
          !this.props.history,
          "<MemoryRouter> ignores the history prop. To use a custom history, use `import { Router }` instead of `import { MemoryRouter as Router }`."
        );
      }),
      (o.prototype.render = function() {
        return e.createElement(V, {
          history: this.history,
          children: this.props.children
        });
      }),
      o
    );
  })(e.Component);
  it.propTypes = {
    initialEntries: h.array,
    initialIndex: h.number,
    getUserConfirmation: h.func,
    keyLength: h.number,
    children: h.node
  };
  var at = {}.toString,
    ct =
      Array.isArray ||
      function(t) {
        return "[object Array]" == at.call(t);
      },
    st = xt,
    ut = dt,
    pt = function(t, e) {
      return vt(dt(t, e));
    },
    lt = vt,
    ft = Ot,
    ht = new RegExp(
      [
        "(\\\\.)",
        "([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"
      ].join("|"),
      "g"
    );
  function dt(t, e) {
    for (
      var n, o = [], r = 0, i = 0, a = "", c = (e && e.delimiter) || "/";
      null != (n = ht.exec(t));

    ) {
      var s = n[0],
        u = n[1],
        p = n.index;
      if (((a += t.slice(i, p)), (i = p + s.length), u)) a += u[1];
      else {
        var l = t[i],
          f = n[2],
          h = n[3],
          d = n[4],
          y = n[5],
          v = n[6],
          m = n[7];
        a && (o.push(a), (a = ""));
        var b = null != f && null != l && l !== f,
          g = "+" === v || "*" === v,
          w = "?" === v || "*" === v,
          O = n[2] || c,
          x = d || y;
        o.push({
          name: h || r++,
          prefix: f || "",
          delimiter: O,
          optional: w,
          repeat: g,
          partial: b,
          asterisk: !!m,
          pattern: x ? bt(x) : m ? ".*" : "[^" + mt(O) + "]+?"
        });
      }
    }
    return i < t.length && (a += t.substr(i)), a && o.push(a), o;
  }
  function yt(t) {
    return encodeURI(t).replace(/[\/?#]/g, function(t) {
      return (
        "%" +
        t
          .charCodeAt(0)
          .toString(16)
          .toUpperCase()
      );
    });
  }
  function vt(t) {
    for (var e = new Array(t.length), n = 0; n < t.length; n++)
      "object" == typeof t[n] &&
        (e[n] = new RegExp("^(?:" + t[n].pattern + ")$"));
    return function(n, o) {
      for (
        var r = "",
          i = n || {},
          a = (o || {}).pretty ? yt : encodeURIComponent,
          c = 0;
        c < t.length;
        c++
      ) {
        var s = t[c];
        if ("string" != typeof s) {
          var u,
            p = i[s.name];
          if (null == p) {
            if (s.optional) {
              s.partial && (r += s.prefix);
              continue;
            }
            throw new TypeError('Expected "' + s.name + '" to be defined');
          }
          if (ct(p)) {
            if (!s.repeat)
              throw new TypeError(
                'Expected "' +
                  s.name +
                  '" to not repeat, but received `' +
                  JSON.stringify(p) +
                  "`"
              );
            if (0 === p.length) {
              if (s.optional) continue;
              throw new TypeError('Expected "' + s.name + '" to not be empty');
            }
            for (var l = 0; l < p.length; l++) {
              if (((u = a(p[l])), !e[c].test(u)))
                throw new TypeError(
                  'Expected all "' +
                    s.name +
                    '" to match "' +
                    s.pattern +
                    '", but received `' +
                    JSON.stringify(u) +
                    "`"
                );
              r += (0 === l ? s.prefix : s.delimiter) + u;
            }
          } else {
            if (
              ((u = s.asterisk
                ? encodeURI(p).replace(/[?#]/g, function(t) {
                    return (
                      "%" +
                      t
                        .charCodeAt(0)
                        .toString(16)
                        .toUpperCase()
                    );
                  })
                : a(p)),
              !e[c].test(u))
            )
              throw new TypeError(
                'Expected "' +
                  s.name +
                  '" to match "' +
                  s.pattern +
                  '", but received "' +
                  u +
                  '"'
              );
            r += s.prefix + u;
          }
        } else r += s;
      }
      return r;
    };
  }
  function mt(t) {
    return t.replace(/([.+*?=^!:${}()[\]|\/\\])/g, "\\$1");
  }
  function bt(t) {
    return t.replace(/([=!:$\/()])/g, "\\$1");
  }
  function gt(t, e) {
    return (t.keys = e), t;
  }
  function wt(t) {
    return t.sensitive ? "" : "i";
  }
  function Ot(t, e, n) {
    ct(e) || ((n = e || n), (e = []));
    for (
      var o = (n = n || {}).strict, r = !1 !== n.end, i = "", a = 0;
      a < t.length;
      a++
    ) {
      var c = t[a];
      if ("string" == typeof c) i += mt(c);
      else {
        var s = mt(c.prefix),
          u = "(?:" + c.pattern + ")";
        e.push(c),
          c.repeat && (u += "(?:" + s + u + ")*"),
          (i += u = c.optional
            ? c.partial
              ? s + "(" + u + ")?"
              : "(?:" + s + "(" + u + "))?"
            : s + "(" + u + ")");
      }
    }
    var p = mt(n.delimiter || "/"),
      l = i.slice(-p.length) === p;
    return (
      o || (i = (l ? i.slice(0, -p.length) : i) + "(?:" + p + "(?=$))?"),
      (i += r ? "$" : o && l ? "" : "(?=" + p + "|$)"),
      gt(new RegExp("^" + i, wt(n)), e)
    );
  }
  function xt(t, e, n) {
    return (
      ct(e) || ((n = e || n), (e = [])),
      (n = n || {}),
      t instanceof RegExp
        ? (function(t, e) {
            var n = t.source.match(/\((?!\?)/g);
            if (n)
              for (var o = 0; o < n.length; o++)
                e.push({
                  name: o,
                  prefix: null,
                  delimiter: null,
                  optional: !1,
                  repeat: !1,
                  partial: !1,
                  asterisk: !1,
                  pattern: null
                });
            return gt(t, e);
          })(t, e)
        : ct(t)
        ? (function(t, e, n) {
            for (var o = [], r = 0; r < t.length; r++)
              o.push(xt(t[r], e, n).source);
            return gt(new RegExp("(?:" + o.join("|") + ")", wt(n)), e);
          })(t, e, n)
        : (function(t, e, n) {
            return Ot(dt(t, n), e, n);
          })(t, e, n)
    );
  }
  (st.parse = ut),
    (st.compile = pt),
    (st.tokensToFunction = lt),
    (st.tokensToRegExp = ft);
  var Rt = {},
    Pt = 0,
    jt = function(t) {
      var e =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        n = arguments[2];
      "string" == typeof e && (e = { path: e });
      var o = e,
        r = o.path,
        i = o.exact,
        a = void 0 !== i && i,
        c = o.strict,
        s = void 0 !== c && c,
        u = o.sensitive,
        p = void 0 !== u && u;
      if (null == r) return n;
      var l = (function(t, e) {
          var n = "" + e.end + e.strict + e.sensitive,
            o = Rt[n] || (Rt[n] = {});
          if (o[t]) return o[t];
          var r = [],
            i = { re: st(t, r, e), keys: r };
          return Pt < 1e4 && ((o[t] = i), Pt++), i;
        })(r, { end: a, strict: s, sensitive: p }),
        f = l.re,
        h = l.keys,
        d = f.exec(t);
      if (!d) return null;
      var y = d[0],
        v = d.slice(1),
        m = t === y;
      return a && !m
        ? null
        : {
            path: r,
            url: "/" === r && "" === y ? "/" : y,
            isExact: m,
            params: h.reduce(function(t, e, n) {
              return (t[e.name] = v[n]), t;
            }, {})
          };
    },
    Et =
      Object.assign ||
      function(t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e];
          for (var o in n)
            Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
        }
        return t;
      };
  function Tt(t, e) {
    if (!t)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      );
    return !e || ("object" != typeof e && "function" != typeof e) ? t : e;
  }
  var Ct = function(t) {
      return 0 === e.Children.count(t);
    },
    St = (function(t) {
      function o() {
        var e, n;
        !(function(t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        })(this, o);
        for (var r = arguments.length, i = Array(r), a = 0; a < r; a++)
          i[a] = arguments[a];
        return (
          (e = n = Tt(this, t.call.apply(t, [this].concat(i)))),
          (n.state = { match: n.computeMatch(n.props, n.context.router) }),
          Tt(n, e)
        );
      }
      return (
        (function(t, e) {
          if ("function" != typeof e && null !== e)
            throw new TypeError(
              "Super expression must either be null or a function, not " +
                typeof e
            );
          (t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              enumerable: !1,
              writable: !0,
              configurable: !0
            }
          })),
            e &&
              (Object.setPrototypeOf
                ? Object.setPrototypeOf(t, e)
                : (t.__proto__ = e));
        })(o, t),
        (o.prototype.getChildContext = function() {
          return {
            router: Et({}, this.context.router, {
              route: {
                location:
                  this.props.location || this.context.router.route.location,
                match: this.state.match
              }
            })
          };
        }),
        (o.prototype.computeMatch = function(t, e) {
          var n = t.computedMatch,
            o = t.location,
            r = t.path,
            i = t.strict,
            a = t.exact,
            c = t.sensitive;
          if (n) return n;
          d(e, "You should not use <Route> or withRouter() outside a <Router>");
          var s = e.route,
            u = (o || s.location).pathname;
          return jt(u, { path: r, strict: i, exact: a, sensitive: c }, s.match);
        }),
        (o.prototype.componentWillMount = function() {
          n(
            !(this.props.component && this.props.render),
            "You should not use <Route component> and <Route render> in the same route; <Route render> will be ignored"
          ),
            n(
              !(
                this.props.component &&
                this.props.children &&
                !Ct(this.props.children)
              ),
              "You should not use <Route component> and <Route children> in the same route; <Route children> will be ignored"
            ),
            n(
              !(
                this.props.render &&
                this.props.children &&
                !Ct(this.props.children)
              ),
              "You should not use <Route render> and <Route children> in the same route; <Route children> will be ignored"
            );
        }),
        (o.prototype.componentWillReceiveProps = function(t, e) {
          n(
            !(t.location && !this.props.location),
            '<Route> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.'
          ),
            n(
              !(!t.location && this.props.location),
              '<Route> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.'
            ),
            this.setState({ match: this.computeMatch(t, e.router) });
        }),
        (o.prototype.render = function() {
          var t = this.state.match,
            n = this.props,
            o = n.children,
            r = n.component,
            i = n.render,
            a = this.context.router,
            c = a.history,
            s = a.route,
            u = a.staticContext,
            p = {
              match: t,
              location: this.props.location || s.location,
              history: c,
              staticContext: u
            };
          return r
            ? t
              ? e.createElement(r, p)
              : null
            : i
            ? t
              ? i(p)
              : null
            : "function" == typeof o
            ? o(p)
            : o && !Ct(o)
            ? e.Children.only(o)
            : null;
        }),
        o
      );
    })(e.Component);
  (St.propTypes = {
    computedMatch: h.object,
    path: h.string,
    exact: h.bool,
    strict: h.bool,
    sensitive: h.bool,
    component: h.func,
    render: h.func,
    children: h.oneOfType([h.func, h.node]),
    location: h.object
  }),
    (St.contextTypes = {
      router: h.shape({
        history: h.object.isRequired,
        route: h.object.isRequired,
        staticContext: h.object
      })
    }),
    (St.childContextTypes = { router: h.object.isRequired });
  var kt = function(t) {
    var n = t.to,
      o = t.exact,
      r = t.strict,
      i = t.location,
      a = t.activeClassName,
      c = t.className,
      s = t.activeStyle,
      u = t.style,
      p = t.isActive,
      l = t["aria-current"],
      f = X(t, [
        "to",
        "exact",
        "strict",
        "location",
        "activeClassName",
        "className",
        "activeStyle",
        "style",
        "isActive",
        "aria-current"
      ]),
      h = "object" === (void 0 === n ? "undefined" : J(n)) ? n.pathname : n,
      d = h && h.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
    return e.createElement(St, {
      path: d,
      exact: o,
      strict: r,
      location: i,
      children: function(t) {
        var o = t.location,
          r = t.match,
          i = !!(p ? p(r, o) : r);
        return e.createElement(
          ot,
          z(
            {
              to: n,
              className: i
                ? [c, a]
                    .filter(function(t) {
                      return t;
                    })
                    .join(" ")
                : c,
              style: i ? z({}, u, s) : u,
              "aria-current": (i && l) || null
            },
            f
          )
        );
      }
    });
  };
  kt.defaultProps = { activeClassName: "active", "aria-current": "page" };
  var At = (function(t) {
    function e() {
      return (
        (function(t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        })(this, e),
        (function(t, e) {
          if (!t)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          return !e || ("object" != typeof e && "function" != typeof e) ? t : e;
        })(this, t.apply(this, arguments))
      );
    }
    return (
      (function(t, e) {
        if ("function" != typeof e && null !== e)
          throw new TypeError(
            "Super expression must either be null or a function, not " +
              typeof e
          );
        (t.prototype = Object.create(e && e.prototype, {
          constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          e &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(t, e)
              : (t.__proto__ = e));
      })(e, t),
      (e.prototype.enable = function(t) {
        this.unblock && this.unblock(),
          (this.unblock = this.context.router.history.block(t));
      }),
      (e.prototype.disable = function() {
        this.unblock && (this.unblock(), (this.unblock = null));
      }),
      (e.prototype.componentWillMount = function() {
        d(
          this.context.router,
          "You should not use <Prompt> outside a <Router>"
        ),
          this.props.when && this.enable(this.props.message);
      }),
      (e.prototype.componentWillReceiveProps = function(t) {
        t.when
          ? (this.props.when && this.props.message === t.message) ||
            this.enable(t.message)
          : this.disable();
      }),
      (e.prototype.componentWillUnmount = function() {
        this.disable();
      }),
      (e.prototype.render = function() {
        return null;
      }),
      e
    );
  })(e.Component);
  (At.propTypes = {
    when: h.bool,
    message: h.oneOfType([h.func, h.string]).isRequired
  }),
    (At.defaultProps = { when: !0 }),
    (At.contextTypes = {
      router: h.shape({
        history: h.shape({ block: h.func.isRequired }).isRequired
      }).isRequired
    });
  var _t = {},
    Mt = 0,
    Lt = function() {
      var t =
          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "/",
        e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      return "/" === t
        ? t
        : (function(t) {
            var e = t,
              n = _t[e] || (_t[e] = {});
            if (n[t]) return n[t];
            var o = st.compile(t);
            return Mt < 1e4 && ((n[t] = o), Mt++), o;
          })(t)(e, { pretty: !0 });
    },
    qt =
      Object.assign ||
      function(t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e];
          for (var o in n)
            Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
        }
        return t;
      };
  var Ut = (function(t) {
    function e() {
      return (
        (function(t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        })(this, e),
        (function(t, e) {
          if (!t)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          return !e || ("object" != typeof e && "function" != typeof e) ? t : e;
        })(this, t.apply(this, arguments))
      );
    }
    return (
      (function(t, e) {
        if ("function" != typeof e && null !== e)
          throw new TypeError(
            "Super expression must either be null or a function, not " +
              typeof e
          );
        (t.prototype = Object.create(e && e.prototype, {
          constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          e &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(t, e)
              : (t.__proto__ = e));
      })(e, t),
      (e.prototype.isStatic = function() {
        return this.context.router && this.context.router.staticContext;
      }),
      (e.prototype.componentWillMount = function() {
        d(
          this.context.router,
          "You should not use <Redirect> outside a <Router>"
        ),
          this.isStatic() && this.perform();
      }),
      (e.prototype.componentDidMount = function() {
        this.isStatic() || this.perform();
      }),
      (e.prototype.componentDidUpdate = function(t) {
        var e = j(t.to),
          o = j(this.props.to);
        E(e, o)
          ? n(
              !1,
              "You tried to redirect to the same route you're currently on: \"" +
                o.pathname +
                o.search +
                '"'
            )
          : this.perform();
      }),
      (e.prototype.computeTo = function(t) {
        var e = t.computedMatch,
          n = t.to;
        return e
          ? "string" == typeof n
            ? Lt(n, e.params)
            : qt({}, n, { pathname: Lt(n.pathname, e.params) })
          : n;
      }),
      (e.prototype.perform = function() {
        var t = this.context.router.history,
          e = this.props.push,
          n = this.computeTo(this.props);
        e ? t.push(n) : t.replace(n);
      }),
      (e.prototype.render = function() {
        return null;
      }),
      e
    );
  })(e.Component);
  (Ut.propTypes = {
    computedMatch: h.object,
    push: h.bool,
    from: h.string,
    to: h.oneOfType([h.string, h.object]).isRequired
  }),
    (Ut.defaultProps = { push: !1 }),
    (Ut.contextTypes = {
      router: h.shape({
        history: h.shape({
          push: h.func.isRequired,
          replace: h.func.isRequired
        }).isRequired,
        staticContext: h.object
      }).isRequired
    });
  var Ht =
    Object.assign ||
    function(t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = arguments[e];
        for (var o in n)
          Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
      }
      return t;
    };
  function Yt(t, e) {
    if (!t)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      );
    return !e || ("object" != typeof e && "function" != typeof e) ? t : e;
  }
  var Wt = function(t) {
      return "/" === t.charAt(0) ? t : "/" + t;
    },
    It = function(t, e) {
      return t ? Ht({}, e, { pathname: Wt(t) + e.pathname }) : e;
    },
    Nt = function(t) {
      return "string" == typeof t ? t : R(t);
    },
    Bt = function(t) {
      return function() {
        d(!1, "You cannot %s with <StaticRouter>", t);
      };
    },
    Dt = function() {},
    $t = (function(t) {
      function o() {
        var e, n;
        !(function(t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        })(this, o);
        for (var r = arguments.length, i = Array(r), a = 0; a < r; a++)
          i[a] = arguments[a];
        return (
          (e = n = Yt(this, t.call.apply(t, [this].concat(i)))),
          (n.createHref = function(t) {
            return Wt(n.props.basename + Nt(t));
          }),
          (n.handlePush = function(t) {
            var e = n.props,
              o = e.basename,
              r = e.context;
            (r.action = "PUSH"),
              (r.location = It(o, j(t))),
              (r.url = Nt(r.location));
          }),
          (n.handleReplace = function(t) {
            var e = n.props,
              o = e.basename,
              r = e.context;
            (r.action = "REPLACE"),
              (r.location = It(o, j(t))),
              (r.url = Nt(r.location));
          }),
          (n.handleListen = function() {
            return Dt;
          }),
          (n.handleBlock = function() {
            return Dt;
          }),
          Yt(n, e)
        );
      }
      return (
        (function(t, e) {
          if ("function" != typeof e && null !== e)
            throw new TypeError(
              "Super expression must either be null or a function, not " +
                typeof e
            );
          (t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              enumerable: !1,
              writable: !0,
              configurable: !0
            }
          })),
            e &&
              (Object.setPrototypeOf
                ? Object.setPrototypeOf(t, e)
                : (t.__proto__ = e));
        })(o, t),
        (o.prototype.getChildContext = function() {
          return { router: { staticContext: this.props.context } };
        }),
        (o.prototype.componentWillMount = function() {
          n(
            !this.props.history,
            "<StaticRouter> ignores the history prop. To use a custom history, use `import { Router }` instead of `import { StaticRouter as Router }`."
          );
        }),
        (o.prototype.render = function() {
          var t = this.props,
            n = t.basename,
            o = (t.context, t.location),
            r = (function(t, e) {
              var n = {};
              for (var o in t)
                e.indexOf(o) >= 0 ||
                  (Object.prototype.hasOwnProperty.call(t, o) && (n[o] = t[o]));
              return n;
            })(t, ["basename", "context", "location"]),
            i = {
              createHref: this.createHref,
              action: "POP",
              location: (function(t, e) {
                if (!t) return e;
                var n = Wt(t);
                return 0 !== e.pathname.indexOf(n)
                  ? e
                  : Ht({}, e, { pathname: e.pathname.substr(n.length) });
              })(n, j(o)),
              push: this.handlePush,
              replace: this.handleReplace,
              go: Bt("go"),
              goBack: Bt("goBack"),
              goForward: Bt("goForward"),
              listen: this.handleListen,
              block: this.handleBlock
            };
          return e.createElement(V, Ht({}, r, { history: i }));
        }),
        o
      );
    })(e.Component);
  ($t.propTypes = {
    basename: h.string,
    context: h.object.isRequired,
    location: h.oneOfType([h.string, h.object])
  }),
    ($t.defaultProps = { basename: "", location: "/" }),
    ($t.childContextTypes = { router: h.object.isRequired });
  var Ft = (function(t) {
    function o() {
      return (
        (function(t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        })(this, o),
        (function(t, e) {
          if (!t)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          return !e || ("object" != typeof e && "function" != typeof e) ? t : e;
        })(this, t.apply(this, arguments))
      );
    }
    return (
      (function(t, e) {
        if ("function" != typeof e && null !== e)
          throw new TypeError(
            "Super expression must either be null or a function, not " +
              typeof e
          );
        (t.prototype = Object.create(e && e.prototype, {
          constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          e &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(t, e)
              : (t.__proto__ = e));
      })(o, t),
      (o.prototype.componentWillMount = function() {
        d(
          this.context.router,
          "You should not use <Switch> outside a <Router>"
        );
      }),
      (o.prototype.componentWillReceiveProps = function(t) {
        n(
          !(t.location && !this.props.location),
          '<Switch> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.'
        ),
          n(
            !(!t.location && this.props.location),
            '<Switch> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.'
          );
      }),
      (o.prototype.render = function() {
        var t = this.context.router.route,
          n = this.props.children,
          o = this.props.location || t.location,
          r = void 0,
          i = void 0;
        return (
          e.Children.forEach(n, function(n) {
            if (null == r && e.isValidElement(n)) {
              var a = n.props,
                c = a.path,
                s = a.exact,
                u = a.strict,
                p = a.sensitive,
                l = a.from,
                f = c || l;
              (i = n),
                (r = jt(
                  o.pathname,
                  { path: f, exact: s, strict: u, sensitive: p },
                  t.match
                ));
            }
          }),
          r ? e.cloneElement(i, { location: o, computedMatch: r }) : null
        );
      }),
      o
    );
  })(e.Component);
  (Ft.contextTypes = {
    router: h.shape({ route: h.object.isRequired }).isRequired
  }),
    (Ft.propTypes = { children: h.node, location: h.object });
  var Kt = o(function(t, e) {
      var n, o, r, i, a, c, s, u;
      t.exports = ((n = {
        childContextTypes: !0,
        contextTypes: !0,
        defaultProps: !0,
        displayName: !0,
        getDefaultProps: !0,
        getDerivedStateFromProps: !0,
        mixins: !0,
        propTypes: !0,
        type: !0
      }),
      (o = {
        name: !0,
        length: !0,
        prototype: !0,
        caller: !0,
        callee: !0,
        arguments: !0,
        arity: !0
      }),
      (r = Object.defineProperty),
      (i = Object.getOwnPropertyNames),
      (a = Object.getOwnPropertySymbols),
      (c = Object.getOwnPropertyDescriptor),
      (s = Object.getPrototypeOf),
      (u = s && s(Object)),
      function t(e, p, l) {
        if ("string" != typeof p) {
          if (u) {
            var f = s(p);
            f && f !== u && t(e, f, l);
          }
          var h = i(p);
          a && (h = h.concat(a(p)));
          for (var d = 0; d < h.length; ++d) {
            var y = h[d];
            if (!(n[y] || o[y] || (l && l[y]))) {
              var v = c(p, y);
              try {
                r(e, y, v);
              } catch (t) {}
            }
          }
          return e;
        }
        return e;
      });
    }),
    Vt =
      Object.assign ||
      function(t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e];
          for (var o in n)
            Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
        }
        return t;
      };
  (t.BrowserRouter = tt),
    (t.HashRouter = et),
    (t.Link = ot),
    (t.MemoryRouter = it),
    (t.NavLink = kt),
    (t.Prompt = At),
    (t.Redirect = Ut),
    (t.Route = St),
    (t.Router = V),
    (t.StaticRouter = $t),
    (t.Switch = Ft),
    (t.generatePath = Lt),
    (t.matchPath = jt),
    (t.withRouter = function(t) {
      var n = function(n) {
        var o = n.wrappedComponentRef,
          r = (function(t, e) {
            var n = {};
            for (var o in t)
              e.indexOf(o) >= 0 ||
                (Object.prototype.hasOwnProperty.call(t, o) && (n[o] = t[o]));
            return n;
          })(n, ["wrappedComponentRef"]);
        return e.createElement(St, {
          children: function(n) {
            return e.createElement(t, Vt({}, r, n, { ref: o }));
          }
        });
      };
      return (
        (n.displayName = "withRouter(" + (t.displayName || t.name) + ")"),
        (n.WrappedComponent = t),
        (n.propTypes = { wrappedComponentRef: h.func }),
        Kt(n, t)
      );
    }),
    Object.defineProperty(t, "__esModule", { value: !0 });
});
