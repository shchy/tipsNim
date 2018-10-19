import Vue from 'vue';
import router from './router';
import store from './store';
import '@/polyfill';
import '@/css'

new Vue({
    router,
    store,
}).$mount('#app');

