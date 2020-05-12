const urls = {
    server: {
        // 本地调试1
        // production: 'http://192.168.1.14:8000',
        // development: 'http://192.168.1.14:8000'
  
        //  本地调式2
        production: 'http://47.106.76.62:8889',
        development: 'http://47.106.76.62:8889'
    },
    /*
     * TODO NTS管理系统前端接口
     */

    // 登录1
    // loginApi: {
    //     url: '/auth/login'
    // },
    // 登录2
    loginApi: {
        url: '/app/oae/login'
    },

    // 查询设备当前位置
    deviceLocationApi: {
        url: '/app/gps/queryDeviceCurrentLocation'
    },
   

}

export { urls }