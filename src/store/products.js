
import axios from "axios"
export default {
    state: {
        products: [],
    },
    mutations: {
        SET_PRODUCT(state, products) {
            state.products = products
        }
    },
    actions: {
        async getProduct(context) {
            try {
            let response = await axios.get("/home-list")
            context.commit("SET_PRODUCT", response.data)
            } catch (err) {
                console.log(err.response)
            }
        },
    }
}
