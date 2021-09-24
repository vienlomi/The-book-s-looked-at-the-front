<template>
<div class="homeCate">
  <div class="collection">
      <b-tabs position="is-centered" class="block">
            <b-tab-item v-for="(k,v) in products" :key="v" :label="cate(v)">
              <article class="productList"> 
              <div class="product-items" v-for="p in productList(v)" :key="p.product_id">
                <router-link :to="{name: 'productDetail', params : {id: p.product_id}}">
              <h1> {{p.name}} </h1>
              <img :src="p.image_url"/>
                  </router-link>
                </div>
            
                </article>
            </b-tab-item>
        </b-tabs>
  </div>
  <div class="productList">
          
      </div> 
</div>
</template>

<script>
import { mapState } from "vuex";
export default {
    data() {
        return {
            id: 1
        }
    },
  computed: {
    ...mapState({
      products: (state) => state.products.products
    }),
  },
  methods: {
    productList(v) {
      return this.products[v]
    },
    cate(v) {
      let v_list = v.split("_")
      let cate = ""
      for (let i of v_list) {
        cate += i[0].toUpperCase() + i.slice(1)
        cate += " "
      }
      return cate.slice(0, -1)
    }
  }
};
</script>

<style scoped>
.collection {
    margin:auto;
}
.items {
    padding-left: 2em;
    padding-right: 2em;
    margin: 1em;
}
.productList {
 display: grid;
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
grid-gap: 1rem;  }

img {
    float: left;
    height: auto;
}

.product-items {
  background: #F6F3ED;
  margin: 10px;
  padding: 20px;
  border: 1px dotted maroon;
  display: flex;
  flex-direction: row;
}

</style>