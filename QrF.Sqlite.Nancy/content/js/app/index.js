define(function (require, exports, module) {

    //引入依赖的组件
    var $ = require('jquery'),
        Easing = require('mod/easing'),
        Waves = require('mod/waves'),
        Url = require('mod/url'),
        Dropdown = require('mod/dropdown'),
        SweetAlert = require('sweetalert');

    $(window).load(function () {
        setTimeout(function () {
            $('body').addClass('loaded');
        }, 200);
    });

    $(function () {
        $.extend($.easing, Easing);//自定义动画效果
        Waves.displayEffect();
        Dropdown.init();
    });
});