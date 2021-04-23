import axios from '@/utils/hm_axios'

export const getPostList = (category) => {
    return axios({
        url: `/post?category=${category}`
    })
}