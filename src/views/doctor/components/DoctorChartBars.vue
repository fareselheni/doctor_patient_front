<template>
  <div class="card z-index-2">
    <div
      class="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent"
    >
      <div
        class="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1"
      >
        <div class="chart">
          <canvas id="chart-bars" class="chart-canvas" height="170"></canvas>
        </div>
      </div>
    </div>
    <div class="card-body">
      <h6 class="mb-0">{{ title }}</h6>
      <p class="text-sm">{{ desc }}</p>
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
  name: "doctor-chart-bars",
  props: {
    title: {
      type: String,
      default: "Répartition des rendez-vous",
    },
    desc: {
      type: String,
      default: "Par jour",
    },
    date: {
      type: String,
      default: "Derniére semaine",
    },
  },
  data() {
    return {
      CountEveryDayAppointments: "",
    };
  },
  methods: {
    async Countcharts() {
      this.CountEveryDayAppointments = await DoctorApiService.CountEveryDayAppointments();
    },
  },

  async mounted() {
    await this.Countcharts();
    var ctx = document.getElementById("chart-bars").getContext("2d");

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"],
        datasets: [
          {
            label: "RDV",
            tension: 0.4,
            borderWidth: 0,
            borderRadius: 4,
            borderSkipped: false,
            backgroundColor: "rgba(255, 255, 255, .8)",
            data: [
              this.CountEveryDayAppointments.monday,
              this.CountEveryDayAppointments.tuesday,
              this.CountEveryDayAppointments.wednesday,
              this.CountEveryDayAppointments.thursday,
              this.CountEveryDayAppointments.friday,
              this.CountEveryDayAppointments.saturday,
              0,
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
              suggestedMin: 0,
              suggestedMax: 500,
              beginAtZero: true,
              padding: 10,
              font: {
                size: 14,
                weight: 300,
                family: "Roboto",
                style: "normal",
                lineHeight: 2,
              },
              color: "#fff",
            },
          },
          x: {
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
        },
      },
    });
  },
};
</script>
