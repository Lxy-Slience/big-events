$(function() {
    gerUser()
        // 点击按钮，实现退出功能
    $('#btn_logout').on('click', function() {
        layui.layer.confirm('确定退出登录？', { icon: 5, title: '提示' }, function(index) {
            //do something
            location.href = '/login.html'
            localStorage.removeItem('token')
            layui.layer.close(index);
        });

    })
})

// 获取用户的基本信息
function gerUser() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: { Authorization: localStorage.getItem('token') || '' },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            userPic(res.data)
        },
        // complete: function(res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         location.href = '/login.html'
        //     }
        // }
    });
    // 渲染用户头像
    function userPic(user) {
        var name = user.nickname || user.username
        $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        if (user.user_pic !== null) {
            $('.layui-nav-img').attr('src', user.user_pic).show()
            $('.text-avatar').hide()
        } else {
            $('.layui-nav-img').hide()
            var first = name[0].toUpperCase()
            $('.text-avatar').html(first).show()
        }
    }
}