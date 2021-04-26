import axios from '@/utils/hm_axios'

export const getPostList = (params) => {
    return axios({
        url: '/post',
        params
    })
}
export const getPostDetail = (id) => {
    return axios({
        url: `/post/${id}`,

    })
}
// 点赞
export const likePost = (id) => {
    return axios({
        url: `/post_like/${id}`,

    })
}
// 收藏
export const starArticle = (id) => {
    return axios({
        url: `/post_star/${id}`
    })
}