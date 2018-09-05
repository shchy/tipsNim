<template>
    <div class="side-container">
        <h1>SideMenu</h1>
        <ul>
          <li><router-link to="/">Top</router-link></li>
          <li><router-link to="/login">Test</router-link></li>

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