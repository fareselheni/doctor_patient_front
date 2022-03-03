<template >
<section class="vh-100" style="background-color: #f5f5f0;">
  <div class="container h-100 w-100" >
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-12 col-xl-11">
        <div class="card text-black" style="border-radius: 25px;">
          <div class="card-body p-md-5">
            <div class="row justify-content-center">
              <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <Form class="mx-1 mx-md-4" @submit="handleRegister" :validation-schema="schema">
                <div v-if="!successful">
                  <div class="d-flex flex-row align-items-center mb-4">
                    
                    <div class="form-outline flex-fill mb-0">
                      <Field name="firstname"  type="text" placeholder="FirstName" required="" autofocus="" style="background-color: #f5f5f0;" class="form-control rounded-pill border-1 shadow-sm px-4"/>
                      <ErrorMessage name="firstname" class="error-feedback mx-5" style="color:red;" />
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    
                    <div class="form-outline flex-fill mb-0">
                      <Field name="lastname"  type="text" placeholder="LastName" required="" autofocus="" style="background-color: #f5f5f0;" class="form-control rounded-pill border-1 shadow-sm px-4"/>
                      <ErrorMessage name="lastname" class="error-feedback mx-5" style="color:red;" />
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    
                    <div class="form-outline flex-fill mb-0">
                        <Field name="email" type="email" placeholder="Email address" required="" autofocus="" style="background-color: #f5f5f0;" class="form-control rounded-pill border-1 shadow-sm px-4"/>                         
                        <ErrorMessage name="email" class="error-feedback mx-5" style="color:red;" />
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    
                    <div class="form-outline flex-fill mb-0">
                        <Field name="password" type="password" placeholder="Password" required="" autofocus="" style="background-color: #f5f5f0;" class="form-control rounded-pill border-1 shadow-sm px-4"/>                      
                        <ErrorMessage name="password" class="error-feedback mx-5" style="color:red;"/>
                    </div>
                  </div>

                  

                  <div class="d-flex flex-row align-items-center mb-4">
                    
                    <div class="form-outline flex-fill mb-0">
                        <Field name="phone_number" type="text" placeholder="Phone number" required="" autofocus="" style="background-color: #f5f5f0;" class="form-control rounded-pill border-1 shadow-sm px-4"/>                         
                        <ErrorMessage name="phone_number" class="error-feedback mx-5" style="color:red;"/>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    
                    <div class="form-outline flex-fill mb-0">
                      <Field name="adresse" type="text" placeholder="Adresse" required="" autofocus="" style="background-color: #f5f5f0;" class="form-control rounded-pill border-1 shadow-sm px-4"/>  
                      <ErrorMessage name="adresse" class="error-feedback mx-5" style="color:red;" />
                    </div>
                  </div>

                  <div class="d-md-flex justify-content-start align-items-center mb-4 py-2 px-4">

                    <h6 class="mb-0 me-4 mr-2" style="color:black;">Gender: </h6>

                    <div class="form-check form-check-inline mb-0 me-4">
                      <Field
                        class="form-check-input"
                        type="radio"
                        name="gender"
                        id="maleGender"
                        value="male"
                      />
                      <label class="form-check-label" for="femaleGender">Male</label>
                    </div>

                    <div class="form-check form-check-inline mb-0 me-4">
                      <Field
                        class="form-check-input"
                        type="radio"
                        name="gender"
                        id="femaleGender"
                        value="female"
                      />
                      <label class="form-check-label" for="maleGender">Female</label>
                    </div>

                    <ErrorMessage name="gender" class="error-feedback mx-5" style="color:red;" />
                  </div>

                  <div class="d-md-flex justify-content-start align-items-center mb-4 py-2 px-4">

                    <h6 class="mb-0 me-4 mr-2" style="color:black;">Register as: </h6>

                    <div class="form-check form-check-inline mb-0 me-4">
                      <Field
                        class="form-check-input"
                        type="radio"
                        name="roles"
                        id="doctor"
                        value="doctor"
                      />
                      <label class="form-check-label" for="doctor">Doctor</label>
                    </div>

                    <div class="form-check form-check-inline mb-0 me-4">
                      <Field
                        class="form-check-input"
                        type="radio"
                        name="roles"
                        id="patient"
                        value="patient"
                      />
                      <label class="form-check-label" for="patient">Patient</label>
                    </div>
                    <ErrorMessage name="roles" class="error-feedback mx-5" style="color:red;" />

                  </div>
                

                  <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit" class="btn btn-primary btn-md" :disabled="loading">
                      <span
                        v-show="loading"
                        class="spinner-border spinner-border-sm"
                      ></span>
                      Register
                    </button>
                  </div>
                  <p class="text-center text-muted mt-5 mb-0">Have already an account? <a href="/login" class="fw-bold text-body"><u>Login here</u></a></p>


                </div>
                </Form>
                <div
                  v-if="message"
                  class="alert"
                  :class="successful ? 'alert-success' : 'alert-danger'"
                >
                  {{ message }}
                </div>

              </div>
              <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" class="img-fluid" alt="Sample image">

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>
<script>
 import { Form, Field ,ErrorMessage} from "vee-validate";
import * as yup from "yup";
export default {
  name: "RegisterComponent",
  components: {
    Form,
    Field,
    ErrorMessage
  },
  data() {
    const schema = yup.object().shape({
      firstname: yup
        .string()
        .required("Firstname is required!")
        .min(3, "Must be at least 3 characters!")
        .max(20, "Must be maximum 20 characters!"),
      lastname: yup
        .string()
        .required("Lastname is required!")
        .min(3, "Must be at least 3 characters!")
        .max(20, "Must be maximum 20 characters!"),  
      email: yup
        .string()
        .required("Email is required!")
        .email("Email is invalid!")
        .max(50, "Must be maximum 50 characters!"),
      password: yup
        .string()
        .required("Password is required!")
        .min(6, "Must be at least 6 characters!")
        .max(40, "Must be maximum 40 characters!"),
      phone_number: yup
        .string()
        .required("phone number is required!")
        .min(8, "Must be 8 characters!")
        .max(8, "Must be 8 characters!"), 
      adresse: yup
        .string()
        .required("Adresse is required!"),     
      roles: yup
        .string()
        .required("role is required!"),  
      gender: yup
        .string()
        .required("Gender is required!"),    
    });
    return {
      successful: false,
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
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleRegister(user) {
      this.message = "";
      this.successful = false;
      this.loading = true;
      this.$store.dispatch("auth/register", user).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          this.loading = false;
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
          this.loading = false;
        }
      );
    },
  },
};
</script>
<style scoped>
</style>