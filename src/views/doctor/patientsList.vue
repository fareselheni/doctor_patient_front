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
                Liste des patients
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
                      Photo
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7"
                    >
                      Prenom
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7"
                    >
                      Nom
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7"
                    >
                      Email
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      TEL
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="dt in patientList" :key="dt._id">
                    <td>
                      <div class="py-1 d-flex">
                        <div class="my-auto">
                          <img
                            :src="dt[0].image"
                            class="border border-2 avatar avatar-md ms-2"
                            alt="user image"
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div>
                          <h6 class="mb-0 text-sm">{{ dt[0].firstname }}</h6>
                        </div>
                      </div>
                    </td>
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs font-weight-bold">{{
                        dt[0].lastname
                      }}</span>
                    </td>
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs font-weight-bold">{{
                        dt[0].email
                      }}</span>
                    </td>
                    <td class="align-middle text-center text-sm">
                      <span class="badge badge-xl bg-gradient-success">{{
                        dt[0].phone_number
                      }}</span>
                    </td>
                    <td class="align-middle text-center text-sm">
                      <button
                        @click="addSignal(dt[0]._id)"
                        class="btn btn-sm btn-danger mt-2"
                      >
                        Signaler
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
  <div class="position-fixed top-1 end-1 z-index-2">
    <vmd-snackbar
      v-if="snackbar === 'success' && existingSignal === true"
      title="Notification"
      date="1 min ago"
      description="ce profil a été signalé avec success."
      icon="done"
      color="white"
      iconColor="success"
      :closeHandler="closeSnackbar"
      iconName="close"
    />
    <vmd-snackbar
      v-if="snackbar === 'success' && existingSignal === false"
      title="Alert"
      date="1 min ago"
      description="Vous ne pouvez signaler un profile qu'une seule fois"
      icon="error"
      color="white"
      iconColor="warning"
      :closeHandler="closeSnackbar"
      iconName="close"
    />
  </div>
</template>

<script>
// import axios from "axios";
import VmdSnackbar from "@/components/VmdSnackbar.vue";
import SchedulerService from "../../services/scheduler.service";
import modelService from "../../services/model.service";
import signalService from "../../services/signal.service";
export default {
  name: "patientsList",
  data() {
    return {
      date: "",
      SchedulerpatientList: [],
      patientList: [],
      snackbar: null,
      existingSignal: null,
    };
  },
  components: {
    VmdSnackbar,
  },
  async mounted() {
    this.SchedulerpatientList = await SchedulerService.allevents();
    this.SchedulerpatientList = this.getUniqueListBy(
      this.SchedulerpatientList,
      "user_name"
    );
    // console.log("zz", this.SchedulerpatientList);
    this.patientList = await this.getPatientList();
    console.log("this.patients", this.patientList[0][0]._id);
  },
  methods: {
    getUniqueListBy(arr, key) {
      return [...new Map(arr.map((item) => [item[key], item])).values()];
    },
    async getPatientList() {
      const list = [];
      for (let index = 0; index < this.SchedulerpatientList.length; index++) {
        const element = this.SchedulerpatientList[index];
        const patient = await modelService.getDoctorById(element.user_id);
        if (element.user_id !== this.$store.state.auth.user.id) {
          list.push(patient);
        }
      }
      return list;
    },
    async addSignal(id) {
      const check = await this.check(id);
      console.log("check", check);
      if (check === false) {
        this.snackbar = "success";
        this.existingSignal = false;
      } else {
        await signalService.addnewSignal(id);
        this.snackbar = "success";
        this.existingSignal = true;
      }
    },
    async check(id) {
      const checkS = await signalService.checkExistingSignal(id);
      return checkS;
    },
    closeSnackbar() {
      this.snackbar = null;
    },
  },
};
</script>
