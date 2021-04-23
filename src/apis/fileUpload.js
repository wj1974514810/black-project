// 文件上传
import axios from '@/utils/hm_axios'



export const uploadFile = (data) => {
    return axios({
        method: 'post',
        url: '/upload',
        data
    })
}