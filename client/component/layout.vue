<template>
    <div id="layout">
        <nav class="side-nav" :class="{isOpenMenu: isOpenMenu}">
            <a href="#" @click="closeMenu">x</a>
            <router-view name="side"></router-view>    
        </nav>    
        <div class="content">
            <header>
                <a href="#" @click="openMenu">menu</a>
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

    }
});

</script>


<style scoped>
#layout {
    /* min-height: 100vh; */
    height: 100vh;
    display: flex;
    flex: 1;
}

.side-nav{           
    width: 0px;
    overflow-y: scroll;
    order: -1;
    transition: all 100ms 0s ease;
}

.isOpenMenu{
    width: 200px;
    transition: all 300ms 0s ease;
}

.content{
    display: flex;
    flex-direction: column;   
    flex: 1 
}

header{
    flex: 0
}
.main {
    flex: 1;
    overflow-y: scroll;
}
/*
header{
    background: orange
}

nav{
    background: lightgreen
}
*/

</style>
