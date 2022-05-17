import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
import Dashboard from "../views/Dashboard.vue";
import Tables from "../views/Tables.vue";
import Billing from "../views/Billing.vue";
import RTL from "../views/Rtl.vue";
import Notifications from "../views/Notifications.vue";
import Profile from "../views/Profile.vue";
import SignIn from "../views/auth/SignIn.vue";
import SignUp from "../views/auth/SignUp.vue";
import AppScheduler from "../views/doctor/AppScheduler.vue";
import Dispotime from "../views/doctor/dispotime.vue";
import PatientBoard from "../views/patient/patientboard.vue";
import prendrerdv from "../views/patient/prendrerdv.vue";
import mesRendezVous from "../views/patient/mesRendezVous.vue";
import toConfirmRendezVous from "../views/doctor/toConfirmRendezVous.vue";
import HomeVideo from "../views/video/HomeVideo.vue";

// const doctor = this.$store.state.auth.user.roles[0];
const routes = [
  // if(this.$store.state.auth.user.roles.includes('ROLE_DOCTOR')){

  // }
  {
    path: "/",
    name: "/",
    redirect: "/dashboard",
  },
  {
    path: "/meetvideo",
    name: "meetvideo",
    component: HomeVideo,
  },
  {
    path: "/toConfirmRendezVous",
    name: "toConfirmRendezVous",
    component: toConfirmRendezVous,
  },
  {
    path: "/mesRendezVous",
    name: "mesRendezVous",
    component: mesRendezVous,
  },
  {
    path: "/Dispotime",
    name: "Dispotime",
    component: Dispotime,
  },
  {
    path: "/prendrerdv/:id",
    name: "prendrerdv",
    component: prendrerdv,
  },
  {
    path: "/appScheduler",
    name: "AppScheduler",
    component: AppScheduler,
  },
  {
    path: "/patientboard",
    name: "PatientBoard",
    component: PatientBoard,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
  },
  {
    path: "/billing",
    name: "Billing",
    component: Billing,
  },
  {
    path: "/rtl-page",
    name: "RTL",
    component: RTL,
  },
  {
    path: "/notifications",
    name: "Notifications",
    component: Notifications,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/sign-in",
    name: "SignIn",
    component: SignIn,
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: SignUp,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});
router.beforeEach((to, from, next) => {
  const PublicPages = ["/sign-in", "/sign-up"];
  const authRequired = !PublicPages.includes(to.path);
  if (authRequired && !store.state.auth.user) {
    next("/sign-in");
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  const doctorPages = ["/appScheduler", "/toConfirmRendezVous", "/Dispotime"];
  const doctorRequired = doctorPages.includes(to.fullPath);
  // trying to access a restricted page + not logged in
  // redirect to login page
  if (
    !store.state.auth.user["roles"].includes("ROLE_DOCTOR") &&
    doctorRequired
  ) {
    next("/mesRendezVous");
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  const PatientPages = ["/patientboard", "/mesRendezVous"];
  const PatientRequired = PatientPages.includes(to.fullPath);
  // trying to access a restricted page + not logged in
  // redirect to login page
  if (
    !store.state.auth.user["roles"].includes("ROLE_PATIENT") &&
    PatientRequired
  ) {
    next("/appScheduler");
  } else {
    next();
  }
});

export default router;
