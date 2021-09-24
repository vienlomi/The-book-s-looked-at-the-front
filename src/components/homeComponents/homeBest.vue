<template>
    <b-carousel :autoplay="false" indicator-custom :indicator-inside="false" :overlay="gallery" @click="switchGallery(true)">
        <b-carousel-item v-for="(p) in productList" :key="p.product_id">
            <a class="image ">
                <img :src="p.image_url">
            </a>
        </b-carousel-item>
    </b-carousel>
</template>

<script>
export default {
    props: ["productList"],
    data() {
        return {
            gallery: false
        }
    },
    methods: {
        switchGallery(value) {
            this.gallery = value
            if (value) {
                return document.documentElement.classList.add('is-clipped')
            } else {
                return document.documentElement.classList.remove('is-clipped')
            }
        }
    }
}
</script>

<style>
.is-active .al img {
    border: 1px solid #fff;
    filter: grayscale(0%);
}
.al img {
    border: 1px solid transparent;
    filter: grayscale(100%);
}
</style>