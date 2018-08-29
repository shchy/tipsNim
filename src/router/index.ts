import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history', // require service support
    routes: [
        {
            path: '/login',
            component: () => import('@/views/login.vue'),
        },
        {
            path: '/',
            component: () => import('@/views/debug.vue'),
        },
        {
            path: '*',
            component: () => import('@/views/404.vue')

        }
    ]
})