//工程化
import Vue from 'vue'
import Vuerouter from 'vue-router'

Vue.use(Vuerouter)

const router = new Vuerouter({
    routes: [
        {
            path: '/',
            redirect: { name: 'index' }
        },
        {
            name: 'index',
            path: '/index/:id',
            component: () => import('@/views/index.vue')
        },
        {
            name: 'login',
            path: '/login',
            component: () => import('@/views/user/login.vue')
        },
        {
            name: 'register',
            path: '/register',
            component: () => import('@/views/user/register.vue')
        }
        ,
        {
            name: 'personal',
            path: '/personal/:id',
            component: () => import('@/views/user/personal.vue')
        }
        ,
        {
            name: 'edit_profile',
            path: '/edit_profile/:id',
            component: () => import('@/views/user/edit_profile.vue')
        }
        ,
        {
            name: 'postDetail',
            path: '/postDetail/:id',
            component: () => import('@/views/post/postDetail.vue')
        }
        ,
        {
            name: 'myfollow',
            path: '/myfollow',
            component: () => import('@/views/user/myfollow.vue')
        }
        ,
        {
            name: 'mystars',
            path: '/mystars',
            component: () => import('@/views/user/mystars.vue')
        }
        ,
        {
            name: 'comment',
            path: '/comment/:id',
            component: () => import('@/views/comment.vue')
        }
    ]
})


// 导航路由
import { Toast } from "vant"
router.beforeEach((to, from, next) => {
    if (to.path.indexOf('/personal/') !== -1) {
        // 拿到登陆的token
        let token = localStorage.getItem("hmtt_token");
        if (token) {
            next()
        } else {
            // 没登陆跳转到登陆页面
            Toast("请登陆");
            next({ name: 'login' })
        }
    } else {
        next()
    }
    next()
})

export default router