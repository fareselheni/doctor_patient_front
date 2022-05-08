<template>
  <div class="d-flex flex-column">
    <div class="d-flex justify-content-center shadow-md rounded px-8 pt-2 pb-2">
      <form class="" @submit="handleAdd" @submit.prevent>
        <div class="mb-1">
          <span class="block text-gray-600 text-sm text-left font-bold mb-2"
            >Choisi la date et l'heure</span
          >
          <v-date-picker
            :timezone="'UTC'"
            v-model="range"
            mode="dateTime"
            :masks="masks"
            is-range
          >
            <template v-slot="{ inputValue, inputEvents, isDragging }">
              <div class="flex flex-col sm:flex-row justify-start items-center">
                <div class="relative flex-grow">
                  <svg
                    class="text-gray-600 w-4 h-full mx-2 absolute pointer-events-none"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                  <input
                    class="flex-grow pl-8 pr-2 py-1 bg-gray-100 border rounded w-full"
                    :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                    :value="inputValue.start"
                    v-on="inputEvents.start"
                  />
                </div>
                <span class="flex-shrink-0 m-2">
                  <svg
                    class="w-4 h-4 stroke-current text-gray-600"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </span>
                <div class="relative flex-grow">
                  <svg
                    class="text-gray-600 w-4 h-full mx-2 absolute pointer-events-none"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                  <input
                    class="flex-grow pl-8 pr-2 py-1 bg-gray-100 border rounded w-full"
                    :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                    :value="inputValue.end"
                    v-on="inputEvents.end"
                  />
                </div>
              </div>
            </template>
          </v-date-picker>
          <button type="submit" class="btn btn-outline-success mt-4" fullWidth>
            Ajouter
          </button>
        </div>
      </form>
    </div>
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-12">
          <div class="card my-4">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div
                class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3"
              >
                <h6 class="text-white text-capitalize ps-3">
                  MON TEMPS DISPONIBLE
                </h6>
              </div>
            </div>
            <div class="card-body px-0 pb-2">
              <div class="table-responsive p-0">
                <table class="table align-items-center mb-0">
                  <thead>
                    <tr>
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
                        ACTION
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="dt in mesRdvs" :key="dt._id">
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
                        <div class="mx-2">
                          <button
                            @click="deleteevent(dt)"
                            class="btn btn-danger"
                          >
                            Supprimer
                          </button>
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
  </div>
</template>
<script>
import TimedispoService from "../../services/timedispo.service";
export default {
  name: "Dispotime",
  data() {
    return {
      range: {
        start: new Date(),
        end: new Date(),
      },
      masks: {
        input: "YYYY-MM-DD h:mm A",
      },
      mesRdvs: [],
    };
  },
  methods: {
    async handleAdd() {
      const timedispo = {
        start_date: this.range.start.toISOString(),
        end_date: this.range.end.toISOString(),
      };
      await TimedispoService.addtimedispo(timedispo);
      console.log("gg", timedispo);
      this.mesRdvs = await TimedispoService.doctorallTimeDispoevents();
    },
    async deleteevent(ev) {
      await TimedispoService.deleteevent(ev);
      this.mesRdvs = await TimedispoService.doctorallTimeDispoevents();
    },
  },
  async mounted() {
    this.mesRdvs = await TimedispoService.doctorallTimeDispoevents();
    console.log("this.mesRdvs", this.mesRdvs);
  },
};
</script>
