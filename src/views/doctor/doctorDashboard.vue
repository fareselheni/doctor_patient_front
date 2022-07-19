<template>
  <div class="py-4 container-fluid">
    <div class="row mb-4">
      <div class="col-lg-12 position-relative z-index-2">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-sm-6">
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
          <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4">
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
          <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4">
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
          <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4">
            <mini-cards
              title="Total des rendez-vous"
              :value="AllApp"
              percentage=""
              iconName="weekend"
              detail="."
              iconClass="text-white"
              iconBackground="bg-gradient-info"
            />
          </div>
        </div>
        <div class="row d-flex justify-content-evenly pt-4">
          <div class="col-lg-4 col-md-6 col-sm-6 mt-lg-0 mt-4">
            <length-mini-cards
              title="total rendez-vous annulés"
              :value="canceledApp"
              iconName="person"
              detail=""
              iconClass="text-white"
              iconBackground="bg-gradient-info"
            />
          </div>
          <div class="col-lg-4 col-md-6 col-sm-6 mt-lg-0 mt-4">
            <length-mini-cards
              title="Score actuel"
              :value="doctorscore.toFixed(2)"
              iconName="person"
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
        </div>
        <div class="row mt-4">
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

    <!-- <div class="row">
      <div class="col-lg-8 col-md-6 mb-md-0 mb-4">
        <projects-card />
      </div>
      <div class="col-lg-4 col-md-6">
        <orders-card />
      </div>
    </div> -->
  </div>
</template>
<script>
import ChartBars from "./components/DoctorChartBars.vue";
import ChartLine from "./components/DoctorChartLine.vue";
// import ChartLineTasks from "../components/ChartLineTasks.vue";
import MiniCards from "../components/MiniCards.vue";
import lengthMiniCards from "../components/lengthMiniCards.vue";
// import ProjectsCard from "../components/ProjectsCard.vue";
// import OrdersCard from "../components/OrdersCard.vue";
import DoctorApiService from "../../services/doctor_api.service";
import SchedulerService from "../../services/scheduler.service";
import ratingService from "../../services/rating.service";

export default {
  name: "dashboard-doctor",
  components: {
    ChartBars,
    ChartLine,
    // ChartLineTasks,
    MiniCards,
    lengthMiniCards,
    // ProjectsCard,
    // OrdersCard,
  },
  data() {
    return {
      AllApp: 0,
      canceledApp: 0,
      TodayAppointmentsCount: 0,
      PourcentageTodayAppointments: 0,
      WeekAppointmentsCount: 0,
      PourcentageweekAppointments: 0,
      CountThisMonthAppointments: 0,
      PourcentageMonthAppointments: 0,
      patientList: [],
      patientLength: 0,
      doctorscore: 0,
    };
  },
  methods: {
    async CountWeekAppointments() {
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
    async getDoctorScore() {
      this.doctorscore = await ratingService.getScore(
        this.$store.state.auth.user.id
      );
    },
  },
  async mounted() {
    this.AllApp = await DoctorApiService.CountAllAppointments();
    this.canceledApp = await DoctorApiService.CountCanceledAppointments();
    this.patientList = await SchedulerService.allevents();
    this.patientList = this.getUniqueListBy(this.patientList, "user_name");
    this.patientLength = this.patientList.length - 1;
    await this.CountWeekAppointments();
    await this.getDoctorScore();
  },
};
</script>
