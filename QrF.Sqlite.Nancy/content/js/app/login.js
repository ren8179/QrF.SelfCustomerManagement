define(function (require, exports, module) {

    //引入依赖的组件
    var $ = require('jquery'),
        Url = require('mod/url'),
        SweetAlert = require('sweetalert');

    //定义常量及组件初始化
    var BUTTONS = {
        SAVE: $('#btn-save')
    },
    INPUTS = {
        USERNAME: $('input[name="Username"]'),
        PASSWORD: $('input[name="Password"]')
    };

    //业务逻辑
    BUTTONS.SAVE.on("click", function (e) {
        var formData = {};
        formData.Username = INPUTS.USERNAME.val();
        formData.Password = INPUTS.PASSWORD.val();
        if (!formData.Username || !formData.Password) {
            SweetAlert({ title: "提示", text: "请输入用户名或密码！", timer: 3000, showConfirmButton: false });
            e.preventDefault();
        }
    });
    $(function () {
        INPUTS.USERNAME.val(Url.getParam('username'));
    });
});