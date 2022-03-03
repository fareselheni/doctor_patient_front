<template>
  <section class="vh-100 bg-image" style="background-color: #f5f5f0;;">
  <div class="mask d-flex align-items-center h-100 gradient-custom-3">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-9 col-lg-7 col-xl-6">
          <div class="card" style="border-radius: 20px;">
            <div class="card-body p-5">
              <h2 class="text-uppercase text-center mb-5">Sign in</h2>

              <Form>

                <div class="form-outline mb-4">
                  <label >Email address</label>
                  <Field name="email" type="email"  required="" autofocus="" style="background-color: #f5f5f0;" class="form-control form-control-sm rounded-pill border-1 shadow-sm px-4"/>
                  
                  <ErrorMessage name="email" class="error-feedback mx-5" style="color:red;" />
                </div>

                <div class="form-outline mb-4">
                  <Field name="password" type="password" placeholder="Password" required="" autofocus="" style="background-color: #f5f5f0;" class="form-control form-control-lg rounded-pill border-1 shadow-sm px-4"/>
                  
                  <ErrorMessage name="email" class="error-feedback mx-5" style="color:red;" />
                </div>



                <div class="d-flex justify-content-center">
                  <button type="button" class="btn btn-primary btn-block btn-lg text-body rounded-pill border-1 shadow-sm">Register</button>
                </div>

              </Form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </section>
</template>
<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  name: "LoginComponent",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      email: yup.string().required("email is required!"),
      password: yup.string().required("Password is required!"),
    });
    return {
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleLogin(user) {
      this.loading = true;
      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$router.push("/profile");
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
<style scoped>

</style>
