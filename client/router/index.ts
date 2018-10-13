import Vue from 'vue'
import Router, { NavigationGuard } from 'vue-router'
import store from '../store'

Vue.use(Router)


const isAuthed: NavigationGuard = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        next();
        return;
    }
    next("/login");
};

const isNotAuthed: NavigationGuard = (to, from, next) => {
    if (!store.getters.isAuthenticated) {
        next();
        return;
    }
    next("/");
};

export default new Router({
    mode: 'history', // require service support
    routes: [
        {
            path: '/',
            components: {
                default: () => import('@/views/debug.vue'),
                side: () => import('@/views/side.vue'),
                header: () => import('@/views/header.vue'),
            },
            beforeEnter: isAuthed,
        },
        {
            path: '/login',
            components: {
                default: () => import('@/views/login.vue'),
                // side: () => import('@/views/side.vue'),
                // header: () => import('@/views/header.vue'),
            },
            beforeEnter: isNotAuthed,
        },
        {
            path: '*',
            component: () => import('@/views/404.vue')

        }
    ]
})