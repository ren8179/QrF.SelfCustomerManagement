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
        Global.menuCode(6, "info");

        $(".query_btn").on("click", function (e) {
            var args = {};
            $.each($(".query_form").serializeArray(), function () {
                args[this.name] = this.value;
            });
            Global.initBootstrapTable($(".table-data"), {
                columns: [
                    { field: "buyTime", title: "购买日期" },
                    { field: "name", title: "客户姓名" },
                    { field: "days", title: "购买天数" },
                    { field: "money", title: "金额" },
                    { field: "product", title: "产品名称" },
                    { field: "card", title: "卡号" },
                    { field: "contact", title: "联系方式" },
                    { field: "yieldRate", title: "收益率" },
                    { field: "expected", title: "预期收益" },
                    { field: "carrayDate", title: "起息日期" },
                    { field: "dueDate", title: "到期日期" },
                    {
                        title: "操作",
                        formatter: function (value, row) {
                            return Global.btnEdit('/customer/infoGet', row.iD) + Global.btnDel('/customer/infoDelete', row.iD);
                        }
                    },
                ],
                sidePagination: "server",
                pagination: true,
                url: "/customer/infoList",
                queryParams: function (params) { return $.extend({}, args, params) }
            });
            e.preventDefault();
        });
        $(".query_btn").click();

        $("#formValidate").validate({
            rules: {
                BuyTime: { required: true },
                Name: { required: true },
                Days: { required: true },
                Money: { required: true },
                Product: { required: true }
            },
            messages: {
                BuyTime: { required: "请选择购买日期" },
                Name: { required: "请填写客户姓名" },
                Days: { required: "请填写购买天数" },
                Money: { required: "请填写购买金额" },
                Product: { required: "请填写产品名称" }
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
                }
                catch (ex) {
                }
                Global.loadAjaxData('/customer/infoEdit', function (result) {
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
            var $btn = $(this);
            options.ready = function () {
                Global.loadAjaxData($btn.attr("href"), function (result) {
                    if (result) {
                        $("#BuyTime").val(result.buyTime).focus();
                        $("#Days").val(result.days).focus();
                        $("#Money").val(result.money).focus();
                        $("#Product").val(result.product).focus();
                        $("#Card").val(result.card).focus();
                        $("#Contact").val(result.contact).focus();
                        $("#YieldRate").val(result.yieldRate).focus();
                        $("#Expected").val(result.expected).focus();
                        $("#CarrayDate").val(result.carrayDate).focus();
                        $("#DueDate").val(result.dueDate).focus();
                        $("#Remark").val(result.remark).focus();
                        $("#Name", $('.formValidate')).val(result.name).focus();
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