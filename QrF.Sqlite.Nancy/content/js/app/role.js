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
    require('jstree');

    $(function () {
        bindJsTree();
        
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

        $("#formValidate").validate({
            rules: {
                Name: { required: true },
                Info: { required: true }
            },
            messages: {
                Name: { required: "请填写角色名" },
                Info: { required: "请填写说明" }
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
                        $("#Info").val(result.info).focus();
                        $("#BusinessPermissionString").val(result.businessPermissionString).focus()
                        $("#Name", $('.formValidate')).val(result.name).focus();
                        $("#ID").val(result.iD);
                        bindJsTree(result.businessPermissionString);
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
        Global.loadAjaxData('/sys/menuTree', function (result) {   //复选框树的初始化
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