<template>
  <div class="home">
      <homePopular :productList="products.popular" class="popular" />
      <newProduct :productList="products.new_product"/>
      <!-- <homeBest :productList="products.best_sales"/> -->
      <div class="buttons">
      <b-button  type="is-primary"> Shop Now </b-button>
      <p style="font-size: 1.5em">Let's discover what we got. It might fit your reading desire </p>
      </div>
      <homeCate/>

      
  </div>
</template>

<script>
import homePopular from "../components/homeComponents/homePopular"
//import homeBest from "../components/homeComponents/homeBest"
import newProduct from "../components/homeComponents/newProduct"
import homeCate from "../components/homeComponents/homeCate"
import { mapState } from "vuex"
export default {
    components: {
        homePopular,
        //homeBest,
        newProduct,
        homeCate,
    },
    computed: {
        ...mapState({
            products: (state) => state.products.products
        })
    },
    async beforeCreate() {
        await this.$store.dispatch("getProduct")
    }
}
</script>

<style scoped>
.home {
    display: grid;
    background-color: #fcfcfc;
    gap: 2em;
}
.popular {
    grid-row: 1;
    width: 100%;
    padding: 1em 0em 1em;
    padding-bottom: 1em;
    margin: auto;
    border: 1px black; 
}

.buttons {
    padding-left: 10em;
    padding-right: 10em;
    padding-bottom:0em;
    margin: auto;
    margin-bottom: 0em;
    flex-direction: column;
}
.homeCate {
}
</style>