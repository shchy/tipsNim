import Vue from 'vue'
import Router, {NavigationGuard} from 'vue-router'
import store from '../store'

Vue.use(Router)

const isAuthed: NavigationGuard = (to, from, next) =>{
    if(store.getters.isAuthenticated){
        next();
        return;
    }
    next(false);
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
            path: '/',
            components: {
                default: () => import('@/views/login.vue'),
                // side: () => import('@/views/side.vue'),
                // header: () => import('@/views/header.vue'),
            },
        },
        {
            path: '*',
            component: () => import('@/views/404.vue')

        }
    ]
})