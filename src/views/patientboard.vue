<template>
  <div class="container-fluid">
    <div class="row mb-4">
      <div class="col-lg-12 position-relative z-index-2">
        <Form role="form" @submit="handleRegister">
          <div class="row">
            <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4 py-4">
              <vmd-input style="background-color: white" label="Search here" />
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4 py-4">
              <div>
                <Field
                  style="background-color: white"
                  name="specialite"
                  as="select"
                  class="form-select text-center"
                  v-model="specialite"
                >
                  <option value="" disabled selected>Specialites</option>
                  <option
                    v-for="spec in allspecialites"
                    :key="spec._id"
                    :value="spec.name"
                  >
                    {{ spec.name }}
                  </option>
                </Field>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4 py-4">
              <div>
                <Field
                  style="background-color: white"
                  name="gouvernorat"
                  as="select"
                  class="form-select text-center"
                  v-model="gouvernorat"
                >
                  <option value="" disabled selected>gouvernorat</option>
                  <option
                    v-for="gouv in allgouvernorats"
                    :key="gouv._id"
                    :value="gouv.name"
                  >
                    {{ gouv.name }}
                  </option>
                </Field>
              </div>
            </div>
            <div class="col-lg-2 col-md-6 col-sm-6 mt-lg-0 mt-4 py-4">
              <div class="text-center">
                <button
                  :disabled="loading"
                  type="submit"
                  class="btn btn-outline-success w-100"
                  fullWidth
                >
                  <span
                    v-show="loading"
                    class="spinner-border spinner-border-sm"
                  ></span>
                  SEARCH
                </button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  </div>
  <div class="py-2 container-fluid">
    <div class="row mb-4">
      <div class="col-lg-12 position-relative z-index-2">
        <div class="row">
          <div
            v-for="doc in filtreddoctors"
            :key="doc._id"
            class="col-lg-4 col-md-6 col-sm-6 mt-lg-0 mt-4 py-4"
          >
            <mini-cards
              :title="`${doc.gouvernorat}`"
              :value="`${doc.firstname}`"
              percentage="+3%"
              iconName="person"
              :detail="`${doc.specialite}`"
              iconClass="text-white"
              iconBackground="bg-gradient-primary"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModelService from "../services/model.service";
import MiniCards from "./components/DoctorMiniCards.vue";
import SearchDoctor from "../services/searchdoctor.service";
import VmdInput from "@/components/VmdInput.vue";
import { Form, Field } from "vee-validate";
export default {
  name: "patientboard",
  components: {
    MiniCards,
    VmdInput,
    Form,
    Field,
  },
  data() {
    return {
      rend: false,
      filtreddoctors: [],
      allspecialites: [],
      allgouvernorats: [],
      gouvernorat: "",
      specialite: "",
    };
  },
  methods: {
    async handleRegister() {
      const filtre = {
        specialite: this.specialite,
        gouvernorat: this.gouvernorat,
      };
      this.filtreddoctors = await SearchDoctor.filtreDoctors(filtre);
    },
  },
  async mounted() {
    this.allgouvernorats = await ModelService.allgouvernorats();
    this.allspecialites = await ModelService.allspecialites();
    this.filtreddoctors = await SearchDoctor.filtreDoctors();
    console.log("doccccccccc", this.doctors);
  },
};
</script>

<style></style>
