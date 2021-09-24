import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import login from "../views/login"
import account from "../views/account"
import home from "../views/home"
import productDetail from "../views/productDetail"
import checkOut from "../views/checkOut"
import register from "../views/register"
import resetPass from "../views/resetPass"
import changePass from "../views/changePass"
Vue.use(VueRouter);


const routes = [
  {
    path: "/",
    name: "home",
    component: home
  },
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/register",
    name: "register",
    component: register,
  },
  {
    path: "/reset",
    name: "reset",
    component: resetPass,
  },
  {
    path: "/reset-token/:token",
    props: true,
    name: "reset-token",
    component: changePass
  },
  {
    path: "/account",
    name: "account",
    component: account,
    beforeEnter: (to,from,next) => {
      if (store.state.authen.isAuthenticated) {
        next()
      } else {
        router.push("/login")
      }
    }
  },
  {
    path: "/product/:id",
    props: true,
    name: "productDetail",
    component: productDetail,
  },
  {
    path: "/checkout",
    name: checkOut,
    component: checkOut
  },
  {
    path: "*",
    redirect: "/"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
