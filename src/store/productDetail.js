import axios from "axios"

export default {
    state: {
        productDetail: {}
    },
    mutations: {
        SET_PRODUCTDETAIL(state, product) {
            state.productDetail = product
        } 
    },
    actions: {
        async getProductDetail(context, id) {
            try {
                let response = await axios.get(`/products/${id}`)
                context.commit("SET_PRODUCTDETAIL", response.data)
            } catch (err) {
                console.log(err.response)
            }
        }
    }
}