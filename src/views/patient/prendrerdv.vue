<template>
  <div class="py-2 container-fluid">
    <div class="row mb-4">
      <div class="col-lg-12 position-relative z-index-2">
        <div class="row">
          <div class="d-flex flex-row bd-highlight mb-3">
            <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4 py-4">
              <v-date-picker v-model="date" :input-debounce="500">
                <template v-slot="{ inputValue, inputEvents }">
                  <input
                    class="bg-white border px-2 py-1 rounded"
                    :value="inputValue"
                    v-on="inputEvents"
                    v-on:submit="handleRegister"
                  />
                </template>
              </v-date-picker>
            </div>

            <!-- <v-date-picker
              class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4 py-4"
              v-model="date"
            /> -->
            <!-- <div class="col-lg-2 col-md-6 col-sm-6 mt-lg-0 mt-4 py-4">
                <div class="text-center">
                  <button
                    :disabled="loading"
                    type="submit"
                    class="btn btn-outline-success w-100"
                    fullWidth
                  >
                    <span
                      v-show="loading"
                      class="spinner-border spinner-border-sm"
                    ></span>
                    Add
                  </button>
                </div>
              </div> -->
          </div>
        </div>
        <div class="col-lg-12">
          <h3 class="p-3 text-left">
            Veuillez choisir une date qui vous convient
          </h3>
          <table class="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Start Date</th>
                <th>End Date</th>
                <th class="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="dt in doctimedispo" :key="dt._id">
                <td>
                  {{ dt.start_date.split(/[T ,]+/)[1].split(/[. ,]+/)[0] }}
                </td>
                <td>{{ dt.end_date.split(/[T ,]+/)[1].split(/[. ,]+/)[0] }}</td>
                <td>
                  <div class="col-lg-8 col-md-4 col-sm-4 text-center">
                    <button
                      :disabled="loading"
                      type="submit"
                      class="btn btn-outline-success w-50"
                      @click="addPre_app(dt)"
                    >
                      <span
                        v-show="loading"
                        class="spinner-border spinner-border-sm"
                      ></span>
                      Reserver
                    </button>
                    <div class="h-25" id="liveAlertPlaceholder"></div>
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
import socket from "../../socket";
import axios from "axios";
import timedispoService from "../../services/timedispo.service";
export default {
  name: "prendrerdv",
  data() {
    return {
      date: Date.now(),
      doctimedispo: [],
    };
  },
  async mounted() {
    console.log(this.$route.params.id);
  },
  computed: {
    changedDate() {
      return this.date;
    },
  },
  watch: {
    changedDate() {
      this.handleRegister();
    },
  },
  methods: {
    async handleRegister() {
      const ev = {
        _id: this.$route.params.id,
        start_date: this.date.toISOString().split(/[T ,]+/)[0],
      };
      this.doctimedispo = await timedispoService.getDoctorTimeDispo(ev);
      console.log("datetime", await timedispoService.getDoctorTimeDispo(ev));
    },
    // async addPre_app(ev) {
    //   const name = this.$store.state.auth.user.firstname;
    //   console.log("greeting" + name);
    //   await axios.post("http://localhost:3000/api/pre_app/new", {
    //     text: "meet with " + name,
    //     start_date: ev.start_date,
    //     end_date: ev.end_date,
    //     user_id: this.$store.state.auth.user.id,
    //     doctor_id: ev.doctor_id,
    //   });
    // },
    // eslint-disable-next-line no-unused-vars
    alertfunc(message, type) {
      var alertPlaceholder = document.getElementById("liveAlertPlaceholder");
      var wrapper = document.createElement("div");
      wrapper.innerHTML =
        '<div class="h-50 alert alert-' +
        type +
        ' alert-dismissible" role="alert">' +
        message +
        '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';

      alertPlaceholder.append(wrapper);
    },
    async addPre_app(ev) {
      this.alertfunc("Check you Email!", "success");
      const user_email = this.$store.state.auth.user.email;
      const user_id = this.$store.state.auth.user.id;
      await axios.get("http://localhost:3000/send", {
        params: {
          to: user_email,
          user_id: user_id,
          _id: ev._id,
          event: ev,
        },
      });
      socket.emit("getDoctorId", ev.doctor_id);
    },
  },
};
</script>
