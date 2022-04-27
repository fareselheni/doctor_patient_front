<template>
  <div class="py-2 container-fluid">
    <div class="row mb-4">
      <div class="position-relative z-index-2">
        <div class="col-lg-12">
          <h3 class="p-3 text-left">Mes Rendez Vous</h3>
          <table
            class="col-lg-12 col-md-8 col-sm-6 table table-striped table-bordered"
          >
            <thead>
              <tr>
                <th>PATIENT</th>
                <th>HEURE DE DEBUT</th>
                <th>HEURE DE FIN</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="dt in mesRdvs" :key="dt._id">
                <td>test</td>
                <td>
                  {{ dt.start_date.split(/[T ,]+/)[1].split(/[. ,]+/)[0] }}
                </td>
                <td>{{ dt.end_date.split(/[T ,]+/)[1].split(/[. ,]+/)[0] }}</td>
                <td>
                  {{ dt.status }}
                </td>
                <td>
                  <div class="d-flex flex-row">
                    <div class="mx-2">
                      <button @click="acceptRDV(dt)" class="btn btn-success">
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
</template>

<script>
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
    },
    async deleteRDV(ev) {
      await PreAppService.deleteevent(ev);
      this.mesRdvs = await mesRendezVousService.Doctorallrdvs();
    },
  },
};
</script>
