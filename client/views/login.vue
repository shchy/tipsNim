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

<style>
.login-container {
  position: relative;
}

form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  width: 200px;
}

form {
  border: solid #eee 1px;
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

<script>
import Vue from "vue";
import authApi from "@/api/auth";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login: function() {
      const { username, password } = this;

      authApi.getToken(username, password).then(data => {
        alert(data);
      });
    }
  }
};
</script>