seajs.config({
    base: '/Content/',
    paths: {
        'app': 'js/app',
        'mod': 'js/mod',
        'lib': 'js/lib'
    },
    alias: {
        'jquery': 'lib/jquery.js?v=20160524',
        'jquery.validate': 'lib/jquery.validate.js?v=20160616',
        'jquery.md5': 'lib/jquery.md5.js?v=20160617',
        'jquery.cookie': 'lib/jquery.cookie.min.js?v=20160620',
        'bootstrap-datepicker': 'lib/datepicker/bootstrap-datepicker.js?v=20160524',
        'bootstrap-datepicker.zh-CN': 'lib/datepicker/bootstrap-datepicker.zh-CN.js?v=20160524',
        'bootstrap-table': 'lib/bootstrap-table/bootstrap-table.js?v=20160610',
        'bootstrap': 'lib/bootstrap.js?v=20160524',
        'sweetalert': 'lib/sweetalert/sweetalert-dev.js?v=20160525',
        'hammer': 'lib/hammer.min.js?v=20160615',
        'velocity': 'lib/velocity.min.js?v=20160615',
        'jstree': 'lib/jstree/jstree.js?v=20160617'
    }
});