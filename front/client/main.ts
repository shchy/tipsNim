import Vue from 'vue';
import router from './router';
import store from './store';
import '@/polyfill';
import '@/css'
import "@/api/fetch-interceptor"

new Vue({
    router,
    store,
}).$mount('#app');

