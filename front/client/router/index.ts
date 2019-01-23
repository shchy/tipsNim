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
            component: () => import('@/component/layout.vue'),
            children: [
                {
                    path: '',
                    components: {
                        side: () => import('@/views/side.vue'),
                        default: () => import('@/views/home/home.vue'),
                        header: () => import('@/views/home/header.vue'),
                    }
                },
            ],
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