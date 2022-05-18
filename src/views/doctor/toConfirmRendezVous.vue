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
                MES RENDEZ-VOUS A CONFIRME
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
                      PATIENT
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
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="dt in mesRdvs" :key="dt._id">
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div>
                          <h6 class="mb-0 text-sm">{{ dt.user_name }}</h6>
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
                      <div class="d-flex flex-row">
                        <div class="mx-2">
                          <button
                            @click="acceptRDV(dt)"
                            class="btn btn-success"
                          >
                            Accepter
                          </button>
                        </div>
                        <div class="mx-2">
                          <button @click="deleteRDV(dt)" class="btn btn-danger">
                            Supprimer
                          </button>
                        </div>
                      </div>
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
import socket from "../../socket";
import mesRendezVousService from "../../services/mesRendezVous.service";
import SchedulerService from "../../services/scheduler.service";
import PreAppService from "../../services/preApp.service";
// import modelService from "../../services/model.service";
export default {
  name: "toConfirmRendezVous",
  data() {
    return {
      date: "",
      mesRdvs: [],
      doctorFullName: "",
    };
  },
  async mounted() {
    this.mesRdvs = await mesRendezVousService.Doctorallrdvs();
    console.log("this.mesRdvs", this.mesRdvs);
  },
  methods: {
    // async getdoctorFullName(_id) {
    //   let doctor = await modelService.getDoctorById(_id);
    //   this.doctorFullName = doctor[0].firstname + " " + doctor[0].lastname;
    //   //   console.log("fullname", this.doctorFullName);
    //   //   return doctor[0].firstname + " " + doctor[0].lastname;
    //   return "test";
    // },
    async acceptRDV(ev) {
      await SchedulerService.addevent(ev);
      await PreAppService.deleteevent(ev);
      this.mesRdvs = await mesRendezVousService.Doctorallrdvs();
      socket.emit("getPatientId", ev.user_id);
    },
    async deleteRDV(ev) {
      await PreAppService.deleteevent(ev);
      this.mesRdvs = await mesRendezVousService.Doctorallrdvs();
    },
  },
};
</script>
