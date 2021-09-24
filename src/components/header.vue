<template>
  <b-navbar>
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img
          src="https://vietnamtimes.org.vn/stores/news_dataimages/hang.le/052020/14/17/4958_86196_kiem.jpg"
          alt="19th century"
        />
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item > <router-link to="/">Home</router-link> </b-navbar-item>
      <b-navbar-item href="#"> Shop </b-navbar-item>
      <b-navbar-dropdown label="Info">
        <b-navbar-item href="#"> About </b-navbar-item>
        <b-navbar-item href="#"> Contact </b-navbar-item>
      </b-navbar-dropdown>
    </template>

    <template #end>
      <b-navbar-item tag="div">
        <div class="buttons">
              <router-link class="button is-light" to="/checkout">
               <i class="fa fa-shopping-cart"></i></router-link>
          <div v-if="!isAuthenticated">
            <router-link to="/register" class="button is-primary">
              <strong>Sign up</strong>
            </router-link>
            <router-link class="button is-light" to="/login">
              Log in
            </router-link>
          </div>
          <div v-else>
            <router-link class="button is-light" to="/account">
              Account
            </router-link>
            <b-button @click.prevent="logOut" class="button is-light" href="#">
              Log Out
            </b-button>
          </div>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  computed: {
    cart() {
      return this.$store.state.cart.cart.length;
    },
    isAuthenticated() {
      return this.$store.state.authen.isAuthenticated;
    },
  },
  methods: {
    logOut() {
      this.$store.commit("CLEAR_AUTHEN")
    }
  }
};
</script>