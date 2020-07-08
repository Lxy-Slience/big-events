$(function() {
    // 自定义表单验证
    layui.form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return ('昵称不能超过6位！')
            }
        }
    });

    getUser();
    // 初始化用户的基本信息
    function getUser() {
        $.get('/my/userinfo', function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            layui.form.val('layui-form', res.data)

        })
    };


    // 点击重置按钮，重置用户信息
    $('#btnReset').on('click', function(e) {
            e.preventDefault()
            getUser()
        })
        // 监听表单提交事件
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            // 快速获取表单数据、
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新用户信息失败！')
                }
                layui.layer.msg('更新用户信息成功！')
                    // 调用父页面index.html的渲染用户头像、名字方法
                window.parent.gerUser()

            }
        })
    })
})