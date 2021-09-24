<template>
  <b-carousel-list :data="productList" :items-to-show="3" :repeat=true>
        <template #item="list">
            <div class="card">
                <div class="card-image">
                    <figure class="image is-5by4">
                        <a :href="'product/'+ list.product_id"><img :src="list.image_url"></a>
                    </figure>
                    <!-- <b-tag type="is-danger" rounded style="position: absolute; top: 0;"><b>50%</b></b-tag> -->
                </div>
                <div class="card-content">
                    <div class="content">
                        <p class="title is-6">{{ list.title }}</p>
                        <br>
                        <p class="subtitle is-7">{{list.author}}</p>
                        <b-field grouped >
                            <p class="control" v-if="list.rating">
                                <b-rate :value="list.rating" show-score disabled/>
                            </p>
                            <!-- <p class="control" style="margin-left: auto">
                                <b-button size="is-small" type="is-danger" icon-left="heart" outlined />
                            </p> -->
                        </b-field>
                    </div>
                </div>
            </div>
        </template>
    </b-carousel-list>
</template>

<script>
export default {
    props: ["productList"],
    created() {
        this.productList.forEach(p => p.image = p.image_url)
        this.productList.forEach(p => p.title = p.name)
    }

}
</script>

<style>

</style>