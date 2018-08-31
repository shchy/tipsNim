<template>
    <div class="side-container">
        <h1>SideMenu</h1>
        <router-link to="/login">Test</router-link>
        <ul>
          <li v-for="i in 100">
            {{i}}
          </li>
        </ul>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "side"
});
</script>