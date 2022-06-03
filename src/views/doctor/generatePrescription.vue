<template>
  <div class="d-flex justify-content-around pt-4">
    <div id="form" class="p-4">
      <h3 class="mt-2">Générer votre ordonnance</h3>
      <p class="mt-2">Service de visioconférence professionnel sécurisé</p>
      <div>
        <select
          style="background-color: white"
          name="select_patient"
          as="select"
          class="form-select text-center border border-dark w-75 m-auto"
          v-model="patient"
        >
          <option value="" disabled selected>Patient</option>
          <option
            v-for="patient in patientList"
            :key="patient.user_id"
            :value="patient"
          >
            {{ patient.user_name }}
          </option>
        </select>
      </div>
      <!-- <div class="mt-2">
        <input type="text" name="text" id="text" v-model="name" />
      </div> -->
      <div class="mb-3 w-75 m-auto">
        <label for="exampleFormControlTextarea1" class="form-label pt-3"
          >Liste des médicaments</label
        >
        <textarea
          class="form-control border border-dark"
          id="exampleFormControlTextarea1"
          rows="3"
          v-model="drugs"
        ></textarea>
      </div>
      <div class="w-50 m-auto">
        <button class="mt-2 me-2 m-auto" @click="voir">voir</button>
        <button @click="sendToPatient">sendToPatient</button>
      </div>
    </div>
    <div class="d-flex flex-column">
      <div id="maindiv" ref="document">
        <!-- <label id="labelz" class="pt-7 ps-12">ddddd</label> -->
        <div class="d-flex flex-column">
          <label id="patient_name" class="pt-6 ps-5">nom du patient</label>
          <label id="date" class="ps-12">{{ date }}</label>
          <label id="drug" class="ps-3">Liste des médicaments</label>
        </div>
      </div>
      <div class="w-50 pt-2 m-auto d-flex justify-content-center">
        <button @click="exportToPDF">Export to PDF</button>
      </div>
    </div>
  </div>
</template>
<script>
import PrescriptionService from "../../services/prescription.service";
import html2pdf from "html2pdf.js";
import SchedulerService from "../../services/scheduler.service";
export default {
  name: "GeneratePrescription",
  data() {
    return {
      drugs: "",
      patient: "",
      patientList: [],
      filtredpatientList: [],
      date: new Date().toLocaleDateString(),
    };
  },
  methods: {
    async voir() {
      document.getElementById("drug").innerHTML = this.drugs;
      document.getElementById(
        "patient_name"
      ).innerHTML = this.patient.user_name;
    },
    async sendToPatient() {
      const event = {
        drugs: this.drugs,
        date: this.date,
        user_id: this.patient.user_id,
      };
      await PrescriptionService.addnewPrescription(event);
    },
    exportToPDF() {
      html2pdf(this.$refs.document, {
        margin: 1,
        filename: "Ordonnance.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { dpi: 192, letterRendering: true },
        jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
      });
    },
    getUniqueListBy(arr, key) {
      return [...new Map(arr.map((item) => [item[key], item])).values()];
    },
  },
  async mounted() {
    this.patientList = await SchedulerService.allevents();
    this.patientList = this.getUniqueListBy(this.patientList, "user_name");
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

#patient_name,
#date,
#drug {
  white-space: pre-wrap;
  font-family: "Over the Rainbow", sans-serif;
  color: #002b59;
  font-weight: bold;
}
</style>
