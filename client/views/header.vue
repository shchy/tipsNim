<template>
    <div class="header-container">
        <ul>
            <li><router-link to="/"><icon type="fas fa-home" /></router-link></li>
            <li><router-link to="/login"><span>Test</span></router-link></li>
        </ul>
    </div>
</template>

<style scoped>
ul {
  padding: 0;
  margin: 0;
}
li {
  display: inline-block;
  margin-left: 0.5rem;
}
</style>

<script lang="ts">
import Vue from "vue";
import Icon from "@/component/icon.vue";

export default Vue.extend({
  name: "header-menu",
  components: {
    "icon": Icon
  }
});
</script>