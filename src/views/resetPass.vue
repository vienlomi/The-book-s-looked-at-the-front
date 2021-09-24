<template>
  <div class="loginCom">
    <div class="login">
      <div class="error" >
        <li>{{ error }}</li>
      </div>
      <label> Email</label>
      <input v-model="email" placeholder="Email" />
      <button @click="changePass">Reset Your Password</button>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
    data() {
        return {
            email: "",
            error: "",
        }
    },
    methods: {
        async changePass() {
            let passJson = JSON.stringify({email: this.email})
            try {
                await axios.post("/reset", passJson)
                this.error = "Check your email for further instructions"
            } catch (err) {
                this.error = err.response.data
            }
    },
    created() {
        this.error = ""
    }

},

}
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