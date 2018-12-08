/** @license React v16.7.0-alpha.2
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
"use strict";
(function(P, q) {
  "object" === typeof exports && "undefined" !== typeof module
    ? (module.exports = q())
    : "function" === typeof define && define.amd
    ? define(q)
    : (P.React = q());
})(this, function() {
  function P(a, b, d, f, n, g, c, h) {
    if (!a) {
      a = void 0;
      if (void 0 === b)
        a = Error(
          "Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings."
        );
      else {
        var e = [d, f, n, g, c, h],
          ua = 0;
        a = Error(
          b.replace(/%s/g, function() {
            return e[ua++];
          })
        );
        a.name = "Invariant Violation";
      }
      a.framesToPop = 1;
      throw a;
    }
  }
  function q(a) {
    for (
      var b = arguments.length - 1,
        d = "https://reactjs.org/docs/error-decoder.html?invariant=" + a,
        f = 0;
      f < b;
      f++
    )
      d += "&args[]=" + encodeURIComponent(arguments[f + 1]);
    P(
      !1,
      "Minified React error #" +
        a +
        "; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ",
      d
    );
  }
  function t(a, b, d) {
    this.props = a;
    this.context = b;
    this.refs = da;
    this.updater = d || ea;
  }
  function fa() {}
  function Q(a, b, d) {
    this.props = a;
    this.context = b;
    this.refs = da;
    this.updater = d || ea;
  }
  function w() {
    if (!x) {
      var a = c.expirationTime;
      E ? R() : (E = !0);
      F(va, a);
    }
  }
  function S() {
    var a = c,
      b = c.next;
    if (c === b) c = null;
    else {
      var d = c.previous;
      c = d.next = b;
      b.previous = d;
    }
    a.next = a.previous = null;
    d = a.callback;
    b = a.expirationTime;
    a = a.priorityLevel;
    var f = l,
      n = G;
    l = a;
    G = b;
    try {
      var g = d();
    } finally {
      (l = f), (G = n);
    }
    if ("function" === typeof g)
      if (
        ((g = {
          callback: g,
          priorityLevel: a,
          expirationTime: b,
          next: null,
          previous: null
        }),
        null === c)
      )
        c = g.next = g.previous = g;
      else {
        d = null;
        a = c;
        do {
          if (a.expirationTime >= b) {
            d = a;
            break;
          }
          a = a.next;
        } while (a !== c);
        null === d ? (d = c) : d === c && ((c = g), w());
        b = d.previous;
        b.next = d.previous = g;
        g.next = d;
        g.previous = b;
      }
  }
  function T() {
    if (-1 === r && null !== c && 1 === c.priorityLevel) {
      x = !0;
      try {
        do S();
        while (null !== c && 1 === c.priorityLevel);
      } finally {
        (x = !1), null !== c ? w() : (E = !1);
      }
    }
  }
  function va(a) {
    x = !0;
    var b = H;
    H = a;
    try {
      if (a)
        for (; null !== c; ) {
          var d = m();
          if (c.expirationTime <= d) {
            do S();
            while (null !== c && c.expirationTime <= d);
          } else break;
        }
      else if (null !== c) {
        do S();
        while (null !== c && !I());
      }
    } finally {
      (x = !1), (H = b), null !== c ? w() : (E = !1), T();
    }
  }
  function ha(a, b, d) {
    var f = void 0,
      n = {},
      c = null,
      e = null;
    if (null != b)
      for (f in (void 0 !== b.ref && (e = b.ref),
      void 0 !== b.key && (c = "" + b.key),
      b))
        ia.call(b, f) && !ja.hasOwnProperty(f) && (n[f] = b[f]);
    var h = arguments.length - 2;
    if (1 === h) n.children = d;
    else if (1 < h) {
      for (var k = Array(h), l = 0; l < h; l++) k[l] = arguments[l + 2];
      n.children = k;
    }
    if (a && a.defaultProps)
      for (f in ((h = a.defaultProps), h)) void 0 === n[f] && (n[f] = h[f]);
    return {
      $$typeof: y,
      type: a,
      key: c,
      ref: e,
      props: n,
      _owner: J.current
    };
  }
  function wa(a, b) {
    return {
      $$typeof: y,
      type: a.type,
      key: b,
      ref: a.ref,
      props: a.props,
      _owner: a._owner
    };
  }
  function U(a) {
    return "object" === typeof a && null !== a && a.$$typeof === y;
  }
  function xa(a) {
    var b = { "=": "=0", ":": "=2" };
    return (
      "$" +
      ("" + a).replace(/[=:]/g, function(a) {
        return b[a];
      })
    );
  }
  function ka(a, b, d, f) {
    if (K.length) {
      var c = K.pop();
      c.result = a;
      c.keyPrefix = b;
      c.func = d;
      c.context = f;
      c.count = 0;
      return c;
    }
    return { result: a, keyPrefix: b, func: d, context: f, count: 0 };
  }
  function la(a) {
    a.result = null;
    a.keyPrefix = null;
    a.func = null;
    a.context = null;
    a.count = 0;
    10 > K.length && K.push(a);
  }
  function V(a, b, d, f) {
    var c = typeof a;
    if ("undefined" === c || "boolean" === c) a = null;
    var g = !1;
    if (null === a) g = !0;
    else
      switch (c) {
        case "string":
        case "number":
          g = !0;
          break;
        case "object":
          switch (a.$$typeof) {
            case y:
            case ya:
              g = !0;
          }
      }
    if (g) return d(f, a, "" === b ? "." + W(a, 0) : b), 1;
    g = 0;
    b = "" === b ? "." : b + ":";
    if (Array.isArray(a))
      for (var e = 0; e < a.length; e++) {
        c = a[e];
        var h = b + W(c, e);
        g += V(c, h, d, f);
      }
    else if (
      (null === a || "object" !== typeof a
        ? (h = null)
        : ((h = (ma && a[ma]) || a["@@iterator"]),
          (h = "function" === typeof h ? h : null)),
      "function" === typeof h)
    )
      for (a = h.call(a), e = 0; !(c = a.next()).done; )
        (c = c.value), (h = b + W(c, e++)), (g += V(c, h, d, f));
    else
      "object" === c &&
        ((d = "" + a),
        q(
          "31",
          "[object Object]" === d
            ? "object with keys {" + Object.keys(a).join(", ") + "}"
            : d,
          ""
        ));
    return g;
  }
  function X(a, b, d) {
    return null == a ? 0 : V(a, "", b, d);
  }
  function W(a, b) {
    return "object" === typeof a && null !== a && null != a.key
      ? xa(a.key)
      : b.toString(36);
  }
  function za(a, b, d) {
    a.func.call(a.context, b, a.count++);
  }
  function Aa(a, b, d) {
    var f = a.result,
      c = a.keyPrefix;
    a = a.func.call(a.context, b, a.count++);
    Array.isArray(a)
      ? Y(a, f, d, function(a) {
          return a;
        })
      : null != a &&
        (U(a) &&
          (a = wa(
            a,
            c +
              (!a.key || (b && b.key === a.key)
                ? ""
                : ("" + a.key).replace(na, "$&/") + "/") +
              d
          )),
        f.push(a));
  }
  function Y(a, b, d, f, c) {
    var e = "";
    null != d && (e = ("" + d).replace(na, "$&/") + "/");
    b = ka(b, e, f, c);
    X(a, Aa, b);
    la(b);
  }
  function p() {
    var a = J.currentDispatcher;
    null === a ? q("298") : void 0;
    return a;
  }
  var e = "function" === typeof Symbol && Symbol.for,
    y = e ? Symbol.for("react.element") : 60103,
    ya = e ? Symbol.for("react.portal") : 60106,
    k = e ? Symbol.for("react.fragment") : 60107,
    Ba = e ? Symbol.for("react.strict_mode") : 60108,
    u = e ? Symbol.for("react.profiler") : 60114,
    Ca = e ? Symbol.for("react.provider") : 60109,
    Da = e ? Symbol.for("react.context") : 60110,
    Ea = e ? Symbol.for("react.concurrent_mode") : 60111,
    Fa = e ? Symbol.for("react.forward_ref") : 60112,
    Ga = e ? Symbol.for("react.suspense") : 60113,
    Ha = e ? Symbol.for("react.memo") : 60115,
    Ia = e ? Symbol.for("react.lazy") : 60116,
    ma = "function" === typeof Symbol && Symbol.iterator,
    oa = Object.getOwnPropertySymbols,
    Ja = Object.prototype.hasOwnProperty,
    Ka = Object.prototype.propertyIsEnumerable,
    L = (function() {
      try {
        if (!Object.assign) return !1;
        var a = new String("abc");
        a[5] = "de";
        if ("5" === Object.getOwnPropertyNames(a)[0]) return !1;
        var b = {};
        for (a = 0; 10 > a; a++) b["_" + String.fromCharCode(a)] = a;
        if (
          "0123456789" !==
          Object.getOwnPropertyNames(b)
            .map(function(a) {
              return b[a];
            })
            .join("")
        )
          return !1;
        var d = {};
        "abcdefghijklmnopqrst".split("").forEach(function(a) {
          d[a] = a;
        });
        return "abcdefghijklmnopqrst" !==
          Object.keys(Object.assign({}, d)).join("")
          ? !1
          : !0;
      } catch (f) {
        return !1;
      }
    })()
      ? Object.assign
      : function(a, b) {
          if (null === a || void 0 === a)
            throw new TypeError(
              "Object.assign cannot be called with null or undefined"
            );
          var d = Object(a);
          for (var c, e = 1; e < arguments.length; e++) {
            var g = Object(arguments[e]);
            for (var k in g) Ja.call(g, k) && (d[k] = g[k]);
            if (oa) {
              c = oa(g);
              for (var h = 0; h < c.length; h++)
                Ka.call(g, c[h]) && (d[c[h]] = g[c[h]]);
            }
          }
          return d;
        },
    ea = {
      isMounted: function(a) {
        return !1;
      },
      enqueueForceUpdate: function(a, b, d) {},
      enqueueReplaceState: function(a, b, d, c) {},
      enqueueSetState: function(a, b, d, c) {}
    },
    da = {};
  t.prototype.isReactComponent = {};
  t.prototype.setState = function(a, b) {
    "object" !== typeof a && "function" !== typeof a && null != a
      ? q("85")
      : void 0;
    this.updater.enqueueSetState(this, a, b, "setState");
  };
  t.prototype.forceUpdate = function(a) {
    this.updater.enqueueForceUpdate(this, a, "forceUpdate");
  };
  fa.prototype = t.prototype;
  e = Q.prototype = new fa();
  e.constructor = Q;
  L(e, t.prototype);
  e.isPureReactComponent = !0;
  var c = null,
    H = !1,
    l = 3,
    r = -1,
    G = -1,
    x = !1,
    E = !1,
    La = Date,
    Ma = "function" === typeof setTimeout ? setTimeout : void 0,
    Na = "function" === typeof clearTimeout ? clearTimeout : void 0,
    pa =
      "function" === typeof requestAnimationFrame
        ? requestAnimationFrame
        : void 0,
    qa =
      "function" === typeof cancelAnimationFrame
        ? cancelAnimationFrame
        : void 0,
    ra,
    sa,
    Z = function(a) {
      ra = pa(function(b) {
        Na(sa);
        a(b);
      });
      sa = Ma(function() {
        qa(ra);
        a(m());
      }, 100);
    };
  if (
    "object" === typeof performance &&
    "function" === typeof performance.now
  ) {
    var Oa = performance;
    var m = function() {
      return Oa.now();
    };
  } else
    m = function() {
      return La.now();
    };
  if ("undefined" !== typeof window && window._schedMock) {
    e = window._schedMock;
    var F = e[0];
    var R = e[1];
    var I = e[2];
  } else if (
    "undefined" === typeof window ||
    "function" !== typeof window.addEventListener
  ) {
    var z = null,
      A = -1,
      ta = function(a, b) {
        if (null !== z) {
          var d = z;
          z = null;
          try {
            (A = b), d(a);
          } finally {
            A = -1;
          }
        }
      };
    F = function(a, b) {
      -1 !== A
        ? setTimeout(F, 0, a, b)
        : ((z = a),
          setTimeout(ta, b, !0, b),
          setTimeout(ta, 1073741823, !1, 1073741823));
    };
    R = function() {
      z = null;
    };
    I = function() {
      return !1;
    };
    m = function() {
      return -1 === A ? 0 : A;
    };
  } else {
    "undefined" !== typeof console &&
      ("function" !== typeof pa &&
        console.error(
          "This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"
        ),
      "function" !== typeof qa &&
        console.error(
          "This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"
        ));
    var v = null,
      M = !1,
      B = -1,
      C = !1,
      aa = !1,
      N = 0,
      O = 33,
      D = 33;
    I = function() {
      return N <= m();
    };
    var ba =
      "__reactIdleCallback$" +
      Math.random()
        .toString(36)
        .slice(2);
    window.addEventListener(
      "message",
      function(a) {
        if (a.source === window && a.data === ba) {
          M = !1;
          a = v;
          var b = B;
          v = null;
          B = -1;
          var d = m(),
            c = !1;
          if (0 >= N - d)
            if (-1 !== b && b <= d) c = !0;
            else {
              C || ((C = !0), Z(ca));
              v = a;
              B = b;
              return;
            }
          if (null !== a) {
            aa = !0;
            try {
              a(c);
            } finally {
              aa = !1;
            }
          }
        }
      },
      !1
    );
    var ca = function(a) {
      if (null !== v) {
        Z(ca);
        var b = a - N + D;
        b < D && O < D ? (8 > b && (b = 8), (D = b < O ? O : b)) : (O = b);
        N = a + D;
        M || ((M = !0), window.postMessage(ba, "*"));
      } else C = !1;
    };
    F = function(a, b) {
      v = a;
      B = b;
      aa || 0 > b ? window.postMessage(ba, "*") : C || ((C = !0), Z(ca));
    };
    R = function() {
      v = null;
      M = !1;
      B = -1;
    };
  }
  var Pa = 0,
    J = { current: null, currentDispatcher: null };
  e = { ReactCurrentOwner: J, assign: L };
  L(e, {
    Scheduler: {
      unstable_cancelCallback: function(a) {
        var b = a.next;
        if (null !== b) {
          if (b === a) c = null;
          else {
            a === c && (c = b);
            var d = a.previous;
            d.next = b;
            b.previous = d;
          }
          a.next = a.previous = null;
        }
      },
      unstable_shouldYield: function() {
        return !H && ((null !== c && c.expirationTime < G) || I());
      },
      unstable_now: m,
      unstable_scheduleCallback: function(a, b) {
        var d = -1 !== r ? r : m();
        if (
          "object" === typeof b &&
          null !== b &&
          "number" === typeof b.timeout
        )
          b = d + b.timeout;
        else
          switch (l) {
            case 1:
              b = d + -1;
              break;
            case 2:
              b = d + 250;
              break;
            case 5:
              b = d + 1073741823;
              break;
            case 4:
              b = d + 1e4;
              break;
            default:
              b = d + 5e3;
          }
        a = {
          callback: a,
          priorityLevel: l,
          expirationTime: b,
          next: null,
          previous: null
        };
        if (null === c) (c = a.next = a.previous = a), w();
        else {
          d = null;
          var f = c;
          do {
            if (f.expirationTime > b) {
              d = f;
              break;
            }
            f = f.next;
          } while (f !== c);
          null === d ? (d = c) : d === c && ((c = a), w());
          b = d.previous;
          b.next = d.previous = a;
          a.next = d;
          a.previous = b;
        }
        return a;
      },
      unstable_runWithPriority: function(a, b) {
        switch (a) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            a = 3;
        }
        var d = l,
          c = r;
        l = a;
        r = m();
        try {
          return b();
        } finally {
          (l = d), (r = c), T();
        }
      },
      unstable_wrapCallback: function(a) {
        var b = l;
        return function() {
          var d = l,
            c = r;
          l = b;
          r = m();
          try {
            return a.apply(this, arguments);
          } finally {
            (l = d), (r = c), T();
          }
        };
      },
      unstable_getCurrentPriorityLevel: function() {
        return l;
      }
    },
    SchedulerTracing: {
      __interactionsRef: null,
      __subscriberRef: null,
      unstable_clear: function(a) {
        return a();
      },
      unstable_getCurrent: function() {
        return null;
      },
      unstable_getThreadID: function() {
        return ++Pa;
      },
      unstable_subscribe: function(a) {},
      unstable_trace: function(a, b, d) {
        return d();
      },
      unstable_unsubscribe: function(a) {},
      unstable_wrap: function(a) {
        return a;
      }
    }
  });
  var ia = Object.prototype.hasOwnProperty,
    ja = { key: !0, ref: !0, __self: !0, __source: !0 },
    na = /\/+/g,
    K = [];
  k = {
    Children: {
      map: function(a, b, d) {
        if (null == a) return a;
        var c = [];
        Y(a, c, null, b, d);
        return c;
      },
      forEach: function(a, b, d) {
        if (null == a) return a;
        b = ka(null, null, b, d);
        X(a, za, b);
        la(b);
      },
      count: function(a) {
        return X(
          a,
          function() {
            return null;
          },
          null
        );
      },
      toArray: function(a) {
        var b = [];
        Y(a, b, null, function(a) {
          return a;
        });
        return b;
      },
      only: function(a) {
        U(a) ? void 0 : q("143");
        return a;
      }
    },
    createRef: function() {
      return { current: null };
    },
    Component: t,
    PureComponent: Q,
    createContext: function(a, b) {
      void 0 === b && (b = null);
      a = {
        $$typeof: Da,
        _calculateChangedBits: b,
        _currentValue: a,
        _currentValue2: a,
        _threadCount: 0,
        Provider: null,
        Consumer: null
      };
      a.Provider = { $$typeof: Ca, _context: a };
      return (a.Consumer = a);
    },
    forwardRef: function(a) {
      return { $$typeof: Fa, render: a };
    },
    lazy: function(a) {
      return { $$typeof: Ia, _ctor: a, _status: -1, _result: null };
    },
    memo: function(a, b) {
      return { $$typeof: Ha, type: a, compare: void 0 === b ? null : b };
    },
    Fragment: k,
    StrictMode: Ba,
    Suspense: Ga,
    createElement: ha,
    cloneElement: function(a, b, d) {
      null === a || void 0 === a ? q("267", a) : void 0;
      var c = void 0,
        e = L({}, a.props),
        g = a.key,
        k = a.ref,
        h = a._owner;
      if (null != b) {
        void 0 !== b.ref && ((k = b.ref), (h = J.current));
        void 0 !== b.key && (g = "" + b.key);
        var l = void 0;
        a.type && a.type.defaultProps && (l = a.type.defaultProps);
        for (c in b)
          ia.call(b, c) &&
            !ja.hasOwnProperty(c) &&
            (e[c] = void 0 === b[c] && void 0 !== l ? l[c] : b[c]);
      }
      c = arguments.length - 2;
      if (1 === c) e.children = d;
      else if (1 < c) {
        l = Array(c);
        for (var m = 0; m < c; m++) l[m] = arguments[m + 2];
        e.children = l;
      }
      return { $$typeof: y, type: a.type, key: g, ref: k, props: e, _owner: h };
    },
    createFactory: function(a) {
      var b = ha.bind(null, a);
      b.type = a;
      return b;
    },
    isValidElement: U,
    version: "16.7.0-alpha.2",
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: e
  };
  k.ConcurrentMode = Ea;
  k.Profiler = u;
  k.useCallback = function(a, b) {
    return p().useCallback(a, b);
  };
  k.useContext = function(a, b) {
    return p().useContext(a, b);
  };
  k.useEffect = function(a, b) {
    return p().useEffect(a, b);
  };
  k.useImperativeMethods = function(a, b, c) {
    return p().useImperativeMethods(a, b, c);
  };
  k.useLayoutEffect = function(a, b) {
    return p().useLayoutEffect(a, b);
  };
  k.useMemo = function(a, b) {
    return p().useMemo(a, b);
  };
  k.useMutationEffect = function(a, b) {
    return p().useMutationEffect(a, b);
  };
  k.useReducer = function(a, b, c) {
    return p().useReducer(a, b, c);
  };
  k.useRef = function(a) {
    return p().useRef(a);
  };
  k.useState = function(a) {
    return p().useState(a);
  };
  u = ((u = { default: k }), k) || u;
  return u.default || u;
});
