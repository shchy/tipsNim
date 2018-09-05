<template>
    <div class="login-container">
        <h1>Hello Vue.js!</h1>
    </div>
</template>

<style>
</style>

<script lang="ts">
import Vue from "vue";

export default {
  name: "Login",
  data() {
    return {};
  },
  methods: {
    onLogin() {
      console.log("hello");
    }
  }
};
</script>