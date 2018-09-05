import Vue from 'vue';
import router from './router';
import layout from '@/component/layout.vue'

import '@/css/reboot.css'

new Vue({
    router,
    components:{
        'root-layout': layout
    } 
}).$mount('#app');

