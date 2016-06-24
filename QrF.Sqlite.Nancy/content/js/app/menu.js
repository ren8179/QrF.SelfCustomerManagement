define(function (require, exports, module) {

    //引入依赖的组件
    var $ = require('jquery'),
        Global = require('mod/global');
    require('jquery.validate')($);
    require('mod/easing')($);
    require('mod/waves')($);
    require('bootstrap-table')($);
    require('mod/dropdown')($);
    require('mod/leanModal')($);
    require('mod/collapsible')($);
    require('mod/formMaterialize')($);

    $(function () {
        Global.menuCode(2, "menu");

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
            },
            submitHandler: function (form) {
                try {
                    var json = {};
                    var formData = $(form).serializeArray();
                    $.each(formData, function () {
                        json[this.name] = (this.value && isNaN(this.value)) ? this.value : Number(this.value);
                    });
                    json.Orderby = json.Orderby + "";
                }
                catch (ex) {
                }
                Global.loadAjaxData('/sys/menuEdit', function (result) {
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
                $(".formValidate").find("input.select-dropdown").val($(".formValidate").find("option[selected]").text());
                $("#ID").val(0);
                $("#Orderby").parent().hide();
            }
        };
        $('.modal-trigger').leanModal(options);

        $(document).on('click', '.edit_btn', function (e) {
            var $btn=$(this);
            options.ready = function () {
                Global.loadAjaxData($btn.attr("href"), function (result) {
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
});