<template>
  <div class="detail">
      <div class="description">
           
      <h1 class="d-items" >
          <h1>Name: {{product.name}}</h1></h1>
      <h2 class="d-items">Author: {{product.author}} </h2>
         <h4 class="d-items">Description: {{product.description}}</h4>
         <h4 class="d-items">Price: {{product.price | currency}}</h4>
      <h4 class="d-items"><b-button @click="addCart(product)">Add to Cart</b-button></h4>
      </div>
      <h3><img :src="product.image_url"/></h3>
   
      
  </div>
</template>

<script>

export default {
  props: ["id"],
  computed: {
    product() {
        return this.$store.state.productDetail.productDetail
    }      
  },
  methods: {
      addCart(p) {
          this.$store.commit("ADD_CART", p)
      }
  },
  created() {
      this.$store.dispatch("getProductDetail", this.id)
  },
};
</script>

<style scoped>
.detail {
    display: grid;
    gap: 1em;
    grid-template: 1.5fr 1fr
}
h3 {
    grid-row: 1 / 3;
    grid-column: 1
}
.description {
    grid-column: 2;
}
.d-items {
    padding: 2em;
    font-size: 1.2rem;
    display: flex;
}
</style>