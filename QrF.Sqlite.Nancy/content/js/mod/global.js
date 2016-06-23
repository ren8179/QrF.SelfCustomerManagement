﻿define(function (require, exports, module) {
    var $ = require('jquery'),
        Hammer = require('hammer'),
        Vel = require('velocity'),
        MenuParentId = 0,
        MenuCode = "";
    var startLoading = function () {
        var html = '<div class="indeterminate"></div>';
        $(".progress").removeClass("default").prepend(html);
    }, stopLoading = function () {
        $(".progress").addClass("default").find(".indeterminate").remove();
    }, toast = function (message, displayLength, className, completeCallback) {
        className = className || "";

        var container = document.getElementById('toast-container');

        // Create toast container if it does not exist
        if (container === null) {
            // create notification container
            container = document.createElement('div');
            container.id = 'toast-container';
            document.body.appendChild(container);
        }

        // Select and append toast
        var newToast = createToast(message);

        // only append toast if message is not undefined
        if (message) {
            container.appendChild(newToast);
        }

        newToast.style.top = '35px';
        newToast.style.opacity = 0;

        // Animate toast in
        Vel(newToast, { "top": "0px", opacity: 1 }, {
            duration: 300,
            easing: 'easeOutCubic',
            queue: false
        });
        // Allows timer to be pause while being panned
        var timeLeft = displayLength;
        var counterInterval = setInterval(function () {
            if (newToast.parentNode === null)
                window.clearInterval(counterInterval);
            // If toast is not being dragged, decrease its time remaining
            if (!newToast.classList.contains('panning')) {
                timeLeft -= 20;
            }
            if (timeLeft <= 0) {
                // Animate toast out
                Vel(newToast, { "opacity": 0, marginTop: '-40px' }, {
                    duration: 375,
                    easing: 'easeOutExpo',
                    queue: false,
                    complete: function () {
                        // Call the optional callback
                        if (typeof (completeCallback) === "function")
                            completeCallback();
                        // Remove toast after it times out
                        this[0].parentNode.removeChild(this[0]);
                    }
                });
                window.clearInterval(counterInterval);
            }
        }, 20);

        function createToast(html) {

            // Create toast
            var toast = document.createElement('div');
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
                // Check if it is jQuery object
                toast.appendChild(html[0]);
            }
            else {
                // Insert as text;
                toast.innerHTML = html;
            }
            // Bind hammer
            var hammerHandler = new Hammer(toast, { prevent_default: false });
            hammerHandler.on('pan', function (e) {
                var deltaX = e.deltaX;
                var activationDistance = 80;

                // Change toast state
                if (!toast.classList.contains('panning')) {
                    toast.classList.add('panning');
                }

                var opacityPercent = 1 - Math.abs(deltaX / activationDistance);
                if (opacityPercent < 0)
                    opacityPercent = 0;

                Vel(toast, { left: deltaX, opacity: opacityPercent }, { duration: 50, queue: false, easing: 'easeOutQuad' });

            });

            hammerHandler.on('panend', function (e) {
                var deltaX = e.deltaX;
                var activationDistance = 80;

                // If toast dragged past activation point
                if (Math.abs(deltaX) > activationDistance) {
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
    }, load = function (url, template, type, data, async) {
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
    }, menuCode = function (parendId, code) {
        MenuParentId = parendId;
        MenuCode = code;
    };

    $(window).load(function () {
        setTimeout(function () {
            $('body').addClass('loaded');
        }, 200);
    });
    $(function () {
        load("/sys/userInfo", function (result) {
            if (result) {
                $(".user-details .user-name").prepend(result.loginName);
                $(".user-details .user-roal").text(result.userName);
            }
        });

        $(document).on("click", ".menu-parent", function (e) {
            var $this = $(this);
            var parentId = $this.data("parentid");
            if ($this.next().find("ul>li").length)
                return;
            load("/sys/userMenus", function (result) {
                if (result) {
                    var html = '';
                    $.each(result, function (i, v) {
                        html += '<li class="' + (v.code == MenuCode ? 'active' : '') + '"><a href="' + v.url + '"><i class="' + v.icon + '"></i> ' + v.name + '</a></li>';
                    });
                    $this.next().find("ul").html(html);
                }
            }, "get", { "ParentId": parentId });
        });

        load("/sys/userMenus", function (result) {
            if (result) {
                var html = '';
                $.each(result, function (i, v) {
                    if (v.url) {
                        html += '<li class="bold"><a href="' + v.url + '" class="waves-effect waves-cyan"><i class="' + v.icon + '"></i> ' + v.name + '</a></li>';
                    } else {
                        html += '<li class="no-padding"><ul class="collapsible collapsible-accordion"><li class="bold ' + (v.iD == MenuParentId ? 'active' : '') + '">';
                        html += '<a class="collapsible-header waves-effect waves-cyan menu-parent ' + (v.iD == MenuParentId ?'active':'')+ '" data-parentId="' + v.iD + '"><i class="' + v.icon + '"></i> ' + v.name + '</a>';
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
    });
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
        //编辑按钮
        btnEdit: function (url, id) {
            return '<a class="btn-floating waves-effect waves-light teal margin-right-5 edit_btn" href="' + url + '?id=' + id + '" data-id="'+id+'" ><i class="mdi-image-edit"></i></a>';
        },
        //删除按钮
        btnDel: function (url, id) {
            return '<a class="btn-floating waves-effect waves-light red margin-right-5 delete_btn" href="' + url + '?id=' + id + '"><i class="mdi-action-delete"></i></a>';
        },
        menuCode: menuCode,
        startLoading: startLoading,
        stopLoading: stopLoading,
        toast: toast,
        loadAjaxData: load,
    }
});