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
    },
       BUTTONS = {
           SAVE: $('#btn-save')
       },
       appForm = new Form('#formValidate', {
           ajaxMethod: 'post',
           mode: Url.getParam('mode'),
           postUrl: API.save,
           putUrl: API.save,
           queryUrl: API.query,
           defaultData: {
               id: "",
               name: "这是新增模式为name字段设置的初始值，后面的也是",
               birthday: "1991-06-21",
               hobby: "电影",
               gender: "男",
               work: "前端开发",
               industry: "互联网",
               desc: "这是新增模式为desc字段设置的初始值",
               detailDesc: "这是新增模式为detailDesc字段设置的初始值"
           },
           key: Url.getParam('id'),
           keyName: 'id',
           parseData: function (data) {
               //假设后台男女存的分别是1,2，前端需要的是男女，就可通过这个来解析
               if (data.gender) {
                   data.gender = data.gender == 1 ? '男' : '女';
               }
           },
           onInit: function () {
               alert('Form组件实例的init事件触发了!');
           },
           onBeforeSave: function (e, formData) {
               if (formData.name == '这是新增模式为name字段设置的初始值，后面的也是') {
                   alert('这是通过onBeforeSave添加的校验，名字没有发生改变，不允许保存！');
                   e.preventDefault();
               }
           }
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
            var $btn=$(this);
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
});