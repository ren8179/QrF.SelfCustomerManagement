define(function (require, exports, moudles) {
    return function (jquery) {
        (function(a) {
                a(document).ready(function() {
                    function b(b) {
                        var c = b.css("font-family"), e = b.css("font-size");
                        e && d.css("font-size", e), c && d.css("font-family", c), "off" === b.attr("wrap") && d.css("overflow-wrap", "normal").css("white-space", "pre"), 
                        d.text(b.val() + "\n");
                        var f = d.html().replace(/\n/g, "<br>");
                        d.html(f), b.is(":visible") ? d.css("width", b.width()) : d.css("width", a(window).width() / 2), 
                        b.css("height", d.height());
                    }
                    var c = "input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea";
                    a("input[autofocus]").siblings("label, i").addClass("active"), a(document).on("change", c, function() {
                        (0 !== a(this).val().length || void 0 !== a(this).attr("placeholder")) && a(this).siblings("label").addClass("active"), 
                        validate_field(a(this));
                    }), a(document).ready(function() {
                        var b = "input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea";
                        a(b).each(function (b, c) {
                            a(c).val().length > 0 || void 0 !== a(this).attr("placeholder") || a(c)[0].validity.badInput === !0 ? a(this).siblings("label").addClass("active") : a(this).siblings("label, i").removeClass("active");
                        });
                    }), a(document).on("reset", function(b) {
                        var d = a(b.target);
                        d.is("form") && (d.find(c).removeClass("valid").removeClass("invalid"), d.find(c).each(function() {
                            "" === a(this).attr("value") && a(this).siblings("label, i").removeClass("active");
                        }), d.find("select.initialized").each(function() {
                            var a = d.find("option[selected]").text();
                            d.siblings("input.select-dropdown").val(a);
                        }));
                    }), a(document).on("focus", c, function() {
                        a(this).siblings("label, i").addClass("active");
                    }), a(document).on("blur", c, function() {
                        var b = a(this);
                        0 === b.val().length && b[0].validity.badInput !== !0 && void 0 === b.attr("placeholder") && b.siblings("label, i").removeClass("active"), 
                        0 === b.val().length && b[0].validity.badInput !== !0 && void 0 !== b.attr("placeholder") && b.siblings("i").removeClass("active"), 
                        validate_field(b);
                    }), window.validate_field = function(a) {
                        var b = void 0 !== a.attr("length"), c = parseInt(a.attr("length")), d = a.val().length;
                        0 === a.val().length && a[0].validity.badInput === !1 ? a.hasClass("validate") && (a.removeClass("valid"), 
                        a.removeClass("invalid")) : a.hasClass("validate") && (a.is(":valid") && b && c >= d || a.is(":valid") && !b ? (a.removeClass("invalid"), 
                        a.addClass("valid")) : (a.removeClass("valid"), a.addClass("invalid")));
                    };
                    var d = a(".hiddendiv").first();
                    d.length || (d = a('<div class="hiddendiv common"></div>'), a("body").append(d));
                    var e = ".materialize-textarea";
                    a(e).each(function() {
                        var c = a(this);
                        c.val().length && b(c);
                    }), a("body").on("keyup keydown autoresize", e, function() {
                        b(a(this));
                    }), a(document).on("change", '.file-field input[type="file"]', function() {
                        for (var b = a(this).closest(".file-field"), c = b.find("input.file-path"), d = a(this)[0].files, e = [], f = 0; f < d.length; f++) e.push(d[f].name);
                        c.val(e.join(", ")), c.trigger("change");
                    });
                    var f, g = "input[type=range]", h = !1;
                    a(g).each(function() {
                        var b = a('<span class="thumb"><span class="value"></span></span>');
                        a(this).after(b);
                    });
                    var i = ".range-field";
                    a(document).on("change", g, function(b) {
                        var c = a(this).siblings(".thumb");
                        c.find(".value").html(a(this).val());
                    }), a(document).on("input mousedown touchstart", g, function(b) {
                        var c = a(this).siblings(".thumb");
                        c.length <= 0 && (c = a('<span class="thumb"><span class="value"></span></span>'), 
                        a(this).append(c)), c.find(".value").html(a(this).val()), h = !0, a(this).addClass("active"), 
                        c.hasClass("active") || c.velocity({
                            height: "30px",
                            width: "30px",
                            top: "-20px",
                            marginLeft: "-15px"
                        }, {
                            duration: 300,
                            easing: "easeOutExpo"
                        }), f = void 0 === b.pageX || null === b.pageX ? b.originalEvent.touches[0].pageX - a(this).offset().left : b.pageX - a(this).offset().left;
                        var d = a(this).outerWidth();
                        0 > f ? f = 0 : f > d && (f = d), c.addClass("active").css("left", f), c.find(".value").html(a(this).val());
                    }), a(document).on("mouseup touchend", i, function() {
                        h = !1, a(this).removeClass("active");
                    }), a(document).on("mousemove touchmove", i, function(b) {
                        var c, d = a(this).children(".thumb");
                        if (h) {
                            d.hasClass("active") || d.velocity({
                                height: "30px",
                                width: "30px",
                                top: "-20px",
                                marginLeft: "-15px"
                            }, {
                                duration: 300,
                                easing: "easeOutExpo"
                            }), c = void 0 === b.pageX || null === b.pageX ? b.originalEvent.touches[0].pageX - a(this).offset().left : b.pageX - a(this).offset().left;
                            var e = a(this).outerWidth();
                            0 > c ? c = 0 : c > e && (c = e), d.addClass("active").css("left", c), d.find(".value").html(d.siblings(g).val());
                        }
                    }), a(document).on("mouseout touchleave", i, function() {
                        if (!h) {
                            var b = a(this).children(".thumb");
                            b.hasClass("active") && b.velocity({
                                height: "0",
                                width: "0",
                                top: "10px",
                                marginLeft: "-6px"
                            }, {
                                duration: 100
                            }), b.removeClass("active");
                        }
                    });
                }), a.fn.material_select = function(b) {
                    function c(a, b, c) {
                        var e = a.indexOf(b);
                        -1 === e ? a.push(b) : a.splice(e, 1), c.siblings("ul.dropdown-content").find("li").eq(b).toggleClass("active"), 
                        c.find("option").eq(b).prop("selected", !0), d(a, c);
                    }
                    function d(a, b) {
                        for (var c = "", d = 0, e = a.length; e > d; d++) {
                            var f = b.find("option").eq(a[d]).text();
                            c += 0 === d ? f : ", " + f;
                        }
                        "" === c && (c = b.find("option:disabled").eq(0).text()), b.siblings("input.select-dropdown").val(c);
                    }
                    a(this).each(function() {
                        var d = a(this);
                        if (!d.hasClass("browser-default")) {
                            var e = d.attr("multiple") ? !0 : !1, f = d.data("select-id");
                            if (f && (d.parent().find("span.caret").remove(), d.parent().find("input").remove(), 
                            d.unwrap(), a("ul#select-options-" + f).remove()), "destroy" === b) return void d.data("select-id", null).removeClass("initialized");
                            var g = Materialize.guid();
                            d.data("select-id", g);
                            var h = a('<div class="select-wrapper"></div>');
                            h.addClass(d.attr("class"));
                            var i, j = a('<ul id="select-options-' + g + '" class="dropdown-content select-dropdown ' + (e ? "multiple-select-dropdown" : "") + '"></ul>'), k = d.children("option"), l = [], m = !1;
                            i = void 0 !== d.find("option:selected") ? d.find("option:selected") : j.first(), 
                            k.each(function() {
                                e ? j.append(a('<li class="' + (a(this).is(":disabled") ? "disabled" : "") + '"><span><input type="checkbox"' + (a(this).is(":disabled") ? "disabled" : "") + "/><label></label>" + a(this).html() + "</span></li>")) : j.append(a('<li class="' + (a(this).is(":disabled") ? "disabled" : "") + '"><span>' + a(this).html() + "</span></li>"));
                            }), j.find("li").each(function(f) {
                                var g = d;
                                a(this).click(function(d) {
                                    a(this).hasClass("disabled") || (e ? (a('input[type="checkbox"]', this).prop("checked", function(a, b) {
                                        return !b;
                                    }), c(l, a(this).index(), g), p.trigger("focus")) : (j.find("li").removeClass("active"), 
                                    a(this).toggleClass("active"), g.siblings("input.select-dropdown").val(a(this).text())), 
                                    activateOption(j, a(this)), g.find("option").eq(f).prop("selected", !0), g.trigger("change"), 
                                    "undefined" != typeof b && b()), d.stopPropagation();
                                });
                            }), d.wrap(h);
                            var n = a('<span class="caret">&#9660;</span>');
                            d.is(":disabled") && n.addClass("disabled");
                            var o = i.html() && i.html().replace(/"/g, "&quot;"), p = a('<input type="text" class="select-dropdown" readonly="true" ' + (d.is(":disabled") ? "disabled" : "") + ' data-activates="select-options-' + g + '" value="' + o + '"/>');
                            d.before(p), p.before(n), a("body").append(j), d.is(":disabled") || p.dropdown({
                                hover: !1,
                                closeOnClick: !1
                            }), d.attr("tabindex") && a(p[0]).attr("tabindex", d.attr("tabindex")), d.addClass("initialized"), 
                            p.on({
                                focus: function() {
                                    j.is(":visible") || a(this).trigger("open"), a("ul.select-dropdown").not(j[0]).is(":visible") && a("input.select-dropdown").trigger("close");
                                },
                                click: function(a) {
                                    a.stopPropagation();
                                }
                            }), p.on("blur", function() {
                                e || a(this).trigger("close"), j.find("li.selected").removeClass("selected");
                            }), j.hover(function() {
                                m = !0;
                            }, function() {
                                m = !1;
                            }), a(window).on({
                                click: function(a) {
                                    e && (m || p.trigger("close"));
                                }
                            }), activateOption = function(b, c) {
                                b.find("li.selected").removeClass("selected"), a(c).addClass("selected");
                            };
                            var q = [], r = function(b) {
                                if (9 == b.which) return void p.trigger("close");
                                if (40 == b.which && !j.is(":visible")) return void p.trigger("open");
                                if (13 != b.which || j.is(":visible")) {
                                    b.preventDefault();
                                    var c = String.fromCharCode(b.which).toLowerCase(), d = [ 9, 13, 27, 38, 40 ];
                                    if (c && -1 === d.indexOf(b.which)) {
                                        q.push(c);
                                        var f = q.join(""), g = j.find("li").filter(function() {
                                            return 0 === a(this).text().toLowerCase().indexOf(f);
                                        })[0];
                                        g && activateOption(j, g);
                                    }
                                    if (13 == b.which) {
                                        var h = j.find("li.selected:not(.disabled)")[0];
                                        h && (a(h).trigger("click"), e || p.trigger("close"));
                                    }
                                    40 == b.which && (g = j.find("li.selected").length ? j.find("li.selected").next("li:not(.disabled)")[0] : j.find("li:not(.disabled)")[0], 
                                    activateOption(j, g)), 27 == b.which && p.trigger("close"), 38 == b.which && (g = j.find("li.selected").prev("li:not(.disabled)")[0], 
                                    g && activateOption(j, g)), setTimeout(function() {
                                        q = [];
                                    }, 1e3);
                                }
                            };
                            p.on("keydown", r);
                        }
                    });
                };
        })(jquery);
    }
})