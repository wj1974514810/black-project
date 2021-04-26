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
// 关注
export const followUser = (id) => {
    return axios({
        url: `/user_follows/${id}`,
    })
}
// 取消关注
export const unfollowUser = (id) => {
    return axios({
        url: `/user_unfollow/${id}`,
    })
}
// 获取关注列表
export const getUserFollows = () => {
    return axios({
        url: '/user_follows',
    })
}
// 获取收藏列表
export const getUserStars = () => {
    return axios({
        url: '/user_star',
    })
}