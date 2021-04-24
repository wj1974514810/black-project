import axios from '@/utils/hm_axios'

export const getPostList = (params) => {
    return axios({
        url: '/post',
        params
    })
}