<template>
    <div class="login-container">
        <form @submit.prevent="login" >
          <h1>Sign in</h1>

          <label>User Name</label>
          <input required v-model="username" type="text" />

          <label>Password</label>
          <input required v-model="password" type="password" />

          <div class="on-right">
            <button type="submit">Sign in</button>
          </div>
        </form>
    </div>
</template>

<style scoped>
.login-container {
  height: 100%;
  width: 100vw;
  position: relative;
}

form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  width: 200px;
}

form label,
form input {
  display: block;
  margin: 0.5rem 0.5rem;
  width: calc(200px - 1.5rem);
}

.on-right {
  text-align: right;
}
</style>

<script lang='ts'>
import { Component, Prop, Emit, Watch, Vue } from "vue-property-decorator";
import {
  DefineGetters,
  DefineMutations,
  DefineActions,
  Dispatcher,
  Committer
} from "vuex-type-helper";
import { AuthActions } from "../store/modules/auth/if";

@Component({})
export default class Login extends Vue {
  // data
  username: string = "";
  password: string = "";

  // methods
  logout(): void {
    this.$store
      .dispatch<Dispatcher<AuthActions>>({ type: "AUTH_LOGOUT" })
      .then(() => {
        this.$router.push("/login");
      });
  }
  login(): void {
    this.$store
      .dispatch<Dispatcher<AuthActions>>({
        type: "AUTH_REQUEST",
        id: this.username,
        password: this.password
      })
      .then(resp => {
        this.$router.push("/");
      });
  }
}
</script>