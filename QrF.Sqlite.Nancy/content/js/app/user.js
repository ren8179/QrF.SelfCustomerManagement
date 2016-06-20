define(function (require, exports, module) {

    //引入依赖的组件
    var $ = require('jquery'),
        Url = require('mod/url'),
        Global = require('mod/global');
    require('jquery.validate')($);
    require('mod/easing')($);
    require('mod/waves')($);
    require('bootstrap-table')($);
    require('mod/dropdown')($);
    require('mod/leanModal')($);
    require('mod/collapsible')($);
    require('mod/formMaterialize')($);
    require('jquery.md5')($);
    require('jstree');

    $(function () {
        Global.menuCode(2, "user");

        bindJsTree();
        
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

        $("#formValidate").validate({
            rules: {
                LoginName: { required: true },
                Pwd: { required: true }
            },
            messages: {
                LoginName: { required: "请填写登录名" },
                Pwd: { required: "请填写密码" }
            },
            errorElement: 'div',
            errorPlacement: function (error, element) {
                var placement = $(element).data('error');
                if (placement) {
                    $(placement).append(error)
                } else {
                    error.insertAfter(element);
                }
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
                        json[this.name] = (this.value=="" || isNaN(this.value)) ? this.value : Number(this.value);
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

        var options = {
            dismissible: true, // Modal can be dismissed by clicking outside of the modal
            opacity: .5, // Opacity of modal background
            in_duration: 300, // Transition in duration
            out_duration: 200, // Transition out duration
            ready: function () {
                $(".formValidate").find("input").removeClass("valid").removeClass("invalid").val("").siblings("label, i").removeClass("active");
                $("#ID").val(0);
            }
        };
        $('.modal-trigger').leanModal(options);

        $(document).on('click', '.edit_btn', function (e) {
            var $btn=$(this);
            options.ready = function () {
                Global.loadAjaxData($btn.attr("href"), function (result) {
                    if (result) {
                        $("#UserName").val(result.userName).focus();
                        $("#Password").val(result.password);
                        $("#Email").val(result.email).focus();
                        $("#Mobile").val(result.mobile).focus();
                        $("#RoleIds").val(result.roleIds).focus();
                        $("#IsActive").val(result.isActive);
                        $("#LoginName", $('.formValidate')).val(result.loginName).attr("readonly", "readonly").focus();
                        $("#ID").val(result.iD);
                        bindJsTree(result.roleIds);
                    }
                });
            };
            $("#modalEdit").openModal(options);
            e.preventDefault();
        });

        $(document).on('click', '.delete_btn', function (e) {
            var $btn = $(this);
            Global.loadAjaxData($btn.attr("href"), function (result) {
                $(".query_btn").click();
            });
            e.preventDefault();
        });
    });
    function bindJsTree(checkedItem) {
        var control = $('#tree')
        control.data('jstree', false);//清空数据，必须
        Global.loadAjaxData('/sys/roleTree', function (result) {   //复选框树的初始化
            if (result) {
                control.jstree({
                    'plugins': ["wholerow", "checkbox", "types"], //出现选择框
                    'core': {
                        'data': result,
                        'themes': { "responsive": false }
                    },
                    'types': {
                        'default': { 'icon': "glyphicon glyphicon-leaf" },
                        'parent': { 'icon': "glyphicon glyphicon-folder-open" }
                    }
                }).bind('loaded.jstree', function () {
                    if (checkedItem) {
                        $.each(checkedItem.split(','), function (i, item) {
                            control.jstree('check_node', item);//将节点选中 
                        });
                    }
                });
            }
        });
    }
});