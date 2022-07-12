<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div
              class="bg-gradient-success shadow-success border-radius-lg px-5 pt-4 pb-3 d-flex justify-content-between"
            >
              <div>
                <h6 class="text-white text-capitalize">
                  Liste des administrateurs
                </h6>
              </div>
              <div class="text-white text-capitalize">
                <button
                  type="button"
                  class="btn btn-sm btn-outline-light"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
          <!-- Modal -->
          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <Form
                role="form"
                @submit="handleRegister"
                :validation-schema="schema"
              >
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Créer un nouveau administrateur
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>

                  <div class="modal-body">
                    <div class="card card-plain bg-gray-200 border border-3">
                      <div class="pb-0 card-header bg-transparent mb-4">
                        <h4 class="font-weight-bolder">Inscription</h4>
                        <p class="mb-0">Entrez les informations nécessaires</p>
                        <div class="card-body">
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
                            <v-date-picker
                              v-model="birthdate"
                              mode="date"
                              is24hr
                            >
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
                            <div
                              class="d-md-flex justify-content-start align-items-center ms-4 mb-0 py-2 px-4"
                            >
                              <div
                                class="form-check form-check-inline mb-0 me-4"
                              >
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

                              <div
                                class="form-check form-check-inline mb-0 me-4"
                              >
                                <Field
                                  class="form-check-input border border-secondary bg-white"
                                  type="radio"
                                  name="gender"
                                  id="maleGender"
                                  value="male"
                                />
                                <label
                                  class="form-check-label"
                                  for="femaleGender"
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
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
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
                      Enregistrer
                    </button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th
                      class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7"
                    >
                      Prenom
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7"
                    >
                      Nom
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7"
                    >
                      Email
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      TEL
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="dt in adminList" :key="dt._id">
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div>
                          <h6 class="mb-0 text-sm">{{ dt.firstname }}</h6>
                        </div>
                      </div>
                    </td>
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs font-weight-bold">{{
                        dt.lastname
                      }}</span>
                    </td>
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs font-weight-bold">{{
                        dt.email
                      }}</span>
                    </td>
                    <td class="align-middle text-center text-sm">
                      <span class="badge badge-xl bg-gradient-success">{{
                        dt.phone_number
                      }}</span>
                    </td>
                    <td class="align-middle text-center text-sm">
                      <button
                        @click="Supprimer(dt._id)"
                        class="btn btn-sm btn-danger mt-2"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import modelService from "../../services/model.service";
import authService from "../../services/auth.service";
export default {
  name: "GestionAdmin",
  components: {
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
      gender: yup.string().required("Gender is required!"),
    });
    return {
      successful: false,
      loading: false,
      snackbar: null,
      message: "",
      schema,
      adminList: [],
      birthdate: "",
    };
  },
  async mounted() {
    this.adminList = await modelService.alladmins();
  },
  methods: {
    async Supprimer(id) {
      await authService.deleteUser(id);
      this.adminList = await modelService.alladmins();
    },
    async handleRegister(user) {
      const userr = {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
        roles: "admin",
        gender: user.gender,
        phone_number: user.phone_number,
        adresse: user.adresse,
        birthdate: this.birthdate,
      };
      console.log("sigupUser", userr);
      this.message = "";
      this.successful = false;
      this.loading = true;
      this.$store.dispatch("auth/register", userr).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          this.loading = false;
          this.$router.go(this.$router.currentRoute);
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
