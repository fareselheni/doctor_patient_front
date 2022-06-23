<template>
  <div class="py-2 container-fluid">
    <div class="row mb-4">
      <div class="col-lg-12 position-relative z-index-2">
        <div class="row">
          <div class="d-flex flex-row bd-highlight mb-3">
            <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4 py-4">
              <v-date-picker
                v-model="date"
                :input-debounce="500"
                :min-date="new Date()"
              >
                <template v-slot="{ inputValue, inputEvents }">
                  <input
                    class="bg-white border px-2 py-1 rounded"
                    :value="inputValue"
                    v-on="inputEvents"
                    v-on:submit="changeDate"
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
                <th>HEURE DE DEBUT</th>
                <th>HEURE DE FIN</th>
                <th>TYPE DE RENDEZ-VOUS</th>
                <th class="text-center">ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="dt in doctimedispo" :key="dt._id">
                <td class="col-lg-3 col-md-2 col-sm-1">
                  {{ dt.start_date.split(/[T ,]+/)[1].split(/[. ,]+/)[0] }}
                </td>
                <td class="col-lg-3 col-md-2 col-sm-1">
                  {{ dt.end_date.split(/[T ,]+/)[1].split(/[. ,]+/)[0] }}
                </td>
                <td class="col-lg-3 col-md-2 col-sm-1">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="visio"
                      id="flexCheckChecked"
                      checked
                      @click="typeRdvChanged"
                    />
                    <label class="form-check-label" for="flexCheckChecked">
                      visioconférance
                    </label>
                  </div>
                </td>
                <td class="col-lg-3 col-md-2 col-sm-1">
                  <div class="d-flex flex-row justify-content-around">
                    <div class="text-center">
                      <button
                        :disabled="loading || dt.payed == true"
                        type="submit"
                        class="btn btn-outline-success"
                        @click="addPaiement(dt), (snackbar = 'success')"
                      >
                        <span
                          v-show="loading"
                          class="spinner-border spinner-border-sm"
                        ></span>
                        Payer
                      </button>
                    </div>
                    <div class="text-center">
                      <button
                        :disabled="
                          loading ||
                          dt.payed == false ||
                          dt.user_payed_id !== this.currentUserId()
                        "
                        type="submit"
                        class="btn btn-outline-success"
                        @click="addPre_app(dt), (snackbar = 'success')"
                      >
                        <span
                          v-show="loading"
                          class="spinner-border spinner-border-sm"
                        ></span>
                        Reserver
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="position-fixed top-1 end-1 z-index-2">
          <vmd-snackbar
            v-if="snackbar === 'success' && existingPreApp < 1"
            title="Notification"
            date="1 min ago"
            description="veuillez confirmer votre rendez-vous par email."
            icon="done"
            color="white"
            iconColor="success"
            :closeHandler="closeSnackbar"
            iconName="close"
          />
          <vmd-snackbar
            v-if="snackbar === 'success' && existingPreApp > 0"
            title="Alert"
            date="1 min ago"
            description="Vous ne pouvez prendre q'un seul rendez-vous avec le meme docteur"
            icon="error"
            color="white"
            iconColor="warning"
            :closeHandler="closeSnackbar"
            iconName="close"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VmdSnackbar from "@/components/VmdSnackbar.vue";
import socket from "../../socket";
import axios from "axios";
import timedispoService from "../../services/timedispo.service";
import preAppService from "../../services/preApp.service";
import paiementService from "../../services/paiement.service";
import modelService from "../../services/model.service";
export default {
  name: "prendrerdv",
  components: {
    VmdSnackbar,
  },
  data() {
    return {
      date: Date.now(),
      doctimedispo: [],
      snackbar: null,
      typeRDV: "visio",
      existingPreApp: null,
      userAmount: null,
    };
  },
  async mounted() {
    this.existingPreApp = await preAppService.checkExistingPreApp(
      this.$route.params.id
    );
    this.userAmount = await modelService.getDoctorById(this.$route.params.id);
    this.userAmount = this.userAmount[0].prixConsultation;
  },
  computed: {
    changedDate() {
      return this.date;
    },
  },
  watch: {
    changedDate() {
      this.changeDate();
    },
  },
  methods: {
    async changeDate() {
      // this.snackbar = "success";
      const ev = {
        _id: this.$route.params.id,
        start_date: this.date.toISOString().split(/[T ,]+/)[0],
      };
      this.doctimedispo = await timedispoService.getDoctorTimeDispo(ev);
      console.log("doctime", this.doctimedispo);
    },
    closeSnackbar() {
      this.snackbar = null;
    },
    async addPre_app(ev) {
      // const check = await paiementService.getPaiementDetails(ev.paiement_id);
      // console.log("check", check);
      const user_email = this.$store.state.auth.user.email;
      const user_id = this.$store.state.auth.user.id;
      if (this.existingPreApp >= 1) {
        console.log("cannot");
      } else {
        await axios.get("http://localhost:3000/send", {
          params: {
            to: user_email,
            user_id: user_id,
            _id: ev._id,
            event: ev,
            typeRDV: this.typeRDV,
          },
        });
        socket.emit("getDoctorId", ev.doctor_id);
      }
    },
    async typeRdvChanged() {
      if (this.typeRDV == "visio") {
        this.typeRDV = "presentiel";
      } else {
        this.typeRDV = "visio";
      }
    },
    async addPaiement(ev) {
      const pay = {
        doctor_id: ev.doctor_id,
        amount: this.userAmount,
      };
      const paiment = await paiementService.addnewPaiement(pay);
      console.log("paiement", paiment.data);
      await this.delay(5000);
      const check = await paiementService.getPaiementDetails(
        paiment.data.result.payment_id
      );
      console.log("check", check);
      const eventToUpdate = {
        id: ev._id,
        paiement_id: paiment.data.result.payment_id,
      };
      await timedispoService.updatetimedispo(eventToUpdate);
      window.open(paiment.data.result.link);
    },
    async delay(time) {
      return new Promise(function (resolve) {
        setTimeout(resolve, time);
      });
    },
    currentUserId() {
      return this.$store.state.auth.user.id;
    },
  },
};
</script>
