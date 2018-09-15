<template>
    <div id="layout">
        <nav class="side-nav" :class="{isOpenMenu: isOpenMenu}">
            <a id="side-close" href="#" @click="closeMenu">x</a>
            <router-view id="side-content" name="side"></router-view>    
        </nav>    
        <div class="content">
            <header>
                <a id="side-open" href="#" @click="openMenu">menu</a>
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
        openMenu: function (){
            this.isOpenMenu = true;
        },
        closeMenu: function (){
            this.isOpenMenu = false;
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

.side-nav{     
    position: absolute;
    height: 100vh;
    background: #fff;
    border-right: 1px solid #333;
    width: 0px;
    overflow-y: scroll;
    order: -1;
    transition: width 100ms 0s ease;
    display: flex;
    flex-direction: column;
}

#side-close {
    align-self: flex-end;
    padding-top: 0.5rem;
    padding-right: 1rem;
}

#side-content {
    padding-left: 1rem;
    overflow-y: scroll;
}

.isOpenMenu{
    width: 200px;
    transition: width 300ms 0s ease;
}

.content{
    flex: 1;
    padding: 1rem;
    display: flex;
    flex-direction: column;
}

header{
    height: auto;
    display: flex;
}

#side-open {
    width: auto;
    margin-right: 1rem;
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

    .side-nav{
        position: relative;
     
        width: 200px;
    }
    #side-close, #side-open{
        display: none;
    }
    #side-content {
        padding-top: 1rem;
    }
   
}
</style>
