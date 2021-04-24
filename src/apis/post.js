import axios from '@/utils/hm_axios'

export const getPostList = (category, pageSize, pageIndex) => {
    return axios({
        url: `/post?category=${category}&pageSize=${pageSize}&pageIndex=${pageIndex}`
    })
}