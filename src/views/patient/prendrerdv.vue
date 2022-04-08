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
            Vue.js - Display a list of items with v-for
          </h3>
          <table class="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="dt in doctimedispo" :key="dt._id">
                <td>
                  {{ dt.start_date.split(/[T ,]+/)[1].split(/[. ,]+/)[0] }}
                </td>
                <td>{{ dt.end_date.split(/[T ,]+/)[1].split(/[. ,]+/)[0] }}</td>
                <td>test</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import timedispoService from "../../services/timedispo.service";
export default {
  name: "prendrerdv",
  data() {
    return {
      date: "",
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
  },
};
</script>
