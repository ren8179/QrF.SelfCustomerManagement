define(function (require, exports, module) {

    //引入依赖的组件
    var $ = require('jquery'),
        Url = require('mod/url'),
        SweetAlert = require('sweetalert');
    require('jquery.md5')($);

    //定义常量及组件初始化
    var BUTTONS = {
        SAVE: $('#btn-save')
    },
    INPUTS = {
        USERNAME: $('input[name="Username"]'),
        PASSWORD: $('input[name="Pwd"]')
    };

    //业务逻辑
    BUTTONS.SAVE.on("click", function (e) {
        var formData = {};
        formData.Username = INPUTS.USERNAME.val();
        formData.Password = INPUTS.PASSWORD.val();
        $('input[name="Password"]').val($.md5(formData.Username + formData.Password));
        if (!formData.Username || !formData.Password) {
            SweetAlert({ title: "提示", text: "请输入用户名或密码！", type: "warning", timer: 3000 });
            e.preventDefault();
        }
    });
    $(function () {
        INPUTS.USERNAME.val(Url.getParam('username'));
    });
});