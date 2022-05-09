<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div
              class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3"
            >
              <h6 class="text-white text-capitalize ps-3">
                MES RENDEZ-VOUS NON CONFIRME
              </h6>
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
                      DOCTEUR
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2"
                    >
                      DATE
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7"
                    >
                      HEURE DE DEBUT
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7"
                    >
                      HEURE DE FIN
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      STATUS
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="dt in mesRdvs" :key="dt._id">
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div>
                          <h6 class="mb-0 text-sm">{{ dt.doctor_name }}</h6>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p class="text-xs font-weight-bold mb-0">
                        {{ dt.start_date.split(/[T ,]+/)[0] }}
                      </p>
                    </td>
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs font-weight-bold">{{
                        dt.start_date.split(/[T ,]+/)[1].split(/[. ,]+/)[0]
                      }}</span>
                    </td>
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs font-weight-bold">{{
                        dt.end_date.split(/[T ,]+/)[1].split(/[. ,]+/)[0]
                      }}</span>
                    </td>
                    <td class="align-middle text-center text-sm">
                      <span class="badge badge-sm bg-gradient-warning">{{
                        dt.status
                      }}</span>
                    </td>
                    <td class="align-middle text-center text-sm">
                      <button
                        @click="deleteRDV(dt)"
                        class="btn btn-sm btn-danger"
                      >
                        Annuler
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
import axios from "axios";
import mesRendezVousService from "../../services/mesRendezVous.service";
// import modelService from "../../services/model.service";
import PreAppService from "../../services/preApp.service";
export default {
  name: "mesRendezVous",
  data() {
    return {
      date: "",
      mesRdvs: [],
      doctorFullName: "",
    };
  },
  async beforeMount() {
    if (this.$route.query.id) {
      var _id = this.$route.query.id;
      await axios.get("http://localhost:3000/verify?id=" + _id, {});
      this.mesRdvs = await mesRendezVousService.Patientallrdvs();
    }
  },
  async mounted() {
    this.mesRdvs = await mesRendezVousService.Patientallrdvs();
  },
  methods: {
    async deleteRDV(ev) {
      await PreAppService.deleteevent(ev);
      this.mesRdvs = await mesRendezVousService.Patientallrdvs();
    },
  },
};
</script>
