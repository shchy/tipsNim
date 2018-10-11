import Vue from 'vue';
import router from './router';
import store from './store';
import layout from '@/component/layout.vue';
import '@/polyfill';
import '@/css'

new Vue({
    router,
    store,
    components: {
        'root-layout': layout
    }
}).$mount('#app');

