<template>
  <div class="bg-white">
    <div class="container top-0 position-sticky z-index-sticky">
      <div class="row">
        <div class="col-12">
          <navbar
            isBlur="blur my-3 py-2 mt-4 start-0 end-0 mx-4 shadow blur border-radius-lg"
            btnBackground="bg-gradient-success"
            v-bind:darkMode="true"
          />
        </div>
      </div>
    </div>
    <main class="mt-0 main-content">
      <section>
        <div class="page-header min-vh-100">
          <div class="container">
            <div class="row">
              <div
                class="col-6 d-lg-flex d-none h-100 my-auto pe-0 ps-0 position-absolute top-0 start-0 text-center justify-content-center flex-column"
              >
                <div
                  class="position-relative h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center"
                  :style="{
                    backgroundrepeat: no - repeat,
                    backgroundImage:
                      'url(' +
                      require('@/assets/img/illustrations/f_doc.jpg') +
                      ')',
                  }"
                  style="background-repeat: no-repeat"
                ></div>
              </div>
              <div
                class="mt-7 col-xl-4 col-lg-5 col-md-7 d-flex flex-column ms-auto me-auto ms-lg-auto me-lg-5"
              >
                <div class="card card-plain bg-gray-200 border border-3">
                  <div class="pb-0 card-header bg-transparent mb-4">
                    <h4 class="font-weight-bolder">S'inscrire</h4>
                    <p class="mb-0">Entrez vos informations</p>
                  </div>
                  <div class="card-body">
                    <Form
                      role="form"
                      @submit="handleRegister"
                      :validation-schema="schema"
                    >
                      <div class="mb-3">
                        <Field
                          class="form-control input-md border border-1 bg-white"
                          type="text"
                          as="input"
                          placeholder="Prénom"
                          name="firstname"
                          style="text-align: center"
                        />
                        <ErrorMessage
                          name="firstname"
                          class="error-feedback mx-5"
                          style="color: red"
                        />
                      </div>
                      <div class="mb-3">
                        <Field
                          class="form-control input-md border border-1 bg-white"
                          type="text"
                          placeholder="Nom"
                          name="lastname"
                          style="text-align: center"
                        />
                        <ErrorMessage
                          name="lastname"
                          class="error-feedback mx-5"
                          style="color: red"
                        />
                      </div>
                      <div class="mb-3">
                        <Field
                          class="form-control input-md border border-1 bg-white"
                          type="email"
                          placeholder="Email"
                          name="email"
                          style="text-align: center"
                        />
                        <ErrorMessage
                          name="email"
                          class="error-feedback mx-5"
                          style="color: red"
                        />
                      </div>
                      <div class="mb-3">
                        <Field
                          class="form-control input-md border border-1 bg-white"
                          type="password"
                          placeholder="Mot de Passe"
                          name="password"
                          style="text-align: center"
                        />
                        <ErrorMessage
                          name="password"
                          class="error-feedback mx-5"
                          style="color: red"
                        />
                      </div>
                      <div class="mb-3">
                        <Field
                          class="form-control input-md border border-1 bg-white"
                          type="text"
                          placeholder="Num Telephone"
                          name="phone_number"
                          style="text-align: center"
                        />
                        <ErrorMessage
                          name="phone_number"
                          class="error-feedback mx-5"
                          style="color: red"
                        />
                      </div>
                      <div class="mb-3">
                        <Field
                          class="form-control input-md border border-1 bg-white"
                          type="text"
                          placeholder="Adresse"
                          name="adresse"
                          style="text-align: center"
                        />
                        <ErrorMessage
                          name="adresse"
                          class="error-feedback mx-5"
                          style="color: red"
                        />
                      </div>
                      <div class="mb-3">
                        <v-date-picker v-model="birthdate" mode="date" is24hr>
                          <template v-slot="{ inputValue, inputEvents }">
                            <input
                              class="form-control px-2 py-1 border border-1 bg-white focus:outline-none focus:border-blue-300"
                              :value="inputValue"
                              v-on="inputEvents"
                              placeholder="Date de naissance"
                              style="text-align: center"
                            />
                          </template>
                        </v-date-picker>
                      </div>
                      <div class="mb-3">
                        <div class="container mt-3">
                          <div class="card bg-white">
                            <!-- <img style="" :src="image" alt="" /> -->
                            <Field
                              name="image"
                              @change="handleFileUpload"
                              class="custom-input"
                              type="file"
                              accept="image/*"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="mb-3">
                        <div
                          class="d-md-flex justify-content-start align-items-center mb-0 py-2 px-4"
                        >
                          <div class="form-check form-check-inline mb-0 me-4">
                            <Field
                              class="form-check-input border border-secondary bg-white"
                              type="radio"
                              name="gender"
                              id="femaleGender"
                              value="female"
                            />
                            <label class="form-check-label" for="maleGender"
                              >Femme</label
                            >
                          </div>

                          <div class="form-check form-check-inline mb-0 me-4">
                            <Field
                              class="form-check-input border border-secondary bg-white"
                              type="radio"
                              name="gender"
                              id="maleGender"
                              value="male"
                            />
                            <label class="form-check-label" for="femaleGender"
                              >Homme</label
                            >
                          </div>

                          <ErrorMessage
                            name="gender"
                            class="error-feedback mx-5"
                            style="color: red"
                          />
                        </div>
                      </div>
                      <div class="mb-3">
                        <div
                          class="d-md-flex justify-content-start align-items-center mb-0 py-2 px-4"
                        >
                          <div class="form-check form-check-inline mb-0 me-4">
                            <Field
                              class="form-check-input border border-secondary bg-white"
                              type="radio"
                              name="roles"
                              id="doctor"
                              value="doctor"
                              v-on:click="selectroleDoctor"
                              v-model="selectedrole"
                            />
                            <label class="form-check-label" for="doctor"
                              >Docteur</label
                            >
                          </div>

                          <div class="form-check form-check-inline mb-0 me-4">
                            <Field
                              class="form-check-input border border-secondary bg-white"
                              type="radio"
                              name="roles"
                              id="patient"
                              value="patient"
                              v-on:click="selectrolePatient"
                              v-model="selectedrole"
                            />
                            <label class="form-check-label" for="patient"
                              >Patient</label
                            >
                          </div>
                          <ErrorMessage
                            name="roles"
                            class="error-feedback mx-5"
                            style="color: red"
                          />
                        </div>
                      </div>

                      <div class="mb-3" v-if="selectedrole === 'doctor'">
                        <Field
                          name="specialite"
                          as="select"
                          class="form-select text-center bg-white"
                        >
                          <option value="" disabled>Spécialité</option>
                          <option
                            v-for="spec in allspecialites"
                            :key="spec._id"
                            :value="spec.name"
                          >
                            {{ spec.name }}
                          </option>
                        </Field>
                      </div>
                      <div class="mb-3" v-if="selectedrole === 'doctor'">
                        <Field
                          name="gouvernorat"
                          as="select"
                          class="form-select text-center bg-white"
                        >
                          <option value="" disabled>gouvernorat</option>
                          <option
                            v-for="gouv in allgouvernorats"
                            :key="gouv._id"
                            :value="gouv.name"
                          >
                            {{ gouv.name }}
                          </option>
                        </Field>
                      </div>
                      <div class="mb-3" v-if="selectedrole === 'doctor'">
                        <Field
                          class="form-control input-md border border-1 bg-white"
                          type="text"
                          placeholder="numero_inscription_cnom"
                          name="numero_inscription_cnom"
                          style="text-align: center"
                        />
                        <ErrorMessage
                          name="numero_inscription_cnom"
                          class="error-feedback mx-5"
                          style="color: red"
                        />
                      </div>
                      <div class="mb-3" v-if="selectedrole === 'doctor'">
                        <Field
                          class="form-control input-md border border-1 bg-white"
                          type="text"
                          placeholder="prixConsultation"
                          name="prixConsultation"
                          style="text-align: center"
                        />
                        <ErrorMessage
                          name="prixConsultation"
                          class="error-feedback mx-5"
                          style="color: red"
                        />
                      </div>
                      <vmd-checkbox
                        id="flexCheckDefault"
                        class="font-weight-light"
                        checked
                      >
                        J'accepte
                        <a
                          href="../../../pages/privacy.html"
                          class="text-dark font-weight-bolder"
                          >les termes et conditions</a
                        >
                      </vmd-checkbox>
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
                          ></span>
                          S'inscrire
                        </button>
                      </div>
                    </Form>
                  </div>
                  <div class="px-1 pt-0 text-center card-footer px-lg-2">
                    <p class="mx-auto mb-4 text-sm">
                      Vous avez déjà un compte?
                      <router-link
                        :to="{ name: 'SignIn' }"
                        class="text-success text-gradient font-weight-bold"
                        >S'identifier</router-link
                      >
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
  <div class="position-fixed top-1 end-1 z-index-2">
    <vmd-snackbar
      v-if="snackbar === 'success'"
      title="Alert"
      date="1 min ago"
      description="Votre numéro est placé dans la liste noire"
      icon="error"
      color="white"
      iconColor="warning"
      :closeHandler="closeSnackbar"
      iconName="close"
    />
  </div>
</template>

<script>
import ModelService from "../../services/model.service";
import blacklistService from "../../services/blacklist.service";
import Navbar from "@/examples/PageLayout/Navbar.vue";
import VmdSnackbar from "@/components/VmdSnackbar.vue";
// import VmdInput from "@/components/VmdInput.vue";
import VmdCheckbox from "@/components/VmdCheckbox.vue";
// import VmdButton from "@/components/VmdButton.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
//Form, Field,
import * as yup from "yup";
const body = document.getElementsByTagName("body")[0];

export default {
  name: "sign-up",
  components: {
    Navbar,
    // VmdInput,
    VmdCheckbox,
    // VmdButton,
    VmdSnackbar,
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      firstname: yup
        .string()
        .required("Firstname is required!")
        .min(3, "min 3 characters!")
        .max(20, "max 20 characters!"),
      lastname: yup
        .string()
        .required("Lastname is required!")
        .min(3, "min 3 characters!")
        .max(20, "max 20 characters!"),
      email: yup
        .string()
        .required("Email is required!")
        .email("Email is invalid!")
        .max(50, "max 50 characters!"),
      password: yup
        .string()
        .required("Password is required!")
        .min(6, "min 6 characters!")
        .max(40, "max 40 characters!"),
      phone_number: yup
        .string()
        .required("phone number is required!")
        .min(8, "Must be 8 characters!")
        .max(8, "Must be 8 characters!"),
      adresse: yup.string().required("Adresse is required!"),
      roles: yup.string().required("role is required!"),
      gender: yup.string().required("Gender is required!"),
      specialite: yup.string(),
      gouvernorat: yup.string(),
      numero_inscription_cnom: yup.string(),
      prixConsultation: yup.string(),
      // image: yup.string(),
    });
    return {
      successful: false,
      loading: false,
      snackbar: null,
      message: "",
      schema,
      selectedrole: "",
      allspecialites: [],
      allgouvernorats: [],
      blacklist: [],
      image: "",
      birthdate: "",
    };
  },
  watch: {
    selectroleDoctor: function (newRole) {
      console.log(this.selectedrole);
      this.$dispatch("selectedRole", newRole);
    },
    selectrolePatient: function (newRole) {
      console.log(this.selectedrole);
      this.$dispatch("selectedRole", newRole);
    },
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  async mounted() {
    this.blacklist = await blacklistService.getBlacklist();
    this.allgouvernorats = await ModelService.allgouvernorats();
    this.allspecialites = await ModelService.allspecialites();
    if (this.loggedIn) {
      this.$router.push("/dashboard");
    }
  },
  methods: {
    async handleRegister(user) {
      const checkBlackLBefore = await this.checkInBlacklist(user.phone_number);
      if (checkBlackLBefore === true) {
        console.log("trueeeeeeeeeeeeeeee");
        this.snackbar = "success";
      } else {
        console.log("faaaaaaaaalse");
        const userr = {
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          password: user.password,
          roles: user.roles,
          gender: user.gender,
          phone_number: user.phone_number,
          adresse: user.adresse,
          specialite: user.specialite,
          gouvernorat: user.gouvernorat,
          numero_inscription_cnom: user.numero_inscription_cnom,
          image: this.image,
          birthdate: this.birthdate,
          prixConsultation: user.prixConsultation,
        };
        this.message = "";
        this.successful = false;
        this.loading = true;
        this.$store.dispatch("auth/register", userr).then(
          (data) => {
            this.message = data.message;
            this.successful = true;
            this.loading = false;
            this.$router.push("/sign-in");
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
      }
    },
    convertToBase64(file) {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
          reject(error);
        };
      });
    },
    closeSnackbar() {
      this.snackbar = null;
    },
    //ajouter une image
    async handleFileUpload(e) {
      const file = e.target.files[0];
      const base64 = await this.convertToBase64(file);
      // this.schema.image == base64;
      this.image = base64;
      // console.log("image", this.schema.image);
    },
    async checkInBlacklist(tel) {
      try {
        let check = false;
        for (let index = 0; index < this.blacklist.length; index++) {
          const element = this.blacklist[index];
          if (element.phone_number === tel) {
            check = true;
          }
        }
        return check;
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.$store.state.hideConfigButton = true;
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
    body.classList.add("bg-gray-100");
  },
};
</script>
