<template>
    <div id="layout" v-bind:isOpenMenu="isOpenMenu">
        <nav class="side-nav">
            <router-view id="side-content" name="side"></router-view>    
        </nav>
        <div class="content">
            <header>
                <a id="side-open" href="#" @click="toggleMenu"><i class="fas fa-bars fa-2x"></i></a>
                <router-view id="header-content" name="header"></router-view>
            </header>
            <main class="main">
                <router-view></router-view>
            </main>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    data() {
        return {
            isOpenMenu: false
        }
    },
    methods:{
        toggleMenu: function (){
            this.isOpenMenu = !this.isOpenMenu;
        }
    },
    watch:{
        $route (to, from){
            this.isOpenMenu = false;
        }
    } 
});

</script>


<style scoped>
#layout {
    height: 100vh;
    display: flex;
    
    
    /*background-image: url(https://www.webfx.com/blog/images/assets/cdn.sixrevisions.com/0431-01_responsive_background_image_demo/images/background-photo.jpg);
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    background-color: #464646;*/
}
#layout[isOpenMenu] .side-nav{
    width: 200px;
    transition: width 300ms 0s ease;
}
#layout[isOpenMenu] .content{
    transform: translateX(200px);
    transition: transform 300ms 0s ease;
}

.side-nav{     
    position: absolute;
    height: 100vh;
    background: #fff;
    
    overflow-y: scroll;
    order: -1;
    
    width: 0px;
    
    display: flex;
    flex-direction: column;
    transition: width 200ms 0s ease;
    
}

#side-close {
    align-self: flex-end;
    padding-top: 1rem;
    padding-right: 1rem;
}

#side-open {
    width: auto;
    margin-right: 1rem;
}

#side-content {
    padding: 1rem;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}

.content{
    flex: 1;
    display: flex;
    flex-direction: column-reverse;
    
    transition: transform 200ms 0s ease;
}

header{
    height: auto;
    display: flex;
    padding: 1rem;
    justify-content: center;
    align-items: center;
}

#header-content {
    flex: 1;
}

.main {
    flex: 1;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}

@media screen and (min-width: 768px) {

    /*
    .side-nav{
        position: relative;
        width: 200px;
    }
    #side-close, #side-open{
        display: none;
    }
    #side-content {
        padding-top: 1rem;
    }*/
    .content{
        flex-direction: column;
    }
   
}
</style>
