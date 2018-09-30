import Vue from 'vue';
import router from './router';
import layout from '@/component/layout.vue'
import '@/polyfill';
import '@/css'

new Vue({
    router,
    components: {
        'root-layout': layout
    }
}).$mount('#app');

