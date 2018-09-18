<template>
    <div class="debug-container">
        <h1>Hello Vue.js! test</h1>
        <my-component message="My Counter for TypeScript"></my-component>
        <router-link to="/login">Test</router-link>
        <button @click="handleLogin" >Test</button>
    </div>
</template>

<style scoped>
body {
  background: #eee;
  font-family: "Roboto", sans-serif;
}

h1,
h2 {
  font-weight: normal;
}

.debug-container {
  text-align: center;
}

</style>
<script lang="ts">
import Vue from "vue";
import MyComponent from "@/component/sub.vue";

export default Vue.extend({
  name: "debug",
  methods: {
    handleLogin() {
      console.log("hello");
      this.$router.push({ path: "/login" });
    }
  },
  components: {
    "my-component": MyComponent
  }
});
</script>