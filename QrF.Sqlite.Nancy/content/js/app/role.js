define(function (require, exports, module) {

    //引入依赖的组件
    var $ = require('jquery'),
        Global = require('mod/global'),
        tree = $('#tree');
    require('jstree')($);

    $(function () {
        Global.init(2, "role", function (result) {
            if (result) {
                $("#Info").val(result.info).focus();
                $("#BusinessPermissionString").val(result.businessPermissionString).focus()
                $("#Name", $('.formValidate')).val(result.name).focus();
                $("#ID").val(result.iD);
                $("#CreateTime").val(result.createTime);
                tree.jstree("uncheck_all");//清空
                if (result.businessPermissionString) {
                    $.each(result.businessPermissionString.split(','), function (i, item) {
                        tree.jstree('check_node', item);//将节点选中 
                    });
                }
            }
        });
        Global.loadAjaxData('/sys/menuTree', function (result) {   //复选框树的初始化
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
        Global.initFormValidate('/sys/roleEdit', {
            rules: {
                Name: { required: true },
                Info: { required: true }
            },
            messages: {
                Name: { required: "请填写角色名" },
                Info: { required: "请填写说明" }
            },
            submitHandler: function (form) {
                try {
                    var selectList = $('#tree').jstree('get_selected');
                    $("#BusinessPermissionString").val(selectList.join(','));
                    var json = {};
                    var formData = $(form).serializeArray();
                    $.each(formData, function () {
                        json[this.name] = (this.value && isNaN(this.value)) ? this.value : Number(this.value);
                    });
                    json.BusinessPermissionString = json.BusinessPermissionString + "";
                }
                catch (ex) {
                }
                Global.loadAjaxData('/sys/roleEdit', function (result) {
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
                    { field: "name", title: "角色名" },
                    { field: "info", title: "说明" },
                    {
                        title: "操作",
                        formatter: function (value, row) {
                            return Global.btnEdit('/sys/roleGet', row.iD) + Global.btnDel('/sys/roleDelete', row.iD);
                        }
                    },
                ],
                sidePagination: "server",
                pagination: true,
                url: "/sys/roleList",
                queryParams: function (params) { return $.extend({}, args, params) }
            });
            e.preventDefault();
        });
        $(".query_btn").click();
    });
});