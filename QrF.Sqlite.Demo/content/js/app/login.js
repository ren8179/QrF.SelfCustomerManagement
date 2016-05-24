define(function (require, exports, module) {

    //引入依赖的组件
    var $ = require('jquery'),
        bootstrap = require('bootstrap'),
        Form = require('mod/form'),
        Url = require('mod/url'),
        Notification = require('mod/notification');

    //定义常量及组件初始化
    var BUTTONS = {
        SAVE: $('#btn-save')
    },
    appForm = new Form('#loginForm', {
        postUrl: Url.getUrl('login'),
        defaultData: { Username: Url.getParam('username') },
        onBeforeSave: function (e, formData) {
            if (!formData.Username || !formData.Password) {
                Notification.showRightBottom("提示", "请输入用户名或密码！");
                e.preventDefault();
            }
        }
    });

    //业务逻辑
    BUTTONS.SAVE.on("click",function (e) {
        var _a = appForm.save();
        _a && _a.done(function (res) {
            if (res.code == 200) {
                location.href = Url.getUrl();
            } else {
                Notification.showRightBottom("错误", res.error);
            }
        });
        e.preventDefault();
    });
});