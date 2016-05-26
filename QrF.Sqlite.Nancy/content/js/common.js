seajs.config({
    base: '/Content/',
    paths: {
        'app': 'js/app',
        'mod': 'js/mod',
        'lib': 'js/lib'
    },
    alias: {
        'jquery': 'lib/jquery.js?v=20160524',
        'bootstrap-datepicker': 'lib/datepicker/bootstrap-datepicker.js?v=20160524',
        'bootstrap-datepicker.zh-CN': 'lib/datepicker/bootstrap-datepicker.zh-CN.js?v=20160524',
        'bootstrap': 'lib/bootstrap.js?v=20160524',
        'sweetalert': 'lib/sweetalert/sweetalert-dev.js?v=20160525'
    }
});