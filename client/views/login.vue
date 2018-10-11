<template>
    <div class="login-container">
        <h1>Hello Vue.js!</h1>
        <button @click="onLogin">getToken test</button>
    </div>
</template>

<style>
</style>

<script lang="ts">
import Vue from "vue";
import getToken from "../api/auth";

export default {
  name: "Login",
  data() {
    return {};
  },
  methods: {
    onLogin() {
      console.log("hello");
      var result = getToken("", "");
      alert(result);
    }
  }
};
</script>