import axios from '@/utils/hm_axios'


// 按需导入和导出
export const userLogin = (data) => {
    return axios({
        method: 'post',
        url: '/login',
        data
    })
}
export const userRegister = (data) => {
    return axios({
        method: 'post',
        url: '/register',
        data
    })
}
export const userPersonal = (id) => {
    return axios({
        url: `/user/${id}`,
        // headers: { Authorization: localStorage.getItem('hmtt_token') }
    })
}
export const updateUserInfo = (id, data) => {
    return axios({
        method: 'post',
        url: `/user_update/${id}`,
        data
    })
}