define(function (require, exports, module) {

    var handleDataTable = function (options) {
        if ($().dataTable) {
            var table;
            var defaults = {
                "pageLength": 10,
                "searching": false,
                "ordering": false,
                "processing": true,
                "language": {
                    "sProcessing": "处理中...",
                    "sLengthMenu": "每页 _MENU_ 条记录",
                    "sZeroRecords": "没有匹配结果",
                    "sInfo": "第 _PAGE_ 页 ( 共 _PAGES_ 页 )",
                    "sInfoEmpty": "无记录",
                    "sInfoFiltered": "(从 _MAX_ 条记录过滤)",
                    "sInfoPostFix": "",
                    "sSearch": "搜索:",
                    "sUrl": "",
                    "sEmptyTable": "表中数据为空",
                    "sLoadingRecords": "载入中...",
                    "sInfoThousands": ",",
                    "oPaginate": {
                        "sFirst": "首页",
                        "sPrevious": "上页",
                        "sNext": "下页",
                        "sLast": "末页"
                    },
                    "oAria": {
                        "sSortAscending": ": 以升序排列此列",
                        "sSortDescending": ": 以降序排列此列"
                    }
                },
                serverSide: true,
                ajax: {
                    url: '',
                    type: 'GET',
                    cache: false,
                    contentType: "application/json; charset=UTF-8",
                    crossDomain: true,
                    dataType: "json"
                }
            };
            options = $.extend(true, defaults, options);
            if ($.fn.dataTable.isDataTable('.table-data')) {
                if (options.ajax) {
                    var url = options.ajax.url;
                    table = $('.table-data').DataTable().ajax.url(url).load();
                } else {
                    table = $('.table-data').dataTable(options);
                }
            }
            else {
                table = $('.table-data').dataTable(options);
            }
            //table.destroy();
        }
    };

    return {
        guid: (function () {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                  .toString(16)
                  .substring(1);
            }
            return function () {
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                       s4() + '-' + s4() + s4() + s4();
            };
        })(),
        elementOrParentIsFixed: function (element) {
            var $element = $(element);
            var $checkElements = $element.add($element.parents());
            var isFixed = false;
            $checkElements.each(function () {
                if ($(this).css("position") === "fixed") {
                    isFixed = true;
                    return false;
                }
            });
            return isFixed;
        },
        initDataTable: function (options) {
            handleDataTable(options);
        },
        //编辑按钮
        btnEdit: function (url, id) {
            return '<a class="btn green btn-sm edit_btn" href="' + url + '?id=' + id + '"><i class="fa fa-edit"></i> 编辑</a>';
        },
        //删除按钮
        btnDel: function (id) {
            return '<a class="btn red btn-sm delete_btn" href="' + Index.apiUrl('Delete') + '?id=' + id + '"><i class="fa fa-trash"></i> 删除</a>';
        },
    }
});