import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history', // require service support
    routes: [
        {
            path: '/login',
            components:{
                default: () => import('@/views/login.vue'),
                side: () => import('@/views/side.vue'),
            } 
        },
        {
            path: '/',
            components: {
                default: () => import('@/views/debug.vue'),
                side: () => import('@/views/side.vue'),
            }
        },
        {
            path: '*',
            component: () => import('@/views/404.vue')

        }
    ]
})