<template>
    <div id="layout" v-bind:isOpenMenu="isOpenMenu">
        <nav class="side-nav">
            <a id="side-close" @click="toggleMenu"><i class="fas fa-times"></i></a>
            <router-view id="side-content" name="side"></router-view>    
        </nav>
        <div class="content">
            <header>
                <a id="side-open" @click="toggleMenu"><i class="fas fa-bars"></i></a>
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


<style scoped>
#layout {
  height: 100vh;
  display: flex;
}

#layout[isOpenMenu] .side-nav {
  width: 200px;
  transition: width 300ms 0s ease;
}

.side-nav {
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
  cursor: pointer;
}

#side-content {
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
  .content {
    flex-direction: column;
  }
}
</style>
