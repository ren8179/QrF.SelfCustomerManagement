define(function (require, exports, module) {

    //引入依赖的组件
    var $ = require('jquery'),
        bootstrap = require('bootstrap'),
        Form = require('mod/form'),
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

    //定义常量及组件初始化
    var API = {
        save: '/customer/infoEdit',
        query: '/customer/infoGet'
    },BUTTONS = {
           SAVE: $('#btn-save')
    },formOptions = {
        ajaxMethod: 'post',
        mode: 1,
        postUrl: API.save,
        putUrl: API.save,
        queryUrl: API.query,
        defaultData: {
            ID: 0,
            Name: "",
            BuyTime: "",
            Days: 0,
            Money: 0,
            Product: "",
            Card: ""
        },
        key: Url.getParam('id'),
        keyName: 'id',
        onInit: function () {
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
                }
            });
        },
        onBeforeSave: function (e, formData) { }
    },appForm = {};

    //业务逻辑
    BUTTONS.SAVE.click(function () {
        var _a = appForm.save();
        _a && _a.done(function (res) {
            if (res.code == 200) {
                $("#modalEdit").closeModal();
                $(".query_btn").click();
            }
        });
    });

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


        var options = {
            dismissible: true, // Modal can be dismissed by clicking outside of the modal
            opacity: .5, // Opacity of modal background
            in_duration: 300, // Transition in duration
            out_duration: 200, // Transition out duration
            ready: function () {
                appForm = new Form('#formValidate', formOptions);
            }
        };
        $('.modal-trigger').leanModal(options);

        $(document).on('click', '.edit_btn', function (e) {
            options.ready = function () {
                formOptions.mode=2;
                appForm = new Form('#formValidate', formOptions);
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