<template>
  <div class="loginCom">
    <div class="login">
      <div class="error" v-for="err in error" :key="err">
        <li>{{ err }}</li>
      </div>
      <label> Email</label>
      <input v-model="user.account" placeholder="Username or Email" />
      <label> Passowrd</label>
      <input
        @keyup.enter="signin"
        v-model="user.password"
        placeholder="Password"
        type="password"
      />
      <button @click="signin">Login</button>
      <router-link to="/register">Or Create a New Account</router-link>
      <router-link to="/reset">Reset Password</router-link>
      <button style="background-color: red">Login with Google</button>
      <button style="background-color: #0f90f3">Login with Facebook</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      user: {
        account: "",
        password: "",
      },
    };
  },
  computed: {
    error() {
      return this.$store.state.authen.error;
    },
    pre_url() {
      return this.$store.state.pre_url;
    },
  },
  methods: {
    validate() {
      this.$store.commit("CLEAR_ERROR");
      if (this.user.password.length < 8) {
        this.$store.commit("SET_ERROR", "Password was too short");
      }
      if (this.user.account.length < 6) {
        this.$store.commit("SET_ERROR", "Invalid");
      }
    },
    ...mapActions(["login"]),
    ...mapMutations(["SET_ERROR"]),
    async signin() {
      this.validate();
      if (this.error.length > 0) {
         return;
      }
      let identity = {};
      if (this.user.account.includes("@")) {
        identity.email = this.user.account;
      } else {
        identity.user_name = this.user.account;
      }
      identity.password = this.user.password;
      await this.login(identity);
      if (this.error.length == 0) {
        if ((this.pre_url == "/login") | (this.pre_url == "/register")) {
          this.$router.push("/");
        } else {
          this.$router.push({ path: this.pre_url });
        }
      }
    },
  },
  created() {
    this.$store.commit("CLEAR_ERROR");
  },
};
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  width: 20rem;
  margin: auto;
  padding: 1.5em;
  background-color: bisque;
  border-radius: 1em;
  font-size: 1.3em;
  letter-spacing: 0.1em;
  font-family: sans-serif;
}

input,
button {
  margin: 0.25em;
  padding: 0.4em;
  font-size: 0.75em;
  border-radius: 0.5em;
}
.login a {
  font-size: 0.7em;
}
.error li {
  list-style: none;
}
</style>