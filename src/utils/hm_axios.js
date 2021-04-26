import axios from 'axios'

axios.defaults.baseURL = 'http://157.122.54.189:9083'

// 添加请求拦截器
import { Toast } from 'vant'
axios.interceptors.request.use(function (config) {
    // console.log(config);
    let token = localStorage.getItem('hmtt_token')
    if (token) {
        config.headers.Authorization = token
    }
    return config
}, function (error) {
    return Promise.reject(error)
})


// 响应拦截器
axios.interceptors.response.use(function (response) {
    // console.log(response);
    if (response.data.message == "用户信息验证失败!" || response.data.message == '用户信息验证失败') {
        Toast.fail('用户信息验证失败');
        // 拿到用户所在页面的地址
        console.log(window.location.href);
        window.location.href = '#/login?redirect_url=' + window.location.href
    }
    return response
}, function (error) {
    return Promise.reject(error)
})
export default axios