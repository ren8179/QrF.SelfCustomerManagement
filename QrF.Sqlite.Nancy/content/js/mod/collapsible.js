define(function (require, exports, moudles) {
    return function (jquery) {
        (function ($) {
            $.fn.collapsible = function (b) {
                var c = {
                    accordion: void 0
                };
                return b = $.extend(c, b), this.each(function () {
                    function c(b) {
                        h = g.find("> li > .collapsible-header"), b.hasClass("active") ? b.parent().addClass("active") : b.parent().removeClass("active"),
                        b.parent().hasClass("active") ? b.siblings(".collapsible-body").stop(!0, !1).slideDown({
                            duration: 350,
                            easing: "easeOutQuart",
                            queue: !1,
                            complete: function () {
                                $(this).css("height", "");
                            }
                        }) : b.siblings(".collapsible-body").stop(!0, !1).slideUp({
                            duration: 350,
                            easing: "easeOutQuart",
                            queue: !1,
                            complete: function () {
                                $(this).css("height", "");
                            }
                        }), h.not(b).removeClass("active").parent().removeClass("active"), h.not(b).parent().children(".collapsible-body").stop(!0, !1).slideUp({
                            duration: 350,
                            easing: "easeOutQuart",
                            queue: !1,
                            complete: function () {
                                $(this).css("height", "");
                            }
                        });
                    }
                    function d(b) {
                        b.hasClass("active") ? b.parent().addClass("active") : b.parent().removeClass("active"),
                        b.parent().hasClass("active") ? b.siblings(".collapsible-body").stop(!0, !1).slideDown({
                            duration: 350,
                            easing: "easeOutQuart",
                            queue: !1,
                            complete: function () {
                                $(this).css("height", "");
                            }
                        }) : b.siblings(".collapsible-body").stop(!0, !1).slideUp({
                            duration: 350,
                            easing: "easeOutQuart",
                            queue: !1,
                            complete: function () {
                                $(this).css("height", "");
                            }
                        });
                    }
                    function e(a) {
                        var b = f(a);
                        return b.length > 0;
                    }
                    function f(a) {
                        return a.closest("li > .collapsible-header");
                    }
                    var g = $(this), h = $(this).find("> li > .collapsible-header"), i = g.data("collapsible");
                    g.off("click.collapse", ".collapsible-header"), h.off("click.collapse"), b.accordion || "accordion" === i || void 0 === i ? (h = g.find("> li > .collapsible-header"),
                    h.on("click.collapse", function (b) {
                        var d = $(b.target);
                        e(d) && (d = f(d)), d.toggleClass("active"), c(d);
                    }), c(h.filter(".active").first())) : h.each(function () {
                        $(this).on("click.collapse", function (b) {
                            var c = $(b.target);
                            e(c) && (c = f(c)), c.toggleClass("active"), d(c);
                        }), $(this).hasClass("active") && d($(this));
                    });
                });
            }
            $(function () {
                $(".collapsible").collapsible();
            });
        })(jquery);
    }
})