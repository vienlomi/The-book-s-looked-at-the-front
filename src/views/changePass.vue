<template>
  <div class="loginCom">
    <div class="login">
      <div class="error" v-for="err in error" :key="err">
        <li>{{ err }}</li>
      </div>
      <div v-if="error.length == 0">
        <label> Type your new password</label>
        <input v-model="pa1" placeholder="Password" type="password" />
        <input v-model="pa2" placeholder="Again" type="password" />

        <button @click="changePass">Reset Your Password</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["token"],
  data() {
    return {
      pa1: "",
      pa2: "",
      error: [],
      jwt: "",
    };
  },
  methods: {
    async changePass() {
      console.log(this.token);
      if (this.pa1.length < 6) {
        this.error.push("tooshort password");
        return;
      }
      if (this.pa1 !== this.pa2) {
        this.error.push("mismatched password");
        return;
      }
      let passJson = JSON.stringify({ password: this.pa2 });
      try {
        let request = axios.create({
          headers: { Authorization: `Bearer ${this.jwt}` },
        });
        await request.post("/change-pass", passJson);
        this.error.push("Your password has been reset");
        setTimeout( () => this.$router.push("/"), 2000)
      } catch (err) {
        this.error.push(err.response.data);
      }
    },
    
  },
  async created() {
      this.error = [];
      try {
      let response = await axios.get(`/reset-token/${this.token}`)
      this.jwt = response.data.token 
      } catch (err) {
          this.error.push("token expireses")
      }
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