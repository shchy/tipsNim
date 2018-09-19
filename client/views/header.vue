<template>
    <div class="header-container">
        <ul>
            <li><router-link to="/"><i class="fas fa-home"></i><span>Home</span></router-link></li>
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
  text-align: center;
  margin-left: 0.5rem;
  line-height: 0.5em;
}

span::before {
  content: "\A";
  white-space: pre;
}
span {
  font-size: 0.5em;
}
i {
  font-size: 1.5em;
}
</style>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "header-menu"
});
</script>