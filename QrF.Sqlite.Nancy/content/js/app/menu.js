define(function (require, exports, module) {

    //引入依赖的组件
    var $ = require('jquery'),
        Global = require('mod/global');

    $(function () {
        Global.init(2, "menu", function (result) {
            if (result) {
                $("#Orderby").parent().show();
                $("#Url").val(result.url).focus();
                $("#Info").val(result.info).focus();
                $("#Code").val(result.code).focus();
                $("#Permission").val(result.permission).focus();
                $("#Icon").val(result.icon).focus();
                $("#ParentId", $('.formValidate')).val(result.parentId).material_select();
                $("#Orderby").val(result.orderby).focus();
                $("#Name", $('.formValidate')).val(result.name).focus();
                $("#CreateTime").val(result.createTime);
                $("#ID").val(result.iD);
            }
        });
        Global.initFormValidate('/sys/menuEdit');

        Global.loadAjaxData("/sys/parentList", function (result) {
            var el = $("select[name='ParentId']");
            if (result && result.length > 0) {
                var html = '';
                $.each(result, function (index, value) {
                    html += '<option value="' + value.id + '">' + value.name + '</option>';
                });
                el.append(html).material_select();
            }
            else {
                el.append('');
            }
        }, '', { "ParentId": 1 }, true);

        $(".query_btn").on("click", function (e) {
            var args = {};
            $.each($(".query_form").serializeArray(), function () {
                if (this.name == "ParentId")
                    args[this.name] = Number(this.value);
                else
                    args[this.name] = this.value;
            });
            Global.initBootstrapTable($(".table-data"), {
                columns: [
                    { field: "orderby", title: "编号", sortable: true },
                    { field: "name", title: "菜单名称" },
                    { field: "parent", title: "父级菜单" },
                    { field: "url", title: "页面地址" },
                    { field: "icon", title: "菜单图标", formatter: function (value, row) { return '<i class="' + value + ' small"></i>'; } },
                    {
                        title: "操作",
                        formatter: function (value, row) {
                            return Global.btnEdit('/sys/menuGet', row.iD) + Global.btnDel('/sys/menuDelete', row.iD);
                        }
                    },
                ],
                sidePagination: "server",
                pagination: true,
                url: "/sys/menuList",
                queryParams: function (params) { return $.extend({}, args, params) }
            });
            e.preventDefault();
        });
        $(".query_btn").click();

    });
});