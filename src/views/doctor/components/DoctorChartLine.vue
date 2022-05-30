<template>
  <div class="card z-index-2">
    <div
      class="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent"
    >
      <div
        class="bg-gradient-success shadow-success border-radius-lg py-3 pe-1"
      >
        <div class="chart">
          <canvas id="chart-line" class="chart-canvas" height="170"></canvas>
        </div>
      </div>
    </div>
    <div class="card-body">
      <h6 class="mb-0">{{ title }}</h6>
      <p class="text-sm">
        {{ desc }}
      </p>
      <hr class="dark horizontal" />
      <div class="d-flex">
        <i class="material-icons text-sm my-auto me-1">schedule</i>
        <p class="mb-0 text-sm">{{ date }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import DoctorApiService from "../../../services/doctor_api.service";

export default {
  name: "doctor-chart-line",
  props: {
    title: {
      type: String,
      default: "Répartition des rendez-vous",
    },
    desc: {
      type: String,
      default: "Par mois",
    },
    date: {
      type: String,
      default: "campaign sent 2 days ago",
    },
  },
  data() {
    return {
      CountEveryMonthAppointments: "",
    };
  },
  methods: {
    async Countcharts() {
      this.CountEveryMonthAppointments = await DoctorApiService.CountEveryMonthAppointments();
    },
  },
  async mounted() {
    await this.Countcharts();
    var ctx2 = document.getElementById("chart-line").getContext("2d");

    new Chart(ctx2, {
      type: "line",
      data: {
        labels: [
          "Jan",
          "Fev",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "RDV",
            tension: 0,
            borderWidth: 0,
            pointRadius: 5,
            pointBackgroundColor: "rgba(255, 255, 255, .8)",
            pointBorderColor: "transparent",
            borderColor: "rgba(255, 255, 255, .8)",
            // eslint-disable-next-line no-dupe-keys
            borderColor: "rgba(255, 255, 255, .8)",
            // eslint-disable-next-line no-dupe-keys
            borderWidth: 4,
            backgroundColor: "transparent",
            fill: true,
            data: [
              this.CountEveryMonthAppointments.january,
              this.CountEveryMonthAppointments.february,
              this.CountEveryMonthAppointments.march,
              this.CountEveryMonthAppointments.april,
              this.CountEveryMonthAppointments.may,
              this.CountEveryMonthAppointments.june,
              this.CountEveryMonthAppointments.july,
              this.CountEveryMonthAppointments.august,
              this.CountEveryMonthAppointments.september,
              this.CountEveryMonthAppointments.october,
              this.CountEveryMonthAppointments.november,
              this.CountEveryMonthAppointments.december,
            ],
            maxBarThickness: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        interaction: {
          intersect: false,
          mode: "index",
        },
        scales: {
          y: {
            grid: {
              drawBorder: false,
              display: true,
              drawOnChartArea: true,
              drawTicks: false,
              borderDash: [5, 5],
              color: "rgba(255, 255, 255, .2)",
            },
            ticks: {
              display: true,
              color: "#f8f9fa",
              padding: 10,
              font: {
                size: 14,
                weight: 300,
                family: "Roboto",
                style: "normal",
                lineHeight: 2,
              },
            },
          },
          x: {
            grid: {
              drawBorder: false,
              display: false,
              drawOnChartArea: false,
              drawTicks: false,
              borderDash: [5, 5],
            },
            ticks: {
              display: true,
              color: "#f8f9fa",
              padding: 10,
              font: {
                size: 14,
                weight: 300,
                family: "Roboto",
                style: "normal",
                lineHeight: 2,
              },
            },
          },
        },
      },
    });
  },
};
</script>
