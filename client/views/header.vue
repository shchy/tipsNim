<template>
    <div class="header-container">
        <ul>
            <li><router-link to="/"><i class="fas fa-home fa-2x"></i></br>Home</router-link></li>
            <li><router-link to="/login">Test</router-link></li>
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
    margin: 0rem 0.5rem;
}

</style>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "header-menu"
});
</script>