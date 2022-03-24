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
                  name="gouvernorat"
                  as="select"
                  class="form-select text-center"
                >
                  <option value="" disabled>gouvernorat</option>
                  <option
                    v-for="gouv in doctors"
                    :key="gouv._id"
                    :value="gouv.firstname"
                  >
                    {{ gouv.firstname }}
                  </option>
                </Field>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4 py-4">
              <div>
                <Field
                  name="gouvernorat"
                  as="select"
                  class="form-select text-center"
                >
                  <option value="" disabled>gouvernorat</option>
                  <option
                    v-for="gouv in doctors"
                    :key="gouv._id"
                    :value="gouv.firstname"
                  >
                    {{ gouv.firstname }}
                  </option>
                </Field>
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
            v-for="doc in doctors"
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
      doctors: [],
    };
  },
  async mounted() {
    this.doctors = await SearchDoctor.alldoctors();
    console.log("doccccccccc", this.doctors);
  },
};
</script>

<style></style>
