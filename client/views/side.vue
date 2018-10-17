<template>
  <div class="side-container">
    <ul>
      <li><a href="#" @click.prevent="logout">Logout</a></li>
    </ul>
  </div>
</template>

<style scoped>
.side-container {
  margin: 0.5rem 0rem;
}

ul {
  padding: 0px;
  margin: 0px;
}

ul li {
  list-style-type: none!important;
  padding: 0.5em;
}
</style>

<script lang="ts">
import Vue from "vue";
import {
  DefineGetters,
  DefineMutations,
  DefineActions,
  Dispatcher,
  Committer
} from "vuex-type-helper";
import { AuthActions } from "../store/modules/auth/if";


export default Vue.extend({
  name: "side",
  methods:{
      logout: function() {

        this.$store
          .dispatch<Dispatcher<AuthActions>>({ type: "AUTH_LOGOUT" })
          .then(() => {
            this.$router.push("/login");
          });
      }
  }

});
</script>