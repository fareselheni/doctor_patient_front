<template>
  <div
    class="w-auto h-auto collapse navbar-collapse max-height-vh-100 h-100"
    id="sidenav-collapse-main"
  >
    <ul class="navbar-nav">
      <div v-if="showAdminBoard">
        <li class="nav-item">
          <sidenav-collapse
            url="#"
            :aria-controls="''"
            v-bind:collapse="false"
            collapseRef="dashboard"
            navText="Dashboard"
          >
            <template v-slot:icon>
              <i class="material-icons-round opacity-10 fs-5">dashboard</i>
            </template>
          </sidenav-collapse>
        </li>
        <li class="nav-item">
          <sidenav-collapse
            url="#"
            :aria-controls="''"
            v-bind:collapse="false"
            collapseRef="gestionAdmin"
            navText="Gestion administrateur"
          >
            <template v-slot:icon>
              <i class="material-icons-round opacity-10 fs-5">dashboard</i>
            </template>
          </sidenav-collapse>
        </li>
        <!-- <li class="nav-item">
          <sidenav-collapse
            url="#"
            :aria-controls="''"
            v-bind:collapse="false"
            collapseRef="tables"
            navText="Tables"
          >
            <template v-slot:icon>
              <i class="material-icons-round opacity-10 fs-5">table_view</i>
            </template>
          </sidenav-collapse>
        </li> -->
        <!-- <li class="nav-item">
          <sidenav-collapse
            url="#"
            :aria-controls="''"
            v-bind:collapse="false"
            collapseRef="billing"
            navText="Billing"
          >
            <template v-slot:icon>
              <i class="material-icons-round opacity-10 fs-5">receipt_long</i>
            </template>
          </sidenav-collapse>
        </li> -->
        <!-- <li class="nav-item">
          <sidenav-collapse
            url="#"
            :aria-controls="''"
            v-bind:collapse="false"
            collapseRef="rtl-page"
            navText="Rtl"
          >
            <template v-slot:icon>
              <i class="material-icons-round opacity-10 fs-5"
                >format_textdirection_r_to_l</i
              >
            </template>
          </sidenav-collapse>
        </li> -->
        <!-- <li class="nav-item">
          <sidenav-collapse
            url="#"
            :aria-controls="''"
            v-bind:collapse="false"
            collapseRef="notifications"
            navText="Notifications"
          >
            <template v-slot:icon>
              <i class="material-icons-round opacity-10 fs-5">notifications</i>
            </template>
          </sidenav-collapse>
        </li> -->
      </div>
      <div v-if="!currentUser">
        <li class="mt-3 nav-item">
          <h6
            class="text-xs ps-4 text-uppercase font-weight-bolder text-white"
            :class="this.$store.state.isRTL ? 'me-4' : 'ms-2'"
          >
            ACCOUNT PAGES
          </h6>
        </li>
        <!-- <li class="nav-item">
          <sidenav-collapse
            url="#"
            :aria-controls="''"
            v-bind:collapse="false"
            collapseRef="profile"
            navText="Profile"
          >
            <template v-slot:icon>
              <i class="material-icons-round opacity-10 fs-5">person</i>
            </template>
          </sidenav-collapse>
        </li> -->
        <li class="nav-item">
          <sidenav-collapse
            url="#"
            :aria-controls="''"
            v-bind:collapse="false"
            collapseRef="sign-in"
            navText="SignIn"
          >
            <template v-slot:icon>
              <i class="material-icons-round opacity-10 fs-5">login</i>
            </template>
          </sidenav-collapse>
        </li>
        <li class="nav-item">
          <sidenav-collapse
            url="#"
            :aria-controls="''"
            v-bind:collapse="false"
            collapseRef="sign-up"
            navText="SignUp"
          >
            <template v-slot:icon>
              <i class="material-icons-round opacity-10 fs-5">assignment</i>
            </template>
          </sidenav-collapse>
        </li>
      </div>
      <div v-if="showDoctorBoard">
        <li class="nav-item">
          <sidenav-collapse
            url="#"
            :aria-controls="''"
            v-bind:collapse="false"
            collapseRef="doctorDashboard"
            navText="Dashboard Docteur"
          >
            <template v-slot:icon>
              <i class="material-icons-round opacity-10 fs-5">dashboard</i>
            </template>
          </sidenav-collapse>
        </li>
        <li class="nav-item">
          <sidenav-collapse
            url="#"
            :aria-controls="''"
            v-bind:collapse="false"
            collapseRef="appScheduler"
            navText="Calendrier"
          >
            <template v-slot:icon>
              <i class="material-icons-round opacity-10 fs-5">dashboard</i>
            </template>
          </sidenav-collapse>
        </li>
        <li class="nav-item">
          <sidenav-collapse
            url="#"
            :aria-controls="''"
            v-bind:collapse="false"
            collapseRef="patientsList"
            navText="Mes patients"
          >
            <template v-slot:icon>
              <i class="material-icons-round opacity-10 fs-5">dashboard</i>
            </template>
          </sidenav-collapse>
        </li>
        <li class="nav-item">
          <sidenav-collapse
            url="#"
            :aria-controls="''"
            v-bind:collapse="false"
            collapseRef="Dispotime"
            navText="Disponibilite"
          >
            <template v-slot:icon>
              <i class="material-icons-round opacity-10 fs-5">dashboard</i>
            </template>
          </sidenav-collapse>
        </li>
        <li class="nav-item">
          <sidenav-collapse
            url="#"
            :aria-controls="''"
            v-bind:collapse="false"
            collapseRef="toConfirmRendezVous"
            navText="Rendez-vous à confirmer"
          >
            <template v-slot:icon>
              <i class="material-icons-round opacity-10 fs-5">dashboard</i>
            </template>
          </sidenav-collapse>
        </li>
        <li class="nav-item">
          <router-link to="/meetvideo">
            <sidenav-collapse
              url="#"
              :aria-controls="''"
              v-bind:collapse="false"
              collapseRef="HomeVideo"
              navText="Visioconférence"
            >
              <template v-slot:icon>
                <i class="material-icons-round opacity-10 fs-5">dashboard</i>
              </template>
            </sidenav-collapse>
          </router-link>
        </li>
      </div>
      <div v-if="showPatientBoard">
        <li class="nav-item">
          <router-link to="/patientboard">
            <sidenav-collapse
              url="#"
              :aria-controls="''"
              v-bind:collapse="false"
              collapseRef="patientboard"
              navText="Rechercher un docteur"
            >
              <template v-slot:icon>
                <i class="material-icons-round opacity-10 fs-5">dashboard</i>
              </template>
            </sidenav-collapse>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/mesRendezVous">
            <sidenav-collapse
              url="#"
              :aria-controls="''"
              v-bind:collapse="false"
              collapseRef="mesRendezVous"
              navText="Rendez-vous non confirmé"
            >
              <template v-slot:icon>
                <i class="material-icons-round opacity-10 fs-5">dashboard</i>
              </template>
            </sidenav-collapse>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/mesRendezVousConfirme">
            <sidenav-collapse
              url="#"
              :aria-controls="''"
              v-bind:collapse="false"
              collapseRef="mesRendezVousConfirme"
              navText="Rendez-vous confirmé"
            >
              <template v-slot:icon>
                <i class="material-icons-round opacity-10 fs-5">dashboard</i>
              </template>
            </sidenav-collapse>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/myPrescriptions">
            <sidenav-collapse
              url="#"
              :aria-controls="''"
              v-bind:collapse="false"
              collapseRef="myPrescriptions"
              navText="mes Ordonnances"
            >
              <template v-slot:icon>
                <i class="material-icons-round opacity-10 fs-5">dashboard</i>
              </template>
            </sidenav-collapse>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/meetvideo">
            <sidenav-collapse
              url="#"
              :aria-controls="''"
              v-bind:collapse="false"
              collapseRef="HomeVideo"
              navText="Visioconférence"
            >
              <template v-slot:icon>
                <i class="material-icons-round opacity-10 fs-5">dashboard</i>
              </template>
            </sidenav-collapse>
          </router-link>
        </li>
      </div>
      <div v-if="currentUser">
        <li class="mt-3 nav-item">
          <h6
            class="text-xs ps-4 text-uppercase font-weight-bolder text-white"
            :class="this.$store.state.isRTL ? 'me-4' : 'ms-2'"
          >
            ACCOUNT PAGES
          </h6>
        </li>
        <!-- <li class="nav-item">
          <router-link to="/profile">
            <sidenav-collapse
              url="#"
              :aria-controls="''"
              v-bind:collapse="false"
              collapseRef="profile"
              navText="Profile"
            >
              <template v-slot:icon>
                <i class="material-icons-round opacity-10 fs-5">person</i>
              </template>
            </sidenav-collapse>
          </router-link>
        </li> -->
        <li class="nav-item">
          <sidenav-collapse
            url="#"
            :aria-controls="''"
            v-bind:collapse="false"
            navText="Signout"
            @click.prevent="logOut"
          >
            <template v-slot:icon>
              <i class="material-icons-round opacity-10 fs-5">person</i>
            </template>
          </sidenav-collapse>
        </li>
      </div>
    </ul>
  </div>
</template>
<script>
import SidenavCollapse from "./SidenavCollapse.vue";

export default {
  name: "SidenavList",
  props: {
    cardBg: String,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser["roles"]) {
        return this.currentUser["roles"].includes("ROLE_ADMIN");
      }
      return false;
    },
    showPatientBoard() {
      if (this.currentUser && this.currentUser["roles"]) {
        return this.currentUser["roles"].includes("ROLE_PATIENT");
      }
      return false;
    },
    showDoctorBoard() {
      if (this.currentUser && this.currentUser["roles"]) {
        return this.currentUser["roles"].includes("ROLE_DOCTOR");
      }
      return false;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/sign-in");
    },
  },
  data() {
    return {
      title: "Soft UI Dashboard PRO",
      controls: "dashboardsExamples",
      isActive: "active",
    };
  },
  components: {
    SidenavCollapse,
  },
};
</script>
