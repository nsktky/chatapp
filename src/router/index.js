import Vue from "vue";
import VueRouter from "vue-router";
// import HomeView from '../views/HomeView.vue'
import UserList from "../views/UserList.vue";
import ChatBoard from "../views/ChatBoard.vue";
import UserLogin from "../views/UserLogin.vue";
import SignUp from "../views/SignUp.vue";
import firebase from "@/firebase/firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "UserListme",
    component: UserList,
    meta: { requiresAuth: true },
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/chat",
    name: "ChatBoard",
    component: ChatBoard,
  },
  {
    path: "/userlogin",
    name: "UserLogin",
    component: UserLogin,
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth) {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        next({
          path: "/userlogin",
          query: { redirect: to.fullPath },
        });
      } else {
        next();
      }
    });
  } else {
    next();
  }
});

export default router;
