<template>
    <div class="header-container">
        <ul>
            <li>Head</li>
            <li><router-link to="/">Top</router-link></li>
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

}
</style>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "head"
});
</script>