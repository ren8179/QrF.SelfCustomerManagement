define(function (require, exports, module) {

    //引入依赖的组件
    var $ = require('jquery');
    require('mod/dropdown')($);
    require('mod/collapsible')($);
    require('mod/easing')($);
    require('mod/waves')($);

    $(window).load(function () {
        setTimeout(function () {
            $('body').addClass('loaded');
        }, 200);
    });
});