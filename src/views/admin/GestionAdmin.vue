<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div
              class="bg-gradient-success shadow-success border-radius-lg px-6 pt-4 pb-3 d-flex justify-content-between"
            >
              <div>
                <h6 class="text-white text-capitalize">
                  Liste des administrateurs
                </h6>
              </div>
              <div class="text-white text-capitalize">
                <button type="button" class="btn btn-sm btn-outline-light">
                  Ajouter
                </button>
              </div>
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
                  <tr v-for="dt in adminList" :key="dt._id">
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div>
                          <h6 class="mb-0 text-sm">{{ dt.firstname }}</h6>
                        </div>
                      </div>
                    </td>
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs font-weight-bold">{{
                        dt.lastname
                      }}</span>
                    </td>
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs font-weight-bold">{{
                        dt.email
                      }}</span>
                    </td>
                    <td class="align-middle text-center text-sm">
                      <span class="badge badge-xl bg-gradient-success">{{
                        dt.phone_number
                      }}</span>
                    </td>
                    <td class="align-middle text-center text-sm">
                      <button
                        @click="Supprimer(dt._id)"
                        class="btn btn-sm btn-danger mt-2"
                      >
                        Supprimer
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
import modelService from "../../services/model.service";
export default {
  name: "GestionAdmin",
  data() {
    return {
      adminList: [],
    };
  },
  async mounted() {
    this.adminList = await modelService.alladmins();
  },
  methods: {},
};
</script>
