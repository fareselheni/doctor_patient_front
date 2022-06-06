<template>
  <navbar btnBackground="bg-gradient-success" />
  <div
    class="page-header align-items-start min-vh-100"
    style="
      background-image: url('https://media.istockphoto.com/photos/doctor-writing-a-medical-prescription-picture-id1319031310?b=1&k=20&m=1319031310&s=170667a&w=0&h=crYyw4Jk5naigYVJEALChMZoAeld_kjaoIpNIaAnCZQ=');
    "
  >
    <span class="mask bg-gradient-dark opacity-6"></span>
    <div class="container my-auto">
      <div class="row">
        <div class="col-lg-4 col-md-8 col-12 mx-auto">
          <div class="card z-index-0 fadeIn3 fadeInBottom">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div
                class="bg-gradient-success shadow-success border-radius-lg py-3 pe-1"
              >
                <h4 class="text-white font-weight-bolder text-center mt-2 mb-0">
                  Se connecter
                </h4>
                <div class="row mt-3">
                  <div class="col-2 text-center ms-auto">
                    <a class="btn btn-link px-3" href="javascript:;">
                      <!-- <i class="fab fa-facebook text-white text-lg"></i> -->
                    </a>
                  </div>
                  <div class="col-2 text-center px-1">
                    <a class="btn btn-link px-3" href="javascript:;">
                      <!-- <i class="fab fa-github text-white text-lg"></i> -->
                    </a>
                  </div>
                  <div class="col-2 text-center me-auto">
                    <a class="btn btn-link px-3" href="javascript:;">
                      <!-- <i class="fab fa-google text-white text-lg"></i> -->
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-body">
              <Form
                @submit="handleLogin"
                :validation-schema="schema"
                role="form"
                class="text-start mt-3"
              >
                <div class="mb-3">
                  <Field
                    class="form-control is-invalid"
                    type="email"
                    placeholder="Email"
                    name="email"
                    v-model="email"
                    style="text-align: center"
                  />
                  <!-- <div class="">Looks good!</div> -->
                  <ErrorMessage name="email" class="invalid-feedback" />
                </div>
                <div class="mb-3">
                  <Field
                    class="form-control is-invalid"
                    type="password"
                    placeholder="Password"
                    name="password"
                    style="text-align: center"
                  />
                  <ErrorMessage name="password" class="invalid-feedback" />
                </div>
                <vmd-switch id="rememberMe">Remember me</vmd-switch>
                <div class="text-center">
                  <button
                    :disabled="loading"
                    type="submit"
                    class="btn btn-outline-success"
                    fullWidth
                  >
                    <span
                      v-show="loading"
                      class="spinner-border spinner-border-sm"
                    >
                    </span>
                    Connexion
                  </button>
                </div>
                <p class="mt-4 text-sm text-center">
                  Vous n'avez pas un compte?
                  <router-link
                    :to="{ name: 'SignUp' }"
                    class="text-success text-gradient font-weight-bold"
                    >S'inscrire</router-link
                  >
                </p>
                <div class="form-group">
                  <div v-if="message" class="alert alert-danger" role="alert">
                    {{ message }}
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer class="footer position-absolute bottom-2 py-2 w-100">
      <div class="container">
        <div class="row align-items-center justify-content-lg-between">
          <div class="col-12 col-md-6 my-auto">
            <div class="copyright text-center text-sm text-white text-lg-start">
              © {{ new Date().getFullYear() }}, made with
              <i class="fa fa-heart" aria-hidden="true"></i> by
              <a
                href="https://www.creative-tim.com"
                class="font-weight-bold text-white"
                target="_blank"
                >Creative Tim</a
              >
              for a better web.
            </div>
          </div>
          <div class="col-12 col-md-6">
            <ul
              class="nav nav-footer justify-content-center justify-content-lg-end"
            >
              <li class="nav-item">
                <a
                  href="https://www.creative-tim.com"
                  class="nav-link text-white"
                  target="_blank"
                  >Creative Tim</a
                >
              </li>
              <li class="nav-item">
                <a
                  href="https://www.creative-tim.com/presentation"
                  class="nav-link text-white"
                  target="_blank"
                  >About Us</a
                >
              </li>
              <li class="nav-item">
                <a
                  href="https://www.creative-tim.com/blog"
                  class="nav-link text-white"
                  target="_blank"
                  >Blog</a
                >
              </li>
              <li class="nav-item">
                <a
                  href="https://www.creative-tim.com/license"
                  class="nav-link pe-0 text-white"
                  target="_blank"
                  >License</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import Navbar from "@/examples/PageLayout/Navbar.vue";
// import VmdInput from "@/components/VmdInput.vue";
import VmdSwitch from "@/components/VmdSwitch.vue";
// import VmdButton from "@/components/VmdButton.vue";
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "sign-in",
  components: {
    Navbar,
    // VmdInput,
    VmdSwitch,
    // VmdButton,
    Form,
    Field,
    ErrorMessage,
  },
  beforeMount() {
    this.$store.state.hideConfigButton = true;
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
  },
  data() {
    const schema = yup.object().shape({
      email: yup
        .string()
        .required("email is required!")
        .email("Invalid email format"),
      password: yup.string().required("Password is required!"),
    });

    return {
      loading: false,
      message: "",
      schema,
      // email: "",
      // password: "",
      // user,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/dashboard");
    }
  },
  methods: {
    handleLogin(user) {
      // const user = {
      //   email: this.email,
      //   password: this.password,
      // };
      console.log(user);
      this.loading = true;
      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$router.push("/dashboard");
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
};
</script>
