define(function (require, exports, module) {
    var $ = require('jquery');
    
    require('jquery.validate')($);
    require('mod/easing')($);
    require('mod/waves')($);
    require('bootstrap-table')($);
    require('mod/dropdown')($);
    require('mod/leanModal')($);
    require('mod/collapsible')($);
    require('mod/formMaterialize')($);

    var Hammer = require('hammer'),
    Vel = require('velocity'),
    SweetAlert = require('sweetalert'),
    startLoading = function () {
        var html = '<div class="indeterminate"></div>';
        $(".progress").removeClass("default").prepend(html);
    },
    stopLoading = function () {
        $(".progress").addClass("default").find(".indeterminate").remove();
    },
    toast = function (message, displayLength, className, completeCallback) {
        className = className || "";
        var container = document.getElementById('toast-container');
        if (container === null) {// Create toast container if it does not exist
            container = document.createElement('div');// create notification container
            container.id = 'toast-container';
            document.body.appendChild(container);
        }
        var newToast = createToast(message);// Select and append toast
        if (message) {// only append toast if message is not undefined
            container.appendChild(newToast);
        }
        newToast.style.top = '35px';
        newToast.style.opacity = 0;
        Vel(newToast, { "top": "0px", opacity: 1 }, {// Animate toast in
            duration: 300,
            easing: 'easeOutCubic',
            queue: false
        });
        var timeLeft = displayLength;// Allows timer to be pause while being panned
        var counterInterval = setInterval(function () {
            if (newToast.parentNode === null) window.clearInterval(counterInterval);
            if (!newToast.classList.contains('panning')) {// If toast is not being dragged, decrease its time remaining
                timeLeft -= 20;
            }
            if (timeLeft <= 0) {// Animate toast out
                Vel(newToast, { "opacity": 0, marginTop: '-40px' }, {
                    duration: 375,
                    easing: 'easeOutExpo',
                    queue: false,
                    complete: function () {
                        if (typeof (completeCallback) === "function")// Call the optional callback
                            completeCallback();
                        this[0].parentNode.removeChild(this[0]);// Remove toast after it times out
                    }
                });
                window.clearInterval(counterInterval);
            }
        }, 20);
        function createToast(html) {
            var toast = document.createElement('div');// Create toast
            toast.classList.add('toast');
            if (className) {
                var classes = className.split(' ');
                for (var i = 0, count = classes.length; i < count; i++) {
                    toast.classList.add(classes[i]);
                }
            }
            // If type of parameter is HTML Element
            if (typeof HTMLElement === "object" ? html instanceof HTMLElement : html && typeof html === "object" && html !== null && html.nodeType === 1 && typeof html.nodeName === "string") {
                toast.appendChild(html);
            }
            else if (html instanceof jQuery) {
                toast.appendChild(html[0]);// Check if it is jQuery object
            }
            else {
                toast.innerHTML = html;// Insert as text;
            }
            var hammerHandler = new Hammer(toast, { prevent_default: false });// Bind hammer
            hammerHandler.on('pan', function (e) {
                var deltaX = e.deltaX;
                var activationDistance = 80;
                if (!toast.classList.contains('panning')) {// Change toast state
                    toast.classList.add('panning');
                }
                var opacityPercent = 1 - Math.abs(deltaX / activationDistance);
                if (opacityPercent < 0) opacityPercent = 0;
                Vel(toast, { left: deltaX, opacity: opacityPercent }, { duration: 50, queue: false, easing: 'easeOutQuad' });
            });
            hammerHandler.on('panend', function (e) {
                var deltaX = e.deltaX;
                var activationDistance = 80;
                if (Math.abs(deltaX) > activationDistance) {// If toast dragged past activation point
                    Vel(toast, { marginTop: '-40px' }, {
                        duration: 375,
                        easing: 'easeOutExpo',
                        queue: false,
                        complete: function () {
                            if (typeof (completeCallback) === "function") {
                                completeCallback();
                            }
                            toast.parentNode.removeChild(toast);
                        }
                    });
                } else {
                    toast.classList.remove('panning');
                    Vel(toast, { left: 0, opacity: 1 }, {// Put toast back into original position
                        duration: 300,
                        easing: 'easeOutExpo',
                        queue: false
                    });
                }
            });
            return toast;
        }
    },
    load = function (url, template, type, data, async) {
        type = type || "GET";
        startLoading();
        $.ajax({
            type: type,
            contentType: "application/json; charset=UTF-8",
            url: url,
            async: !async,
            data: data,
            crossDomain: true,
            dataType: "json",
            success: function (result) {
                stopLoading();
                template(result);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                stopLoading();
                if (thrownError === "Unauthorized")
                    window.location.href = "/login.html";
                var json = JSON.parse(xhr.responseText);
                var message = thrownError;
                if (json.message)
                    message = json.message;
                toast('错误详情：<small>' + message + '</small>', 4000);
            }
        });
    };
    $(window).load(function () {
        setTimeout(function () {
            $('body').addClass('loaded');
        }, 200);
    });
    return {
        //删除按钮
        btnDel: function (url, id) {
            return '<a class="btn-floating waves-effect waves-light red margin-right-5 delete_btn" href="' + url + '?id=' + id + '"><i class="mdi-action-delete"></i></a>';
        },
        //编辑按钮
        btnEdit: function (url, id) {
            return '<a class="btn-floating waves-effect waves-light teal margin-right-5 edit_btn" href="' + url + '?id=' + id + '" data-id="'+id+'" ><i class="mdi-image-edit"></i></a>';
        },
        //判断是否全屏
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
        //生成GUID
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
        //初始化页面（使用Global后必须调用一次）
        init: function (parendId, menuCode, initModel) {
            parendId = parendId || 0;
            menuCode = menuCode || "";
            initModel = initModel || function (result) {
                if (result) {
                    $("#ID").val(result.iD);
                    $("#CreateTime").val(result.createTime);
                }
            };

            load("/sys/userInfo", function (result) {
                if (result) {
                    $(".user-details .user-name").prepend(result.loginName);
                    $(".user-details .user-roal").text(result.userName);
                }
            });

            load("/sys/userMenus", function (result) {
                if (result) {
                    var html = '';
                    $.each(result, function (i, v) {
                        if (v.url) {
                            html += '<li class="bold"><a href="' + v.url + '" class="waves-effect waves-cyan"><i class="' + v.icon + '"></i> ' + v.name + '</a></li>';
                        } else {
                            html += '<li class="no-padding"><ul class="collapsible collapsible-accordion"><li class="bold ' + (v.iD == parendId ? 'active' : '') + '">';
                            html += '<a class="collapsible-header waves-effect waves-cyan menu-parent ' + (v.iD == parendId ? 'active' : '') + '" data-parentId="' + v.iD + '"><i class="' + v.icon + '"></i> ' + v.name + '</a>';
                            html += '<div class="collapsible-body"><ul></ul></div>';
                            html += '</li></ul></li>';
                        }
                    });
                    html += '<li class="li-hover"><div class="divider"></div></li>';
                    $("#slide-out").append(html);
                    $(".menu-parent.active").click();
                }
                $(".collapsible").collapsible();
            }, "get", { "ParentId": 1 });

            $(document).on("click", ".menu-parent", function (e) {
                var $this = $(this);
                var parentId = $this.data("parentid");
                if ($this.next().find("ul>li").length)
                    return;
                load("/sys/userMenus", function (result) {
                    if (result) {
                        var html = '';
                        $.each(result, function (i, v) {
                            html += '<li class="' + (v.code == menuCode ? 'active' : '') + '"><a href="' + v.url + '"><i class="' + v.icon + '"></i> ' + v.name + '</a></li>';
                        });
                        $this.next().find("ul").html(html);
                    }
                }, "get", { "ParentId": parentId });
            });

            $(document).on('click', '.delete_btn', function (e) {
                var $btn = $(this);
                SweetAlert({
                    title: "提示",
                    text: "确定要删除该条数据？",
                    type: "warning",
                    showCancelButton: true,
                    cancelButtonText: "取消",
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "删除"
                }, function () {
                    load($btn.attr("href"), function (result) {
                        $(".query_btn").click();
                    });
                });
                e.preventDefault();
            });

            $(document).on('click', '.edit_btn', function (e) {
                var $btn = $(this);
                var options = {
                    dismissible: true, // Modal can be dismissed by clicking outside of the modal
                    opacity: .5, // Opacity of modal background
                    in_duration: 300, // Transition in duration
                    out_duration: 200, // Transition out duration
                    ready: function () {
                        load($btn.attr("href"), initModel);
                    }
                };
                $("#modalEdit").openModal(options);
                e.preventDefault();
            });

            $('select').material_select();

        },
        //初始化表格控件
        initBootstrapTable: function (el, options) {
            if ($.fn.bootstrapTable) {
                el.bootstrapTable('destroy').bootstrapTable($.extend({}, {
                    contentType: 'application/json',
                    method: 'post',
                    queryParamsType: '',
                    rowStyle: function (row, index) {
                        if (index % 2 === 1) {
                            return { classes: 'light-info' };
                        }
                        return {};
                    }
                }, options));
                el.bootstrapTable('resetView');
            }
        },
        //初始化表单验证控件
        initFormValidate: function (url,options) {
            if ($.fn.validate) {
                $("#formValidate").validate($.extend({}, {
                    rules: {
                        Name: { required: true }
                    },
                    messages: {
                        Name: { required: "请填写名称" }
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
                                json[this.name] = (!this.value || isNaN(this.value)) ? this.value : Number(this.value);
                            });
                        }
                        catch (ex) {}
                        load(url, function (result) {
                            $("#modalEdit").closeModal();
                            $(".query_btn").click();
                        }, 'post', JSON.stringify(json));
                        return false;
                    }
                }, options));
            }
        },
        //异步加载数据
        loadAjaxData: load,
        //显示加载状态
        startLoading: startLoading,
        //停止加载状态
        stopLoading: stopLoading,
        //消息提示
        toast: toast,
    }
});