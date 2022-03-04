<template>
 <div class="container">
    <div class="row no-gutter">
        <!-- The image half -->
        <div class="col-md-6 d-none d-md-flex bg-image"></div>


        <!-- The content half -->
        <div class="col-md-6 bg-light ">
            <div class="login d-flex align-items-center py-5 ">

                <!-- Demo content-->
                <div class="container ">
                    <div class="row ">
                        <div class="col-lg-10 col-xl-7 mx-auto">
                            <h3 class="display-7 my-5">Sign in to your account!</h3>
                            
                            <Form @submit="handleLogin" :validation-schema="schema">
                                <div class="form-group mb-3">
                                    <Field name="email" type="email" placeholder="Email address" required="" autofocus="" class="form-control rounded-pill border-1  shadow-sm px-4"/>
                                    <ErrorMessage name="email" class="error-feedback mx-5" style="color:red;" />
                                </div>
                                <div class="form-group mb-3">
                                    <Field name="password" type="password" placeholder="Password" required="" class="form-control rounded-pill border-1 shadow-sm px-4 text-primary"/>
                                    <ErrorMessage name="password" class="error-feedback mx-5" style="color:red;" />
                                </div>
                              
                                <button type="submit" :disabled="loading" class="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm">
                                    <span
                                    v-show="loading"
                                    class="spinner-border spinner-border-sm">
                                    </span>
                                    <span>SIGN IN</span>
                                </button>
                                <div class="form-group">
                                    <div v-if="message" class="alert alert-danger" role="alert">
                                        {{ message }}
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div><!-- End -->

            </div>
        </div><!-- End -->

    </div>
</div>
</template>

<script>
import {Form, Field, ErrorMessage } from "vee-validate";
//Form, Field, 
import * as yup from "yup";
export default {
  name: "LoginComponent",
  components: {
    Form,
    Field,
    ErrorMessage
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
.login,
.image {
  min-height: 100vh;
}

.bg-image {
  background-image: url('https://wallpapercave.com/wp/wp7538209.jpg');
  background-size: cover;
  background-position: center center;
}
</style>