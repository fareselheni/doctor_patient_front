<template>
  <div class="p-4 d-flex flex-row flex-wrap justify-content-around">
    <div
      v-for="(pres, index) in mesOrdonnances"
      v-bind:key="pres"
      class="border border-4 p-4 m-4"
      :ref="setItemRef"
    >
      <div id="maindiv">
        <div class="d-flex flex-column">
          <label id="patient_name" class="pt-6 ps-5">{{
            pres.user_name
          }}</label>
          <label id="date" class="ps-12">{{ pres.date }}</label>
          <label id="drug" class="ps-3">{{ pres.drugs }}</label>
        </div>
      </div>
      <div class="pt-2 m-auto d-flex justify-content-center">
        <div class="d-flex flex-row">
          <div class="mx-2">
            <button @click="exportToPDF(index)" class="btn btn-success">
              Telecharger
            </button>
          </div>
          <div class="mx-2">
            <button @click="deletePrescription(pres)" class="btn btn-danger">
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PrescriptionService from "../../services/prescription.service";
import html2pdf from "html2pdf.js";
export default {
  name: "myPrescriptions",
  data() {
    return {
      mesOrdonnances: [],
      itemRefs: [],
    };
  },
  async mounted() {
    this.mesOrdonnances = await PrescriptionService.getPatientPrescriptions();
  },
  methods: {
    exportToPDF(index) {
      // console.log(this.$refs);
      html2pdf(this.itemRefs[index], {
        margin: 1,
        filename: "Ordonnance.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { dpi: 192, letterRendering: true },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      });
    },
    setItemRef(el) {
      if (el) {
        this.itemRefs.push(el);
      }
    },
    async deletePrescription(ev) {
      await PrescriptionService.deleteevent(ev);
      this.mesOrdonnances = await PrescriptionService.getPatientPrescriptions();
    },
  },
  beforeUpdate() {
    this.itemRefs = [];
  },
  updated() {
    console.log(this.itemRefs);
  },
};
</script>

<style scoped>
@import url("http://fonts.cdnfonts.com/css/over-the-rainbow");
#maindiv {
  height: 400px;
  width: 377px;
  position: initial;
  background-image: url("../../assets/img/prescription_img.jpg");
}
/* #form {
  height: 400px;
  width: 377px;
} */

#patient_name,
#date,
#drug {
  white-space: pre-wrap;
  font-family: "Over the Rainbow", sans-serif;
  color: #002b59;
  font-weight: bold;
}
</style>
