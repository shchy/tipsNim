<template>
    <div id="layout" v-bind:isOpenMenu="isOpenMenu">
        <nav>
            <a id="close-nav" @click="toggleMenu"><i class="fas fa-times" /></a>
            <router-view id="side-content" name="side" />    
        </nav>
        <div class="content">
            <header>
                <a id="open-nav" @click="toggleMenu"><i class="fas fa-bars" /></a>
                <router-view id="header-content" name="header" />
            </header>
            <main class="main">
                <router-view class="main-content" />
            </main>
        </div>
    </div>
</template>

<style scoped>
#layout {
  height: 100vh;
  display: flex;
}

#layout[isOpenMenu] nav {
  width: 200px;
  transition: width 300ms 0s ease;
}

nav {
  position: absolute;
  height: 100vh;
  background: #fff;

  overflow-y: scroll;
  order: 99;

  width: 0px;

  display: flex;
  flex-direction: column;
  transition: width 200ms 0s ease;
}

#close-nav {
  align-self: flex-end;
  padding-top: 1rem;
  padding-right: 1rem;
}

#open-nav {
  width: auto;
  margin-right: 1rem;
  cursor: pointer;
}

#side-content {
  height: 100%;
  padding-left: 1rem;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column-reverse;

  transition: transform 200ms 0s ease;
}

header {
  height: auto;
  display: flex;
  padding: 1rem;
}

#header-content {
  flex: 1;
  height: 100%;
}

.main {
  flex: 1;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}

.main-content {
  height: 100%;
}

@media screen and (min-width: 768px) {
  /*
    nav{
        position: relative;
        width: 200px;
    }
    #close-nav, #open-nav{
        display: none;
    }
    #side-content {
        padding-top: 1rem;
    }*/
  .content {
    flex-direction: column;
  }
}
</style>


<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      isOpenMenu: false
    };
  },
  methods: {
    toggleMenu: function() {
      this.isOpenMenu = !this.isOpenMenu;
    }
  },
  watch: {
    $route(to, from) {
      this.isOpenMenu = false;
    }
  }
});
</script>