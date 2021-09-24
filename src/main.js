import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import axios from "axios";
import VueAxios from "vue-axios";

router.beforeEach(async (to, from, next) => {
  store.commit("SET_URL", from.path)
  await store.dispatch("checkAuthen");
  next();
});
Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = "http://localhost:9000";

Vue.filter('currency', function (value) {
  return parseFloat(value).toFixed(2)
})

Vue.use(Buefy)
Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
