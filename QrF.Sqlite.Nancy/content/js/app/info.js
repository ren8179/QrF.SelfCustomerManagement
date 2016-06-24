define(function (require, exports, module) {

    //引入依赖的组件
    var $ = require('jquery'),
        Global = require('mod/global');

    $(function () {
        Global.init(6, "info",function (result) {
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
                $("#CreateTime").val(result.createTime);
            }
        });
        Global.initFormValidate('/customer/infoEdit', {
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
            }
        });

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
    });
});