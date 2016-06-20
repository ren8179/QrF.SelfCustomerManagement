define(function (require, exports, module) {

    //引入依赖的组件
    var $ = require('jquery');
    require('mod/dropdown')($);
    require('mod/easing')($);
    require('mod/waves')($);
    require('mod/collapsible')($);
    var Global = require('mod/global');
});