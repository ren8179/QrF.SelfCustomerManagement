/*
 * 下拉组件
 */
define(function (require, exports, module) {
    var $ = require('jquery'),
       dropdown = (function (el,option) {
           var c = {
               inDuration: 300,
               outDuration: 225,
               constrain_width: !0,
               hover: !1,
               gutter: 0,
               belowOrigin: !1,
               alignment: "left"
           };
           $(el).each(function () {
               function d() {
                   void 0 !== g.data("induration") && (h.inDuration = g.data("inDuration")), void 0 !== g.data("outduration") && (h.outDuration = g.data("outDuration")),
                   void 0 !== g.data("constrainwidth") && (h.constrain_width = g.data("constrainwidth")),
                   void 0 !== g.data("hover") && (h.hover = g.data("hover")), void 0 !== g.data("gutter") && (h.gutter = g.data("gutter")),
                   void 0 !== g.data("beloworigin") && (h.belowOrigin = g.data("beloworigin")), void 0 !== g.data("alignment") && (h.alignment = g.data("alignment"));
               }
               function e() {
                   d(), i.addClass("active"), g.addClass("active"), h.constrain_width === !0 ? i.css("width", g.outerWidth()) : i.css("white-space", "nowrap");
                   var b = 0;
                   h.belowOrigin === !0 && (b = g.height());
                   var c, e = g.offset().left, f = h.alignment;
                   if (e + i.innerWidth() > $(window).width() ? f = "right" : e - i.innerWidth() + g.innerWidth() < 0 && (f = "left"),
                   "left" === f) c = h.gutter, leftPosition = g.position().left + c; else if ("right" === f) {
                       var j = g.position().left + g.outerWidth() - i.outerWidth();
                       c = -h.gutter, leftPosition = j + c;
                   }
                   i.css({
                       position: "absolute",
                       top: g.position().top + b,
                       left: leftPosition
                   }), i.stop(!0, !0).css("opacity", 0).slideDown({
                       queue: !1,
                       duration: h.inDuration,
                       easing: "easeOutCubic",
                       complete: function () {
                           $(this).css("height", "");
                       }
                   }).animate({
                       opacity: 1
                   }, {
                       queue: !1,
                       duration: h.inDuration,
                       easing: "easeOutSine"
                   });
               }
               function f() {
                   i.fadeOut(h.outDuration), i.removeClass("active"), g.removeClass("active");
               }
               var g = $(this), h = $.extend({}, c, option), i = $("#" + g.attr("data-activates"));
               if (d(), g.after(i), h.hover) {
                   var j = !1;
                   g.unbind("click." + g.attr("id")), g.on("mouseenter", function (a) {
                       j === !1 && (e(), j = !0);
                   }), g.on("mouseleave", function (b) {
                       var c = b.toElement || b.relatedTarget;
                       $(c).closest(".dropdown-content").is(i) || (i.stop(!0, !0), f(), j = !1);
                   }), i.on("mouseleave", function (b) {
                       var c = b.toElement || b.relatedTarget;
                       $(c).closest(".dropdown-button").is(g) || (i.stop(!0, !0), f(), j = !1);
                   });
               } else g.unbind("click." + g.attr("id")), g.bind("click." + g.attr("id"), function (b) {
                   g[0] != b.currentTarget || g.hasClass("active") || 0 !== $(b.target).closest(".dropdown-content").length ? g.hasClass("active") && (f(),
                   $(document).unbind("click." + i.attr("id"))) : (b.preventDefault(), e()), i.hasClass("active") && $(document).bind("click." + i.attr("id"), function (b) {
                       i.is(b.target) || g.is(b.target) || g.find(b.target).length || (f(), $(document).unbind("click." + i.attr("id")));
                   });
               });
               g.on("open", e), g.on("close", f);
           });
       });

    return {
        init: function (el,option) {
            el = el || ".dropdown-button";
            dropdown(el,option);
        }
    }
});