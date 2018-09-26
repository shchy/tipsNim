import Vue from 'vue';
import router from './router';
import layout from '@/component/layout.vue'
import polyfill from './polyfill';

import '@/css/reboot.css'
import '@/css/base.css'

polyfill.resolve()

new Vue({
    router,
    components: {
        'root-layout': layout
    }
}).$mount('#app');

