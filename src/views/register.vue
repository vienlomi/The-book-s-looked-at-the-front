<template>
  <div class="loginCom">
    <div class="login">
      <div class="error" v-for="err in error" :key="err">
        <li>{{ err }}</li>
      </div>
      <label> Email</label>
      <input v-model="user.email" placeholder="Email" />
      <label> Username</label>
      <input v-model="user.user_name" placeholder="Username" />
      <label> Passowrd</label>
      <input
        @keyup.enter="register"
        v-model="user.password"
        placeholder="Password"
        type="password"
      />
      <button @click="register">Register</button>
      <button style="background-color: red">Login with Google</button>
      <button style="background-color: #0f90f3">Login with Facebook</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        user_name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    validate() {
      this.$store.commit("CLEAR_ERROR");
      if (this.user.password.length < 8) {
        this.$store.commit("SET_ERROR", "Password was too short");
      }
      if (this.user.user_name.length < 6) {
        this.$store.commit("SET_ERROR", "Username was too short");
      }
    },
    async register() {
      this.validate();
      if (this.error == []) {
          return
      }
      let response = await this.$store.dispatch("register", this.user)
      if (response) {
        this.$store.commit("CLEAR_ERROR");
         this.$store.commit("SET_ERROR", "Your account is created")
         setTimeout( () => this.$router.push("/login"), 1000)
      }
    },
  },
  computed: {
    error() {
      return this.$store.state.authen.error;
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
  width: 27rem;
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
.error li {
  list-style: none;
}
</style>