import axios from 'axios'
import { urls } from './constants'

const jsonUrl = (json) => {
    let arr = []
    let str = ''
    for (let i in json) {
        str = i + '=' + json[i]
        arr.push(str)
    }
    return arr.join('&')
}

// let user = JSON.parse(localStorage.getItem("userInfo"));
// if (user) {
//     axios.defaults.headers.common['token'] = user.token
// }
// //响应拦截器
// axios.interceptors.response.use((response) => {
//     console.log(111)
//     //token 过期
//     if (response.data.status === '200002') {
//         //清空localStorage 重新登录
//         this.$layer.msg('登录超时，请重新登录')
//         localStorage.removeItem('userInfo')
//         localStorage.removeItem('googleAuth')
//         localStorage.removeItem('authMobile')
//         this.$router.replace('/login')
//     }
//     return response
// }, function (error) {
//     // 对响应错误做点什么
//     return Promise.reject(error)
// });




const fetch = (url, data, method, header) => {
    var user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) {
        axios.defaults.headers.common['authorization'] = 'Bearer ' + user.token
    }
    url = url.url
    if (url) {
        for (let k in data) {
            if (url.indexOf(':' + k) !== -1) {
                url = url.replace(':' + k, data[k])
                delete data[k]
            }
        }
    }
    //
    let realUrl = urls.server[process.env.NODE_ENV] + url
        // let realUrl = urls.server.development + url
    let type = method.toLowerCase()
    let res = {}
    var qs = require('qs');
    if (type === 'get') {
        res = axios.get(realUrl + '?' + jsonUrl(data), header)
    } else if (type === 'post') {
        // res = axios.post(realUrl, qs.stringify(data), header)  // "application/x-www-form-urlencoded
        res = axios.post(realUrl, qs.parse(data), header)  // application/json
    } else if (type === 'put') {
        res = axios.put(realUrl, data)
    }
    return res
}

const api = {}

/*
 * TODO NTS管理系统前端接口
 */

// 登录
api.login = params => {
    return fetch(urls.loginApi, params, 'post')
}

// 查询设备当前位置
api.deviceLocation = params => {
    return fetch(urls.deviceLocationApi, params, 'get')
}
  

export { api }