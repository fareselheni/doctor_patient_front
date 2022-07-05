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
import mesRendezVousConfirmé from "../views/patient/mesRendezVousConfirmé.vue";
import toConfirmRendezVous from "../views/doctor/toConfirmRendezVous.vue";
import HomeVideo from "../views/video/HomeVideo.vue";
import doctorDashboard from "../views/doctor/doctorDashboard.vue";
import myPrescriptions from "../views/patient/myPrescriptions.vue";
import paiementSuccess from "../views/paiement/success.vue";
import paiementFail from "../views/paiement/fail.vue";
import patientsList from "../views/doctor/patientsList.vue";

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
    path: "/doctorDashboard",
    name: "doctorDashboard",
    component: doctorDashboard,
  },
  {
    path: "/paiementSuccess",
    name: "paiementSuccess",
    component: paiementSuccess,
  },
  {
    path: "/paiementFail",
    name: "paiementFail",
    component: paiementFail,
  },
  {
    path: "/myPrescriptions",
    name: "myPrescriptions",
    component: myPrescriptions,
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
    path: "/mesRendezVousConfirme",
    name: "mesRendezVousConfirme",
    component: mesRendezVousConfirmé,
  },
  {
    path: "/Dispotime",
    name: "Dispotime",
    component: Dispotime,
  },
  {
    path: "/patientsList",
    name: "patientsList",
    component: patientsList,
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
  const authRequired = !PublicPages.includes(to.fullPath);
  if (authRequired && !store.state.auth.user) {
    next("/sign-in");
  } else {
    next();
  }
});

//Admin Auth Guard
router.beforeEach((to, from, next) => {
  const adminPages = ["/dashboard"];
  const adminRequired = adminPages.includes(to.fullPath);
  const signedIn = localStorage.getItem("user");
  if (signedIn !== null) {
    if (
      !store.state.auth.user["roles"].includes("ROLE_ADMIN") &&
      adminRequired
    ) {
      if (store.state.auth.user["roles"].includes("ROLE_DOCTOR")) {
        next("/doctorDashboard");
      } else {
        next("/patientboard");
      }
    } else {
      next();
    }
  } else {
    next();
  }
});

//Doctor Auth Guard
router.beforeEach((to, from, next) => {
  const doctorPages = [
    "/appScheduler",
    "/toConfirmRendezVous",
    "/Dispotime",
    "/generatePrescription",
  ];
  const doctorRequired = doctorPages.includes(to.fullPath);
  const signedIn = localStorage.getItem("user");
  if (signedIn !== null) {
    if (
      !store.state.auth.user["roles"].includes("ROLE_DOCTOR") &&
      doctorRequired
    ) {
      next("/patientboard");
    } else {
      next();
    }
  } else {
    next();
  }
});

//Patient Auth Guard
router.beforeEach((to, from, next) => {
  const PatientPages = ["/patientboard", "/mesRendezVous"];
  const PatientRequired = PatientPages.includes(to.fullPath);
  const signedIn = localStorage.getItem("user");
  // trying to access a restricted page + not logged in
  // redirect to login page
  if (signedIn !== null) {
    if (
      !store.state.auth.user["roles"].includes("ROLE_PATIENT") &&
      PatientRequired
    ) {
      next("/doctorDashboard");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
