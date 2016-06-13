define(function (require, exports, module) {

    //引入依赖的组件
    var $ = require('jquery'),
        Url = require('mod/url');
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
            //Metronic.initDataTable({
            //    columns: [
            //        { data: 'orderby' },
            //        { data: 'name' },
            //        { data: 'parent.name' },
            //        { data: 'info' },
            //        { data: 'url' },
            //        {
            //            data: 'icon',
            //            render: function (data, type, row, meta) {
            //                return '<i class="' + (row.parentId == 1 ? 'icon-' : 'fa fa-') + data + '"></i>';
            //            }
            //        },
            //        {
            //            render: function (data, type, row, meta) {
            //                return Index.btnEdit('./views/account/menu/menu-edit.html', row.id) + Index.btnDel(row.id);
            //            }
            //        }
            //    ]
            //});
            e.preventDefault();
        });
        $(".query_btn").click();
    });
});