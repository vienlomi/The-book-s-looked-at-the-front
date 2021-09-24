export default {
    state: {
        cart: []
    },
    mutations: {
        ADD_CART(state, product) {
            let index = state.cart.findIndex(p => p.product_id === product.product_id)
            if (index===-1) {
                product.quantity = 1
                state.cart.push(product)
            } else (
                state.cart[index].quantity += 1
            )
            localStorage.setItem("cart", JSON.stringify(state.cart))
        },
        LOAD_CART(state) {
            let cart = JSON.parse(localStorage.getItem("cart"))
            if (cart) {
                state.cart = cart.filter(p => p.quantity != 0)
            }
        },
        SET_CART(state, cart) {
            state.cart = cart
            localStorage.setItem("cart", JSON.stringify(state.cart))
        },
        CLEAR_CART(state) {
            state.cart = []
        }
    }
}

