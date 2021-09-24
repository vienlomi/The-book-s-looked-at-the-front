import Vue from "vue";
import Vuex from "vuex";
import authen from "./authen"
import products from "./products"
import cart from "./cart"
import productDetail from "./productDetail"
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pre_url : "",
  },
  mutations: {
    SET_URL(state, url) {
      state.pre_url = url
    }
  },
  actions: {},
  modules: {
    authen,
    products,
    cart,
    productDetail
  },
});
