import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/HomeComponent.vue";
import Login from "./components/LoginComponent.vue";
import Register from "./components/RegisterComponent.vue";
// lazy-loaded
const Profile = () => import("./components/ProfileComponent.vue")
const BoardAdmin = () => import("./components/BoardAdmin.vue")
const BoardPatient = () => import("./components/BoardPatient.vue")
const BoardDoctor = () => import("./components/BoardDoctor.vue")
const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: Profile,
  },
  {
    path: "/admin",
    name: "admin",
    // lazy-loaded
    component: BoardAdmin,
  },
  {
    path: "/patient",
    name: "patient",
    // lazy-loaded
    component: BoardPatient,
  },
  {
    path: "/doctor",
    name: "doctor",
    // lazy-loaded
    component: BoardDoctor,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login', '/register', '/home'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');

//   // trying to access a restricted page + not logged in
//   // redirect to login page
//   if (authRequired && !loggedIn) {
//     next('/login');
//   } else {
//     next();
//   }
// });


export default router;