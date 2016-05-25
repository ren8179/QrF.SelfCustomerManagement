define(function (require, exports, module) {
    var $ = require('jquery');
    var Notification = function () {

        'use strict';

        var number = 0;
        var incPosition = 0;

        var template = function (title, text, image, position) {
            incPosition = number * 120;
            number = number + 1;
            var textHtml = '<div class="text">' + text + '</div>';
            var titleHtml = (!title ? '' : '<div class="title">' + title + '</div>');
            var imageHtml = (!image ? '' : '<div class="illustration"><img src="' + image + '" width="70" height="70" /></div>');
            var style;
            switch (parseInt(position, 10)) {
                case 1:
                    style = "top:" + incPosition + "px; left:20px;";
                    break;
                case 2:
                    style = "top:" + incPosition + "px; right:20px;";
                    break;
                case 3:
                    style = "bottom:" + incPosition + "px; right:20px;";
                    break;
                case 4:
                    style = "bottom:" + incPosition + "px; left:20px;";
                    break;
                default:
                    ;
            }
            return {
                id: number,
                content: '<div class="notification notification-' + number + ' " style="' + style + '">' +
                    '<a href="javascript:$(document).find(\'.notification-' + number + '\').remove();" class="dismiss">&#10006;</a>' +
                    imageHtml +
                    '<div class="text">' + titleHtml + textHtml + '</div>' +
                    '</div>'
            };
        };

        return {
            show: function (title, text, image, animation, position, delay) {
                var notification = template(title, text, image, position);
                $(notification.content).addClass('animated ' + animation).appendTo('body');
                if (!delay) {
                    delay = 2;
                }
                setTimeout(function () {
                    Notification.close(notification.id);
                }, 1000 * delay);
            },
            showRightBottom:function(title,text,delay){
                Notification.show(title, text, '', "fadeInLeftBig", 3, delay||5);
            },
            close: function (id) {
                id = id || '';
                if (id) {
                    $(document).find('.notification-' + id).remove();
                    number = number - 1;
                } else {
                    $(document).find('.notification').remove();
                }
            }
        };

    }();
    return Notification;
});