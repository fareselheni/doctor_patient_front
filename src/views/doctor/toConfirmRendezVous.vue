<template>
  <div class="py-2 container-fluid">
    <div class="row mb-4">
      <div class="col-lg-12 position-relative z-index-2">
        <div class="col-lg-12">
          <h3 class="p-3 text-left">Mes Rendez Vous</h3>
          <table class="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Action</th>
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
                  <button>Accept</button>
                  <button>Cancel</button>
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
  //   methods: {
  //     async getdoctorFullName(_id) {
  //       let doctor = await modelService.getDoctorById(_id);
  //       this.doctorFullName = doctor[0].firstname + " " + doctor[0].lastname;
  //       //   console.log("fullname", this.doctorFullName);
  //       //   return doctor[0].firstname + " " + doctor[0].lastname;
  //       return "test";
  //     },
  //   },
};
</script>
