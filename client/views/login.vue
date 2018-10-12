<template>
    <div class="login-container">
        <h1>Hello Vue.js!</h1>
        <button @click="onLogin">getToken test</button>
    </div>
</template>

<style>
</style>

<script>
import Vue from "vue";
import getToken from "@/api/auth";

export default {
  name: "Login",
  data() {
    return {};
  },
  methods: {
    onLogin() {
      getToken("test", "test").then(data => alert(data));
    }
  }
};
</script>