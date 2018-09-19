<template>
<div>
    <i :class="type" /><span v-if="text" >{{text}}</span>
</div>
</template>

<style scoped>

div {
  line-height: 0.8em;
  text-align: center;
}
  
span::before {
  content: "\A";
  white-space: pre;
}
span {
  font-size: 0.5em;
}

</style>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: ['type', 'text'],
});

</script>