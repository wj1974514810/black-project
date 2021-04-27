import axios from '@/utils/hm_axios'

export const getPostList = (params) => {
    return axios({
        url: '/post',
        params
    })
}
// 文章详情
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

// 获取评论数据
export const getCommentList = (id, params) => {
    return axios({
        url: `/post_comment/${id}`,
        params
    })
}

// 发表+回复评论
export const publishComment = (id, data) => {
    return axios({
        method: 'post',
        url: `/post_comment/${id}`,
        data
    })
}

export const searchArticle = (keyword) => {
    return axios({
        url: `/post_search?keyword=` + keyword,
    })
}