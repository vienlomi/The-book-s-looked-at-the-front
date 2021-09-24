<template>
  <div id="app">
          <hellohead class="header"/>
    <router-view />
    <hellofooter/>
  </div>
</template>
<script>
import hellohead from "./components/header"
import hellofooter from "./components/footer"
export default {
  components: {
    hellohead,
    hellofooter
  },
  created() {
    this.$store.commit("LOAD_CART")
  }
}
</script>

<style scoped>
.header {
       background-color: #fcfcfc;
       border: 1px black;
       max-height: 1em; 
       margin:0;
       margin-bottom: 2em;
       padding: 0;
}
#app {
      max-width: 1240px;
    margin: auto;

}
</style>
