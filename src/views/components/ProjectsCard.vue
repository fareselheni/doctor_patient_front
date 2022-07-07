<template>
  <div class="card">
    <div class="card-header pb-0">
      <div class="row">
        <div class="col-lg-6 col-7">
          <h6>Les patients les plus signalés</h6>
          <p class="text-sm mb-0">
            <!-- <i class="fa fa-check text-info" aria-hidden="true"></i> -->
            Triée par nombre de signal
          </p>
        </div>
        <div class="col-lg-6 col-5 my-auto text-end">
          <div class="dropdown float-lg-end pe-4">
            <a
              class="cursor-pointer"
              id="dropdownTable"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="fa fa-ellipsis-v text-secondary" aria-hidden="true"></i>
            </a>
            <ul
              class="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5"
              aria-labelledby="dropdownTable"
              style=""
            >
              <li>
                <a class="dropdown-item border-radius-md" href="javascript:;">{{
                  Action
                }}</a>
              </li>
              <li>
                <a class="dropdown-item border-radius-md" href="javascript:;">{{
                  AnotherAction
                }}</a>
              </li>
              <li>
                <a class="dropdown-item border-radius-md" href="javascript:;">{{
                  SomethingElse
                }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="card-body px-0 pb-2">
      <div class="table-responsive">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Nom & Prenom
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Email
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Tel
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Nombre de signal
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="dt in patientList" :key="dt._id">
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <img
                      v-if="dt.image"
                      :src="dt.image"
                      class="avatar avatar-sm me-3"
                      alt="xd"
                    />
                    <i
                      v-else
                      class="material-icons opacity-10 ms-3 me-3"
                      aria-hidden="true"
                      >person</i
                    >
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">
                      {{ dt.firstname + " " + dt.lastname }}
                    </h6>
                  </div>
                </div>
              </td>
              <td class="text-sm">
                <div class="text-xs font-weight-bold">
                  {{ dt.email }}
                </div>
              </td>
              <td class="align-middle text-center text-sm">
                <span class="text-xs font-weight-bold">
                  {{ dt.phone_number }}
                </span>
              </td>
              <td class="align-middle text-center text-sm">
                <span class="badge badge-xl bg-gradient-warning">
                  {{ dt.nbSignal }}
                </span>
              </td>
              <td class="align-middle text-center text-sm">
                <button
                  @click="BlockUser(dt._id, dt.phone_number)"
                  class="btn btn-sm btn-danger mt-2"
                >
                  Bloquer
                </button>
              </td>
            </tr>
            <!-- <tr>
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <img
                      src="../../assets/img/small-logos/logo-atlassian.svg"
                      class="avatar avatar-sm me-3"
                      alt="atlassian"
                    />
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ data2 }}</h6>
                  </div>
                </div>
              </td>
              <td>
                <div class="avatar-group mt-2">
                  <a
                    href="javascript:;"
                    class="avatar avatar-xs rounded-circle"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title=""
                    data-bs-original-title="Romina Hadid"
                  >
                    <img src="../../assets/img/team-2.jpg" alt="team5" />
                  </a>
                  <a
                    href="javascript:;"
                    class="avatar avatar-xs rounded-circle"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title=""
                    data-bs-original-title="Jessica Doe"
                  >
                    <img src="../../assets/img/team-4.jpg" alt="team6" />
                  </a>
                </div>
              </td>
              <td class="align-middle text-center text-sm">
                <span class="text-xs font-weight-bold"> $3,000 </span>
              </td>
              <td class="align-middle">
                <div class="progress-wrapper w-75 mx-auto">
                  <div class="progress-info">
                    <div class="progress-percentage">
                      <span class="text-xs font-weight-bold">10%</span>
                    </div>
                  </div>
                  <div class="progress">
                    <div
                      class="progress-bar bg-gradient-info w-10"
                      role="progressbar"
                      aria-valuenow="10"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              </td>
            </tr> -->
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import signalService from "../../services/signal.service";
import blacklistService from "../../services/blacklist.service";
import authService from "../../services/auth.service";

export default {
  name: "project-card",
  props: {
    Action: {
      type: String,
      default: "Action",
    },
    AnotherAction: {
      type: String,
      default: "Another Action",
    },
    SomethingElse: {
      type: String,
      default: "Something else here",
    },
    th1: {
      type: String,
      default: "COMPANIES",
    },
    th2: {
      type: String,
      default: "MEMBERS",
    },
    th3: {
      type: String,
      default: "BUDGET",
    },
    th4: {
      type: String,
      default: "COMPLETION",
    },
    title: {
      type: String,
      default: "Projects",
    },
    desc: {
      type: String,
      default: "this month",
    },
    descBold: {
      type: String,
      default: "30 done",
    },
    data1: {
      type: String,
      default: "Material XD Version",
    },
    data2: {
      type: String,
      default: "Add Progress Track",
    },
    data3: {
      type: String,
      default: "Fix Platform Errors",
    },
    data4: {
      type: String,
      default: "Launch our Mobile App",
    },
    data5: {
      type: String,
      default: "Add the New Pricing Page",
    },
    data6: {
      type: String,
      default: "Redesign New Online Shop",
    },
    empty: {
      type: String,
      default: "Not set",
    },
  },
  data() {
    return {
      patientList: [],
    };
  },
  async mounted() {
    this.patientList = await signalService.orderPatientBySignal();
  },
  methods: {
    async BlockUser(id, tel) {
      await blacklistService.addtoBlacklist(id, tel);
      await authService.deleteUser(id);
      this.patientList = await signalService.orderPatientBySignal();
    },
  },
};
</script>
