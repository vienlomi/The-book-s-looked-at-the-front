<template>
  <div>
    <b-carousel>
      <b-carousel-item v-for="p in productList" :key="p.product_id">
        <router-link :to="{name: 'productDetail', params: {id: p.product_id}}">
        <section class="hero is-medium">
               <b-image class="image is-5by3" :src="p.image_url"></b-image>
        </section>
        </router-link>
      </b-carousel-item>
    </b-carousel>
  </div>
</template>

<script>

export default {
  props : ["productList"],
};
</script>