import axios from '@/utils/hm_axios'

export const getCateList = function () {
    return axios({
        url: '/category'
    })
}