<template>
  <div class="py-4 container-fluid">
    <div class="row mb-4">
      <div class="col-lg-12 position-relative z-index-2">
        <div class="row">
          <div class="col-lg-4 col-md-6 col-sm-6 mt-lg-0 mt-4">
            <mini-cards
              title="RDV aujourd'hui"
              :value="TodayAppointmentsCount"
              :percentage="PourcentageTodayAppointments + '%'"
              iconName="weekend"
              detail="par rapport à hier"
              iconClass="text-white"
              iconBackground="bg-gradient-dark"
            />
          </div>
          <div class="col-lg-4 col-md-6 col-sm-6 mt-lg-0 mt-4">
            <mini-cards
              title="RDV cette semaine"
              :value="WeekAppointmentsCount"
              :percentage="PourcentageweekAppointments + '%'"
              iconName="weekend"
              detail="(pra) semaine derniere"
              iconClass="text-white"
              iconBackground="bg-gradient-primary"
            />
          </div>
          <div class="col-lg-4 col-md-6 col-sm-6 mt-lg-0 mt-4">
            <mini-cards
              title="RDV ce mois"
              :value="CountThisMonthAppointments"
              :percentage="PourcentageMonthAppointments + '%'"
              valueColor="text-danger"
              iconName="weekend"
              detail="(pra) mois dernier"
              iconClass="text-white"
              iconBackground="bg-gradient-success"
            />
          </div>
          <!-- <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4">
            <mini-cards
              title="Total des RDV"
              :value="AllApp"
              valueColor="text-danger"
              iconName="weekend"
              detail="."
              iconClass="text-white"
              iconBackground="bg-gradient-success"
            />
          </div> -->
        </div>
        <div class="row d-flex justify-content-evenly pt-4">
          <div class="col-lg-4 col-md-6 col-sm-6 mt-lg-0 mt-4">
            <length-mini-cards
              title="Total des rendez-vous"
              :value="AllApp"
              iconName="weekend"
              detail=""
              iconClass="text-white"
              iconBackground="bg-gradient-info"
            />
          </div>
          <div class="col-lg-4 col-md-6 col-sm-6 mt-lg-0 mt-4">
            <length-mini-cards
              title="Total des patients"
              :value="patientLength"
              iconName="person"
              detail=""
              iconClass="text-white"
              iconBackground="bg-gradient-info"
            />
          </div>
          <div class="col-lg-4 col-md-6 col-sm-6 mt-lg-0 mt-4">
            <length-mini-cards
              title="Total des docteurs"
              :value="doctorLength"
              iconName="person"
              detail=""
              iconClass="text-white"
              iconBackground="bg-gradient-info"
            />
          </div>
        </div>
        <div class="row mt-4 d-flex justify-content-center">
          <div class="col-lg-6 col-md-6 mt-4">
            <chart-bars />
          </div>
          <div class="col-lg-6 col-md-6 mt-4">
            <chart-line />
          </div>
          <!-- <div class="col-lg-4 mt-4">
            <chart-line-tasks />
          </div> -->
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12 col-md-6 mb-md-0 mb-4">
        <projects-card />
      </div>
      <div class="col-lg-4 col-md-6">
        <!-- <orders-card /> -->
      </div>
    </div>
  </div>
</template>
<script>
import ChartBars from "../views/admin/components/AdminChartBars.vue";
import ChartLine from "../views/admin/components/AdminChartLine.vue";
// import ChartLineTasks from "./components/ChartLineTasks.vue";
import MiniCards from "./components/MiniCards.vue";
import lengthMiniCards from "./components/lengthMiniCards.vue";
import ProjectsCard from "./components/ProjectsCard.vue";
// import OrdersCard from "./components/OrdersCard.vue";
import DoctorApiService from "../services/admin_api.service";
import ModelService from "../services/model.service";

export default {
  name: "dashboard-default",
  components: {
    ChartBars,
    ChartLine,
    // ChartLineTasks,
    MiniCards,
    lengthMiniCards,
    ProjectsCard,
    // OrdersCard,
  },
  data() {
    return {
      AllApp: 0,
      TodayAppointmentsCount: 0,
      PourcentageTodayAppointments: 0,
      WeekAppointmentsCount: 0,
      PourcentageweekAppointments: 0,
      CountThisMonthAppointments: 0,
      PourcentageMonthAppointments: 0,
      patientList: [],
      patientLength: 0,
      DoctorList: [],
      doctorLength: 0,
    };
  },
  methods: {
    async CountWeekAppointments() {
      this.AllApp = await DoctorApiService.CountAllAppointments();
      this.TodayAppointmentsCount = await DoctorApiService.CountTodayAppointments();
      this.PourcentageTodayAppointments = await DoctorApiService.PourcentageTodayAppointments();
      this.WeekAppointmentsCount = await DoctorApiService.CountWeekAppointments();
      this.PourcentageweekAppointments = await DoctorApiService.PourcentageweekAppointments();
      this.CountThisMonthAppointments = await DoctorApiService.CountThisMonthAppointments();
      this.PourcentageMonthAppointments = await DoctorApiService.PourcentageMonthAppointments();
    },
    getUniqueListBy(arr, key) {
      return [...new Map(arr.map((item) => [item[key], item])).values()];
    },
  },
  async mounted() {
    this.patientList = await ModelService.allpatients();
    this.patientLength = await this.patientList.length;
    this.DoctorList = await ModelService.alldoctors();
    this.doctorLength = await this.DoctorList.length;
    await this.CountWeekAppointments();
  },
};
</script>
