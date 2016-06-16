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

    $(window).load(function () {
        setTimeout(function () {
            $('body').addClass('loaded');
        }, 200);
    });

    $(function () {
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
                            return Global.btnEdit('./views/integralwall/appinfo/appinfo-edit.html', row.id) + Global.btnDel(row.id);
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

        $("#formValidate").validate({
            rules: {
                Name: {
                    required: true
                }
            },
            messages: {
                Name: {
                    required: "请填写菜单名称"
                }
            },
            errorElement: 'div',
            errorPlacement: function (error, element) {
                var placement = $(element).data('error');
                if (placement) {
                    $(placement).append(error)
                } else {
                    error.insertAfter(element);
                }
            }
        });
    });
});