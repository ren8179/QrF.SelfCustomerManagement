define(function (require, exports, module) {

    //引入依赖的组件
    var $ = require('jquery'),
        Global = require('mod/global'),
        tree = $('#tree');
    require('jstree')($);
    require('jquery.md5')($);

    $(function () {
        Global.init(2, "user", function (result) {
            if (result) {
                $("#UserName").val(result.userName).focus();
                $("#Password").val(result.password);
                $("#Email").val(result.email).focus();
                $("#Mobile").val(result.mobile).focus();
                $("#RoleIds").val(result.roleIds).focus();
                $("#IsActive").val(result.isActive);
                $("#LoginName", $('.formValidate')).val(result.loginName).focus();
                $("#ID").val(result.iD);
                $("#CreateTime").val(result.createTime);
                if (result.iD > 0) {
                    $("#Pwd").parent().hide();
                    $("#LoginName", $('.formValidate')).attr("readonly", "readonly");
                } else {
                    $("#Pwd").parent().show();
                    $("#LoginName", $('.formValidate')).removeAttr("readonly");
                }
                tree.jstree("uncheck_all");//清空
                if (result.roleIds) {
                    $.each(result.roleIds.split(','), function (i, item) {
                        tree.jstree('check_node', item);//将节点选中 
                    });
                }
            }
        });

        Global.loadAjaxData('/sys/roleTree', function (result) {   //复选框树的初始化
            if (result) {
                tree.jstree({
                    'plugins': ["wholerow", "checkbox", "types"], //出现选择框
                    'core': {
                        'data': result,
                        'themes': { "responsive": false }
                    },
                    'types': {
                        'default': { 'icon': "glyphicon glyphicon-leaf" },
                        'parent': { 'icon': "glyphicon glyphicon-folder-open" }
                    }
                });
            }
        });

        Global.initFormValidate('/sys/userEdit', {
            rules: {
                LoginName: { required: true },
                Pwd: { required: true }
            },
            messages: {
                LoginName: { required: "请填写登录名" },
                Pwd: { required: "请填写密码" }
            },
            submitHandler: function (form) {
                try {
                    var selectList = $('#tree').jstree('get_selected');
                    $("#RoleIds").val(selectList.join(','));
                    var loginName = $("#LoginName").val();
                    var pwd = $("#Pwd").val();
                    $("#Password").val($.md5(loginName + pwd));
                    var json = {};
                    var formData = $(form).serializeArray();
                    $.each(formData, function () {
                        json[this.name] = (this.value == "" || isNaN(this.value)) ? this.value : Number(this.value);
                    });
                    json.RoleIds = json.RoleIds + "";
                }
                catch (ex) {
                }
                Global.loadAjaxData('/sys/userEdit', function (result) {
                    $("#modalEdit").closeModal();
                    $(".query_btn").click();
                }, 'post', JSON.stringify(json));
                return false;
            }
        });
        $(".query_btn").on("click", function (e) {
            var args = {};
            $.each($(".query_form").serializeArray(), function () {
                    args[this.name] = this.value;
            });
            Global.initBootstrapTable($(".table-data"), {
                columns: [
                    { field: "loginName", title: "登录名" },
                    { field: "userName", title: "姓名" },
                    { field: "email", title: "邮箱" },
                    { field: "mobile", title: "电话" },
                    { field: "roles", title: "角色" },
                    {
                        title: "操作",
                        formatter: function (value, row) {
                            return Global.btnEdit('/sys/userGet', row.iD) + Global.btnDel('/sys/userDelete', row.iD);
                        }
                    },
                ],
                sidePagination: "server",
                pagination: true,
                url: "/sys/userList",
                queryParams: function (params) { return $.extend({}, args, params) }
            });
            e.preventDefault();
        });
        $(".query_btn").click();
    });
});