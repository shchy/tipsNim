import Vue from 'vue';
import router from './router';
import layout from '@/component/layout.vue'

import '@/css/reboot.css'
import '@/css/base.css'

import smoothscroll from 'smoothscroll-polyfill';

smoothscroll.polyfill();

new Vue({
    router,
    components: {
        'root-layout': layout
    }
}).$mount('#app');

