﻿define(function (require, exports, module) {
   return function (a, b, c, d) {
        "use strict";
        function e(a, b, c) {
            return setTimeout(k(a, c), b);
        }
        function f(a, b, c) {
            return Array.isArray(a) ? (g(a, c[b], c), !0) : !1;
        }
        function g(a, b, c) {
            var e;
            if (a) if (a.forEach) a.forEach(b, c); else if (a.length !== d) for (e = 0; e < a.length; ) b.call(c, a[e], e, a), 
            e++; else for (e in a) a.hasOwnProperty(e) && b.call(c, a[e], e, a);
        }
        function h(a, b, c) {
            for (var e = Object.keys(b), f = 0; f < e.length; ) (!c || c && a[e[f]] === d) && (a[e[f]] = b[e[f]]), 
            f++;
            return a;
        }
        function i(a, b) {
            return h(a, b, !0);
        }
        function j(a, b, c) {
            var d, e = b.prototype;
            d = a.prototype = Object.create(e), d.constructor = a, d._super = e, c && h(d, c);
        }
        function k(a, b) {
            return function() {
                return a.apply(b, arguments);
            };
        }
        function l(a, b) {
            return typeof a == ka ? a.apply(b ? b[0] || d : d, b) : a;
        }
        function m(a, b) {
            return a === d ? b : a;
        }
        function n(a, b, c) {
            g(r(b), function(b) {
                a.addEventListener(b, c, !1);
            });
        }
        function o(a, b, c) {
            g(r(b), function(b) {
                a.removeEventListener(b, c, !1);
            });
        }
        function p(a, b) {
            for (;a; ) {
                if (a == b) return !0;
                a = a.parentNode;
            }
            return !1;
        }
        function q(a, b) {
            return a.indexOf(b) > -1;
        }
        function r(a) {
            return a.trim().split(/\s+/g);
        }
        function s(a, b, c) {
            if (a.indexOf && !c) return a.indexOf(b);
            for (var d = 0; d < a.length; ) {
                if (c && a[d][c] == b || !c && a[d] === b) return d;
                d++;
            }
            return -1;
        }
        function t(a) {
            return Array.prototype.slice.call(a, 0);
        }
        function u(a, b, c) {
            for (var d = [], e = [], f = 0; f < a.length; ) {
                var g = b ? a[f][b] : a[f];
                s(e, g) < 0 && d.push(a[f]), e[f] = g, f++;
            }
            return c && (d = b ? d.sort(function(a, c) {
                return a[b] > c[b];
            }) : d.sort()), d;
        }
        function v(a, b) {
            for (var c, e, f = b[0].toUpperCase() + b.slice(1), g = 0; g < ia.length; ) {
                if (c = ia[g], e = c ? c + f : b, e in a) return e;
                g++;
            }
            return d;
        }
        function w() {
            return oa++;
        }
        function x(a) {
            var b = a.ownerDocument;
            return b.defaultView || b.parentWindow;
        }
        function y(a, b) {
            var c = this;
            this.manager = a, this.callback = b, this.element = a.element, this.target = a.options.inputTarget, 
            this.domHandler = function(b) {
                l(a.options.enable, [ a ]) && c.handler(b);
            }, this.init();
        }
        function z(a) {
            var b, c = a.options.inputClass;
            return new (b = c ? c : ra ? N : sa ? Q : qa ? S : M)(a, A);
        }
        function A(a, b, c) {
            var d = c.pointers.length, e = c.changedPointers.length, f = b & ya && 0 === d - e, g = b & (Aa | Ba) && 0 === d - e;
            c.isFirst = !!f, c.isFinal = !!g, f && (a.session = {}), c.eventType = b, B(a, c), 
            a.emit("hammer.input", c), a.recognize(c), a.session.prevInput = c;
        }
        function B(a, b) {
            var c = a.session, d = b.pointers, e = d.length;
            c.firstInput || (c.firstInput = E(b)), e > 1 && !c.firstMultiple ? c.firstMultiple = E(b) : 1 === e && (c.firstMultiple = !1);
            var f = c.firstInput, g = c.firstMultiple, h = g ? g.center : f.center, i = b.center = F(d);
            b.timeStamp = na(), b.deltaTime = b.timeStamp - f.timeStamp, b.angle = J(h, i), 
            b.distance = I(h, i), C(c, b), b.offsetDirection = H(b.deltaX, b.deltaY), b.scale = g ? L(g.pointers, d) : 1, 
            b.rotation = g ? K(g.pointers, d) : 0, D(c, b);
            var j = a.element;
            p(b.srcEvent.target, j) && (j = b.srcEvent.target), b.target = j;
        }
        function C(a, b) {
            var c = b.center, d = a.offsetDelta || {}, e = a.prevDelta || {}, f = a.prevInput || {};
            (b.eventType === ya || f.eventType === Aa) && (e = a.prevDelta = {
                x: f.deltaX || 0,
                y: f.deltaY || 0
            }, d = a.offsetDelta = {
                x: c.x,
                y: c.y
            }), b.deltaX = e.x + (c.x - d.x), b.deltaY = e.y + (c.y - d.y);
        }
        function D(a, b) {
            var c, e, f, g, h = a.lastInterval || b, i = b.timeStamp - h.timeStamp;
            if (b.eventType != Ba && (i > xa || h.velocity === d)) {
                var j = h.deltaX - b.deltaX, k = h.deltaY - b.deltaY, l = G(i, j, k);
                e = l.x, f = l.y, c = ma(l.x) > ma(l.y) ? l.x : l.y, g = H(j, k), a.lastInterval = b;
            } else c = h.velocity, e = h.velocityX, f = h.velocityY, g = h.direction;
            b.velocity = c, b.velocityX = e, b.velocityY = f, b.direction = g;
        }
        function E(a) {
            for (var b = [], c = 0; c < a.pointers.length; ) b[c] = {
                clientX: la(a.pointers[c].clientX),
                clientY: la(a.pointers[c].clientY)
            }, c++;
            return {
                timeStamp: na(),
                pointers: b,
                center: F(b),
                deltaX: a.deltaX,
                deltaY: a.deltaY
            };
        }
        function F(a) {
            var b = a.length;
            if (1 === b) return {
                x: la(a[0].clientX),
                y: la(a[0].clientY)
            };
            for (var c = 0, d = 0, e = 0; b > e; ) c += a[e].clientX, d += a[e].clientY, e++;
            return {
                x: la(c / b),
                y: la(d / b)
            };
        }
        function G(a, b, c) {
            return {
                x: b / a || 0,
                y: c / a || 0
            };
        }
        function H(a, b) {
            return a === b ? Ca : ma(a) >= ma(b) ? a > 0 ? Da : Ea : b > 0 ? Fa : Ga;
        }
        function I(a, b, c) {
            c || (c = Ka);
            var d = b[c[0]] - a[c[0]], e = b[c[1]] - a[c[1]];
            return Math.sqrt(d * d + e * e);
        }
        function J(a, b, c) {
            c || (c = Ka);
            var d = b[c[0]] - a[c[0]], e = b[c[1]] - a[c[1]];
            return 180 * Math.atan2(e, d) / Math.PI;
        }
        function K(a, b) {
            return J(b[1], b[0], La) - J(a[1], a[0], La);
        }
        function L(a, b) {
            return I(b[0], b[1], La) / I(a[0], a[1], La);
        }
        function M() {
            this.evEl = Na, this.evWin = Oa, this.allow = !0, this.pressed = !1, y.apply(this, arguments);
        }
        function N() {
            this.evEl = Ra, this.evWin = Sa, y.apply(this, arguments), this.store = this.manager.session.pointerEvents = [];
        }
        function O() {
            this.evTarget = Ua, this.evWin = Va, this.started = !1, y.apply(this, arguments);
        }
        function P(a, b) {
            var c = t(a.touches), d = t(a.changedTouches);
            return b & (Aa | Ba) && (c = u(c.concat(d), "identifier", !0)), [ c, d ];
        }
        function Q() {
            this.evTarget = Xa, this.targetIds = {}, y.apply(this, arguments);
        }
        function R(a, b) {
            var c = t(a.touches), d = this.targetIds;
            if (b & (ya | za) && 1 === c.length) return d[c[0].identifier] = !0, [ c, c ];
            var e, f, g = t(a.changedTouches), h = [], i = this.target;
            if (f = c.filter(function(a) {
                return p(a.target, i);
            }), b === ya) for (e = 0; e < f.length; ) d[f[e].identifier] = !0, e++;
            for (e = 0; e < g.length; ) d[g[e].identifier] && h.push(g[e]), b & (Aa | Ba) && delete d[g[e].identifier], 
            e++;
            return h.length ? [ u(f.concat(h), "identifier", !0), h ] : void 0;
        }
        function S() {
            y.apply(this, arguments);
            var a = k(this.handler, this);
            this.touch = new Q(this.manager, a), this.mouse = new M(this.manager, a);
        }
        function T(a, b) {
            this.manager = a, this.set(b);
        }
        function U(a) {
            if (q(a, bb)) return bb;
            var b = q(a, cb), c = q(a, db);
            return b && c ? cb + " " + db : b || c ? b ? cb : db : q(a, ab) ? ab : _a;
        }
        function V(a) {
            this.id = w(), this.manager = null, this.options = i(a || {}, this.defaults), this.options.enable = m(this.options.enable, !0), 
            this.state = eb, this.simultaneous = {}, this.requireFail = [];
        }
        function W(a) {
            return a & jb ? "cancel" : a & hb ? "end" : a & gb ? "move" : a & fb ? "start" : "";
        }
        function X(a) {
            return a == Ga ? "down" : a == Fa ? "up" : a == Da ? "left" : a == Ea ? "right" : "";
        }
        function Y(a, b) {
            var c = b.manager;
            return c ? c.get(a) : a;
        }
        function Z() {
            V.apply(this, arguments);
        }
        function $() {
            Z.apply(this, arguments), this.pX = null, this.pY = null;
        }
        function _() {
            Z.apply(this, arguments);
        }
        function aa() {
            V.apply(this, arguments), this._timer = null, this._input = null;
        }
        function ba() {
            Z.apply(this, arguments);
        }
        function ca() {
            Z.apply(this, arguments);
        }
        function da() {
            V.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, 
            this._input = null, this.count = 0;
        }
        function ea(a, b) {
            return b = b || {}, b.recognizers = m(b.recognizers, ea.defaults.preset), new fa(a, b);
        }
        function fa(a, b) {
            b = b || {}, this.options = i(b, ea.defaults), this.options.inputTarget = this.options.inputTarget || a, 
            this.handlers = {}, this.session = {}, this.recognizers = [], this.element = a, 
            this.input = z(this), this.touchAction = new T(this, this.options.touchAction), 
            ga(this, !0), g(b.recognizers, function(a) {
                var b = this.add(new a[0](a[1]));
                a[2] && b.recognizeWith(a[2]), a[3] && b.requireFailure(a[3]);
            }, this);
        }
        function ga(a, b) {
            var c = a.element;
            g(a.options.cssProps, function(a, d) {
                c.style[v(c.style, d)] = b ? a : "";
            });
        }
        function ha(a, c) {
            var d = b.createEvent("Event");
            d.initEvent(a, !0, !0), d.gesture = c, c.target.dispatchEvent(d);
        }
        var ia = [ "", "webkit", "moz", "MS", "ms", "o" ], ja = b.createElement("div"), ka = "function", la = Math.round, ma = Math.abs, na = Date.now, oa = 1, pa = /mobile|tablet|ip(ad|hone|od)|android/i, qa = "ontouchstart" in a, ra = v(a, "PointerEvent") !== d, sa = qa && pa.test(navigator.userAgent), ta = "touch", ua = "pen", va = "mouse", wa = "kinect", xa = 25, ya = 1, za = 2, Aa = 4, Ba = 8, Ca = 1, Da = 2, Ea = 4, Fa = 8, Ga = 16, Ha = Da | Ea, Ia = Fa | Ga, Ja = Ha | Ia, Ka = [ "x", "y" ], La = [ "clientX", "clientY" ];
        y.prototype = {
            handler: function() {},
            init: function() {
                this.evEl && n(this.element, this.evEl, this.domHandler), this.evTarget && n(this.target, this.evTarget, this.domHandler), 
                this.evWin && n(x(this.element), this.evWin, this.domHandler);
            },
            destroy: function() {
                this.evEl && o(this.element, this.evEl, this.domHandler), this.evTarget && o(this.target, this.evTarget, this.domHandler), 
                this.evWin && o(x(this.element), this.evWin, this.domHandler);
            }
        };
        var Ma = {
            mousedown: ya,
            mousemove: za,
            mouseup: Aa
        }, Na = "mousedown", Oa = "mousemove mouseup";
        j(M, y, {
            handler: function(a) {
                var b = Ma[a.type];
                b & ya && 0 === a.button && (this.pressed = !0), b & za && 1 !== a.which && (b = Aa), 
                this.pressed && this.allow && (b & Aa && (this.pressed = !1), this.callback(this.manager, b, {
                    pointers: [ a ],
                    changedPointers: [ a ],
                    pointerType: va,
                    srcEvent: a
                }));
            }
        });
        var Pa = {
            pointerdown: ya,
            pointermove: za,
            pointerup: Aa,
            pointercancel: Ba,
            pointerout: Ba
        }, Qa = {
            2: ta,
            3: ua,
            4: va,
            5: wa
        }, Ra = "pointerdown", Sa = "pointermove pointerup pointercancel";
        a.MSPointerEvent && (Ra = "MSPointerDown", Sa = "MSPointerMove MSPointerUp MSPointerCancel"), 
        j(N, y, {
            handler: function(a) {
                var b = this.store, c = !1, d = a.type.toLowerCase().replace("ms", ""), e = Pa[d], f = Qa[a.pointerType] || a.pointerType, g = f == ta, h = s(b, a.pointerId, "pointerId");
                e & ya && (0 === a.button || g) ? 0 > h && (b.push(a), h = b.length - 1) : e & (Aa | Ba) && (c = !0), 
                0 > h || (b[h] = a, this.callback(this.manager, e, {
                    pointers: b,
                    changedPointers: [ a ],
                    pointerType: f,
                    srcEvent: a
                }), c && b.splice(h, 1));
            }
        });
        var Ta = {
            touchstart: ya,
            touchmove: za,
            touchend: Aa,
            touchcancel: Ba
        }, Ua = "touchstart", Va = "touchstart touchmove touchend touchcancel";
        j(O, y, {
            handler: function(a) {
                var b = Ta[a.type];
                if (b === ya && (this.started = !0), this.started) {
                    var c = P.call(this, a, b);
                    b & (Aa | Ba) && 0 === c[0].length - c[1].length && (this.started = !1), this.callback(this.manager, b, {
                        pointers: c[0],
                        changedPointers: c[1],
                        pointerType: ta,
                        srcEvent: a
                    });
                }
            }
        });
        var Wa = {
            touchstart: ya,
            touchmove: za,
            touchend: Aa,
            touchcancel: Ba
        }, Xa = "touchstart touchmove touchend touchcancel";
        j(Q, y, {
            handler: function(a) {
                var b = Wa[a.type], c = R.call(this, a, b);
                c && this.callback(this.manager, b, {
                    pointers: c[0],
                    changedPointers: c[1],
                    pointerType: ta,
                    srcEvent: a
                });
            }
        }), j(S, y, {
            handler: function(a, b, c) {
                var d = c.pointerType == ta, e = c.pointerType == va;
                if (d) this.mouse.allow = !1; else if (e && !this.mouse.allow) return;
                b & (Aa | Ba) && (this.mouse.allow = !0), this.callback(a, b, c);
            },
            destroy: function() {
                this.touch.destroy(), this.mouse.destroy();
            }
        });
        var Ya = v(ja.style, "touchAction"), Za = Ya !== d, $a = "compute", _a = "auto", ab = "manipulation", bb = "none", cb = "pan-x", db = "pan-y";
        T.prototype = {
            set: function(a) {
                a == $a && (a = this.compute()), Za && (this.manager.element.style[Ya] = a), this.actions = a.toLowerCase().trim();
            },
            update: function() {
                this.set(this.manager.options.touchAction);
            },
            compute: function() {
                var a = [];
                return g(this.manager.recognizers, function(b) {
                    l(b.options.enable, [ b ]) && (a = a.concat(b.getTouchAction()));
                }), U(a.join(" "));
            },
            preventDefaults: function(a) {
                if (!Za) {
                    var b = a.srcEvent, c = a.offsetDirection;
                    if (this.manager.session.prevented) return void b.preventDefault();
                    var d = this.actions, e = q(d, bb), f = q(d, db), g = q(d, cb);
                    return e || f && c & Ha || g && c & Ia ? this.preventSrc(b) : void 0;
                }
            },
            preventSrc: function(a) {
                this.manager.session.prevented = !0, a.preventDefault();
            }
        };
        var eb = 1, fb = 2, gb = 4, hb = 8, ib = hb, jb = 16, kb = 32;
        V.prototype = {
            defaults: {},
            set: function(a) {
                return h(this.options, a), this.manager && this.manager.touchAction.update(), this;
            },
            recognizeWith: function(a) {
                if (f(a, "recognizeWith", this)) return this;
                var b = this.simultaneous;
                return a = Y(a, this), b[a.id] || (b[a.id] = a, a.recognizeWith(this)), this;
            },
            dropRecognizeWith: function(a) {
                return f(a, "dropRecognizeWith", this) ? this : (a = Y(a, this), delete this.simultaneous[a.id], 
                this);
            },
            requireFailure: function(a) {
                if (f(a, "requireFailure", this)) return this;
                var b = this.requireFail;
                return a = Y(a, this), -1 === s(b, a) && (b.push(a), a.requireFailure(this)), this;
            },
            dropRequireFailure: function(a) {
                if (f(a, "dropRequireFailure", this)) return this;
                a = Y(a, this);
                var b = s(this.requireFail, a);
                return b > -1 && this.requireFail.splice(b, 1), this;
            },
            hasRequireFailures: function() {
                return this.requireFail.length > 0;
            },
            canRecognizeWith: function(a) {
                return !!this.simultaneous[a.id];
            },
            emit: function(a) {
                function b(b) {
                    c.manager.emit(c.options.event + (b ? W(d) : ""), a);
                }
                var c = this, d = this.state;
                hb > d && b(!0), b(), d >= hb && b(!0);
            },
            tryEmit: function(a) {
                return this.canEmit() ? this.emit(a) : void (this.state = kb);
            },
            canEmit: function() {
                for (var a = 0; a < this.requireFail.length; ) {
                    if (!(this.requireFail[a].state & (kb | eb))) return !1;
                    a++;
                }
                return !0;
            },
            recognize: function(a) {
                var b = h({}, a);
                return l(this.options.enable, [ this, b ]) ? (this.state & (ib | jb | kb) && (this.state = eb), 
                this.state = this.process(b), void (this.state & (fb | gb | hb | jb) && this.tryEmit(b))) : (this.reset(), 
                void (this.state = kb));
            },
            process: function() {},
            getTouchAction: function() {},
            reset: function() {}
        },
        j(Z, V, {
            defaults: {
                pointers: 1
            },
            attrTest: function(a) {
                var b = this.options.pointers;
                return 0 === b || a.pointers.length === b;
            },
            process: function(a) {
                var b = this.state, c = a.eventType, d = b & (fb | gb), e = this.attrTest(a);
                return d && (c & Ba || !e) ? b | jb : d || e ? c & Aa ? b | hb : b & fb ? b | gb : fb : kb;
            }
        }),
        j($, Z, {
            defaults: {
                event: "pan",
                threshold: 10,
                pointers: 1,
                direction: Ja
            },
            getTouchAction: function() {
                var a = this.options.direction, b = [];
                return a & Ha && b.push(db), a & Ia && b.push(cb), b;
            },
            directionTest: function(a) {
                var b = this.options, c = !0, d = a.distance, e = a.direction, f = a.deltaX, g = a.deltaY;
                return e & b.direction || (b.direction & Ha ? (e = 0 === f ? Ca : 0 > f ? Da : Ea, 
                c = f != this.pX, d = Math.abs(a.deltaX)) : (e = 0 === g ? Ca : 0 > g ? Fa : Ga, 
                c = g != this.pY, d = Math.abs(a.deltaY))), a.direction = e, c && d > b.threshold && e & b.direction;
            },
            attrTest: function(a) {
                return Z.prototype.attrTest.call(this, a) && (this.state & fb || !(this.state & fb) && this.directionTest(a));
            },
            emit: function(a) {
                this.pX = a.deltaX, this.pY = a.deltaY;
                var b = X(a.direction);
                b && this.manager.emit(this.options.event + b, a), this._super.emit.call(this, a);
            }
        }),
        j(_, Z, {
            defaults: {
                event: "pinch",
                threshold: 0,
                pointers: 2
            },
            getTouchAction: function() {
                return [ bb ];
            },
            attrTest: function(a) {
                return this._super.attrTest.call(this, a) && (Math.abs(a.scale - 1) > this.options.threshold || this.state & fb);
            },
            emit: function(a) {
                if (this._super.emit.call(this, a), 1 !== a.scale) {
                    var b = a.scale < 1 ? "in" : "out";
                    this.manager.emit(this.options.event + b, a);
                }
            }
        }),
        j(aa, V, {
            defaults: {
                event: "press",
                pointers: 1,
                time: 500,
                threshold: 5
            },
            getTouchAction: function() {
                return [ _a ];
            },
            process: function(a) {
                var b = this.options, c = a.pointers.length === b.pointers, d = a.distance < b.threshold, f = a.deltaTime > b.time;
                if (this._input = a, !d || !c || a.eventType & (Aa | Ba) && !f) this.reset(); else if (a.eventType & ya) this.reset(), 
                this._timer = e(function() {
                    this.state = ib, this.tryEmit();
                }, b.time, this); else if (a.eventType & Aa) return ib;
                return kb;
            },
            reset: function() {
                clearTimeout(this._timer);
            },
            emit: function(a) {
                this.state === ib && (a && a.eventType & Aa ? this.manager.emit(this.options.event + "up", a) : (this._input.timeStamp = na(), 
                this.manager.emit(this.options.event, this._input)));
            }
        }),
        j(ba, Z, {
            defaults: {
                event: "rotate",
                threshold: 0,
                pointers: 2
            },
            getTouchAction: function() {
                return [ bb ];
            },
            attrTest: function(a) {
                return this._super.attrTest.call(this, a) && (Math.abs(a.rotation) > this.options.threshold || this.state & fb);
            }
        }),
        j(ca, Z, {
            defaults: {
                event: "swipe",
                threshold: 10,
                velocity: .65,
                direction: Ha | Ia,
                pointers: 1
            },
            getTouchAction: function() {
                return $.prototype.getTouchAction.call(this);
            },
            attrTest: function(a) {
                var b, c = this.options.direction;
                return c & (Ha | Ia) ? b = a.velocity : c & Ha ? b = a.velocityX : c & Ia && (b = a.velocityY), 
                this._super.attrTest.call(this, a) && c & a.direction && a.distance > this.options.threshold && ma(b) > this.options.velocity && a.eventType & Aa;
            },
            emit: function(a) {
                var b = X(a.direction);
                b && this.manager.emit(this.options.event + b, a), this.manager.emit(this.options.event, a);
            }
        }),
        j(da, V, {
            defaults: {
                event: "tap",
                pointers: 1,
                taps: 1,
                interval: 300,
                time: 250,
                threshold: 2,
                posThreshold: 10
            },
            getTouchAction: function() {
                return [ ab ];
            },
            process: function(a) {
                var b = this.options, c = a.pointers.length === b.pointers, d = a.distance < b.threshold, f = a.deltaTime < b.time;
                if (this.reset(), a.eventType & ya && 0 === this.count) return this.failTimeout();
                if (d && f && c) {
                    if (a.eventType != Aa) return this.failTimeout();
                    var g = this.pTime ? a.timeStamp - this.pTime < b.interval : !0, h = !this.pCenter || I(this.pCenter, a.center) < b.posThreshold;
                    this.pTime = a.timeStamp, this.pCenter = a.center, h && g ? this.count += 1 : this.count = 1, 
                    this._input = a;
                    var i = this.count % b.taps;
                    if (0 === i) return this.hasRequireFailures() ? (this._timer = e(function() {
                        this.state = ib, this.tryEmit();
                    }, b.interval, this), fb) : ib;
                }
                return kb;
            },
            failTimeout: function() {
                return this._timer = e(function() {
                    this.state = kb;
                }, this.options.interval, this), kb;
            },
            reset: function() {
                clearTimeout(this._timer);
            },
            emit: function() {
                this.state == ib && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input));
            }
        }),
        ea.VERSION = "2.0.4",
        ea.defaults = {
            domEvents: !1,
            touchAction: $a,
            enable: !0,
            inputTarget: null,
            inputClass: null,
            preset: [ [ ba, {
                enable: !1
            } ], [ _, {
                enable: !1
            }, [ "rotate" ] ], [ ca, {
                direction: Ha
            } ], [ $, {
                direction: Ha
            }, [ "swipe" ] ], [ da ], [ da, {
                event: "doubletap",
                taps: 2
            }, [ "tap" ] ], [ aa ] ],
            cssProps: {
                userSelect: "default",
                touchSelect: "none",
                touchCallout: "none",
                contentZooming: "none",
                userDrag: "none",
                tapHighlightColor: "rgba(0,0,0,0)"
            }
        };
        var lb = 1, mb = 2;
        fa.prototype = {
            set: function(a) {
                return h(this.options, a), a.touchAction && this.touchAction.update(), a.inputTarget && (this.input.destroy(), 
                this.input.target = a.inputTarget, this.input.init()), this;
            },
            stop: function(a) {
                this.session.stopped = a ? mb : lb;
            },
            recognize: function(a) {
                var b = this.session;
                if (!b.stopped) {
                    this.touchAction.preventDefaults(a);
                    var c, d = this.recognizers, e = b.curRecognizer;
                    (!e || e && e.state & ib) && (e = b.curRecognizer = null);
                    for (var f = 0; f < d.length; ) c = d[f], b.stopped === mb || e && c != e && !c.canRecognizeWith(e) ? c.reset() : c.recognize(a), 
                    !e && c.state & (fb | gb | hb) && (e = b.curRecognizer = c), f++;
                }
            },
            get: function(a) {
                if (a instanceof V) return a;
                for (var b = this.recognizers, c = 0; c < b.length; c++) if (b[c].options.event == a) return b[c];
                return null;
            },
            add: function(a) {
                if (f(a, "add", this)) return this;
                var b = this.get(a.options.event);
                return b && this.remove(b), this.recognizers.push(a), a.manager = this, this.touchAction.update(), 
                a;
            },
            remove: function(a) {
                if (f(a, "remove", this)) return this;
                var b = this.recognizers;
                return a = this.get(a), b.splice(s(b, a), 1), this.touchAction.update(), this;
            },
            on: function(a, b) {
                var c = this.handlers;
                return g(r(a), function(a) {
                    c[a] = c[a] || [], c[a].push(b);
                }), this;
            },
            off: function(a, b) {
                var c = this.handlers;
                return g(r(a), function(a) {
                    b ? c[a].splice(s(c[a], b), 1) : delete c[a];
                }), this;
            },
            emit: function(a, b) {
                this.options.domEvents && ha(a, b);
                var c = this.handlers[a] && this.handlers[a].slice();
                if (c && c.length) {
                    b.type = a, b.preventDefault = function() {
                        b.srcEvent.preventDefault();
                    };
                    for (var d = 0; d < c.length; ) c[d](b), d++;
                }
            },
            destroy: function() {
                this.element && ga(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), 
                this.element = null;
            }
        },
        h(ea, {
            INPUT_START: ya,
            INPUT_MOVE: za,
            INPUT_END: Aa,
            INPUT_CANCEL: Ba,
            STATE_POSSIBLE: eb,
            STATE_BEGAN: fb,
            STATE_CHANGED: gb,
            STATE_ENDED: hb,
            STATE_RECOGNIZED: ib,
            STATE_CANCELLED: jb,
            STATE_FAILED: kb,
            DIRECTION_NONE: Ca,
            DIRECTION_LEFT: Da,
            DIRECTION_RIGHT: Ea,
            DIRECTION_UP: Fa,
            DIRECTION_DOWN: Ga,
            DIRECTION_HORIZONTAL: Ha,
            DIRECTION_VERTICAL: Ia,
            DIRECTION_ALL: Ja,
            Manager: fa,
            Input: y,
            TouchAction: T,
            TouchInput: Q,
            MouseInput: M,
            PointerEventInput: N,
            TouchMouseInput: S,
            SingleTouchInput: O,
            Recognizer: V,
            AttrRecognizer: Z,
            Tap: da,
            Pan: $,
            Swipe: ca,
            Pinch: _,
            Rotate: ba,
            Press: aa,
            on: n,
            off: o,
            each: g,
            merge: i,
            extend: h,
            inherit: j,
            bindFn: k,
            prefixed: v
        }),
        typeof define == ka && define.amd ? define(function () {
            return ea;
        }) : "undefined" != typeof module && module.exports ? module.exports = ea : a[c] = ea;
    }(window, document, "Hammer");
});