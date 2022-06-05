<template>
  <div id="card" class="card">
    <div class="card-header pb-0 px-3">
      <h4 class="mb-0">Mes Rendez-Vous Cloturés</h4>
    </div>
    <div class="card-body pt-4 p-4">
      <ul class="list-group" v-for="dt in mesRDVcloturé" :key="dt._id">
        <li
          class="list-group-item border-0 d-flex p-4 mb-4 bg-gray-200 shadow-success border-radius-lg"
        >
          <div class="d-flex flex-column px-3">
            <h6 class="mb-3 text-sm">{{ dt.doctor_name }}</h6>
            <span class="mb-2 text-xs">
              Date:
              <span class="text-dark font-weight-bold ms-sm-2">{{
                dt.start_date.split(/[T ,]+/)[0]
              }}</span>
            </span>
          </div>
          <div class="ms-auto text-end px-4">
            <!-- Button trigger modal -->
            <button
              type="button"
              class="btn btn-outline-success btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              @click="showPrescription(dt._id)"
            >
              voir ordonnance
            </button>
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
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Ordonnance</h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <div
                    v-if="this.prescription.length > 0"
                    id="maindiv"
                    ref="document"
                  >
                    <!-- <label id="labelz" class="pt-7 ps-12">ddddd</label> -->
                    <div class="d-flex flex-column">
                      <label id="patient_name" class="pt-6 ps-5">{{
                        this.prescription[0].user_name
                      }}</label>
                      <label id="date" class="ps-12">{{
                        this.prescription[0].date
                      }}</label>
                      <label id="drug" class="ps-3">{{
                        this.prescription[0].drugs
                      }}</label>
                    </div>
                  </div>
                  <div v-else>Pas d'ordonnance pour cette consulation</div>
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
                    type="button"
                    class="btn btn-primary"
                    @click="exportToPDF"
                  >
                    Telecharger
                  </button>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import SchedulerService from "../../services/scheduler.service";
import prescriptionService from "../../services/prescription.service";
import html2pdf from "html2pdf.js";
export default {
  name: "myPrescriptions",
  data() {
    return {
      mesRDVcloturé: [],
      prescription: [],
    };
  },
  async mounted() {
    this.mesRDVcloturé = await SchedulerService.patientallCLosedevents();
    // console.log(this.mesRDVcloturé);
  },
  methods: {
    async showPrescription(id) {
      this.prescription = await prescriptionService.getPatientPrescriptionsBySchId(
        id
      );
      console.log("ggg", this.prescription);
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
/* #card {
  min-height: 450px;
} */
</style>
