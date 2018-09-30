<template>
    <div id="layout" ref="layout">
        <nav ref="navi">
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
  height: 100%;
  width: 100vw;
  overflow-x: scroll;
  display: flex;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
}

#layout nav {
  min-width: 200px;
  min-height: 100%;
  scroll-snap-align: start;
}

#layout .content {
  min-width: 100%;
  min-height: 100%;
  scroll-snap-align: start;
  background: #fff;
}

nav {
  display: flex;
  flex-direction: column;

  overflow-y: scroll;
}

#close-nav {
  padding-top: 1rem;
  padding-right: 1rem;
  align-self: flex-end;
}

#open-nav {
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
  .content {
    flex-direction: column;
  }
}
</style>


<script >
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      sideWidth: 0
    };
  },
  mounted() {
    this.sideWidth = this.$refs["navi"].scrollWidth;
    this.scrollAtRef("layout", this.sideWidth, 0, "instant");
  },
  methods: {
    toggleMenu: function() {
      var isOpenMenu = this.$refs["layout"].scrollLeft == 0;
      var scrollPos = isOpenMenu ? this.sideWidth : 0;
      this.scrollAtRef("layout", scrollPos, 0, "smooth");
    },
    closeMenu: function() {
      this.scrollAtRef("layout", this.sideWidth, 0, "smooth");
    },
    scrollAtRef: function(refName, x, y, behavior) {
      this.$refs[refName].scroll({
        top: y,
        left: x,
        behavior: behavior
      });
    }
  },
  watch: {
    $route(to, from) {
      this.closeMenu();
    }
  }
});
</script>