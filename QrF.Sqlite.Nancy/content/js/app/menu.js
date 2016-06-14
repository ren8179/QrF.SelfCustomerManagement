define(function (require, exports, module) {

    //引入依赖的组件
    var $ = require('jquery'),
        Url = require('mod/url'),
        Global=require('mod/global');
    require('mod/easing')($);
    require('mod/waves')($);
    require('bootstrap-table')($);
    require('mod/dropdown')($);
    require('mod/collapsible')($);
    require('mod/formMaterialize')($);
   

    $(window).load(function () {
        setTimeout(function () {
            $('body').addClass('loaded');
        }, 200);
    });

    $(function () {
        $(".query_btn").on("click", function (e) {
            Global.initDataTable({
                ajax: {
                    url: "/sys/menuList?" + $(".query_form").serialize(),
                },
                columns: [
                    { data: 'orderby' },
                    { data: 'name' },
                    { data: 'parent.name' },
                    { data: 'info' },
                    { data: 'url' },
                    {
                        data: 'icon',
                        render: function (data, type, row, meta) {
                            return '<i class="' + (row.parentId == 1 ? 'icon-' : 'fa fa-') + data + '"></i>';
                        }
                    },
                    {
                        render: function (data, type, row, meta) {
                            return Global.btnEdit('./views/account/menu/menu-edit.html', row.id) + Global.btnDel(row.id);
                        }
                    }
                ]
            });
            e.preventDefault();
        });
        $(".query_btn").click();
    });
});