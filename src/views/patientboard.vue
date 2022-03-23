<template>
  <div class="py-4 container-fluid">
    <div class="row mb-4">
      <div class="col-lg-12 position-relative z-index-2">
        <div class="row">
          <div
            v-for="doc in doctors"
            :key="doc._id"
            class="col-lg-6 col-md-6 col-sm-6 mt-lg-0 mt-4 py-4"
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
export default {
  name: "patientboard",
  components: {
    MiniCards,
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
