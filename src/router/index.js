//工程化
import Vue from 'vue'
import Vuerouter from 'vue-router'

Vue.use(Vuerouter)

const router = new Vuerouter({
    routes: [
        {
            name: 'login',
            path: '/login',
            component: () => import('@/views/user/login.vue')
        }
    ]
})

export default router