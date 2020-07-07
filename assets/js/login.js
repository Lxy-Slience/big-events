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

    // 获取layui的form内置方法
    var form = layui.form
        // 获取layui的layer内置方法
    var layer = layui.layer
        //   表单自定义验证规则
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
        // 给注册页面绑定监听事件
    $('#reg_box').on('submit', function(e) {
            // 阻止表单默认提交行为
            e.preventDefault()
            var data = {
                username: $('#reg_box [name=username]').val(),
                password: $('#reg_box [name=password]').val()
            }
            $.post('/api/reguser', data, function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功，请登录！');
                $('#login').click()
            })
        })
        // 给登录页面绑定监听事件
    $('#login_box').submit(function(e) {
        e.preventDefault()
        var data = $(this).serialize()
        $.post('/api/login', data, function(res) {
            if (res.status !== 0) {
                return layer.msg('登录失败！');
            }
            layer.msg('登陆成功！');
            // 将身份认证值保存到本地存储中
            localStorage.setItem('token', res.token)
                // 跳转到主页index.html
            location.href = '/index.html'
        })
    })
})