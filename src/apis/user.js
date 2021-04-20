import axios from '@/utils/hm_axios'


// 按需导入和导出
export const userLogin = (data) => {
    return axios({
        method: 'post',
        url: '/login',
        data
    })
}