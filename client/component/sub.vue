<template>
    <div>
        <h2>{{message}}</h2>
        <p>{{count}}</p>
        <p>
            <button @click="onClick">Add +1</button>
        </p>
    </div>
</template>

<style lang="scss">
body{
    color:blue;
}
</style>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: ['message', 'hello'],
    data() {
        return {
            count: 0
        }
    },
    methods: {
        onClick() {
            console.log('hello');
            this.count = this.count + 1;
        }
    },
});

</script>