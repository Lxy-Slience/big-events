$(function() {
    // 点击去注册账号，跳转到注册界面
    $('#register').on('click', function() {
            $('.login-box').hide()
            $('.reg-box').show()
        })
        // 点击去登录，跳转到登录界面
    $('#login').on('click', function() {
            $('.login-box').show()
            $('.reg-box').hide()
        })
        //   表单自定义验证规则
    var form = layui.form
    form.verify({
        // 用户名验证
        username: function(value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }
        },
        // 密码框验证
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 再次确认密码框验证
        repwd: function(value) {
            var pwdval = $('#password').val()
            if (value !== pwdval) {
                return '两次密码不一致!'
            }
        }
    })
})