<template>
    <div id="layout">
        <nav class="side-nav" :class="{isOpenMenu: isOpenMenu}">

            <a id="side-close" href="#" @click="closeMenu">x</a>
            <router-view id="side-content" name="side"></router-view>    
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
    height: 100vh;
    display: flex;
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
    padding-top: 1rem;
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
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 1rem;
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
