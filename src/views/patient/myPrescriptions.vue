<template>
  <div id="card" class="card">
    <div class="card-header pb-0 px-3">
      <h6 class="mb-0">Billing Information</h6>
    </div>
    <div class="card-body pt-4 p-3">
      <ul class="list-group" v-for="dt in mesRDVcloturé" :key="dt._id">
        <li
          class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-200 border-radius-lg"
        >
          <div class="d-flex flex-column">
            <h6 class="mb-3 text-sm">{{ dt.doctor_name }}</h6>
            <span class="mb-2 text-xs">
              Date:
              <span class="text-dark font-weight-bold ms-sm-2">{{
                dt.start_date.split(/[T ,]+/)[0]
              }}</span>
            </span>
            <span class="mb-2 text-xs">
              Email Address:
              <span class="text-dark ms-sm-2 font-weight-bold"
                >oliver@burrito.com</span
              >
            </span>
          </div>
          <div class="ms-auto text-end">
            <a
              class="btn btn-link text-danger text-gradient px-3 mb-0"
              href="javascript:;"
            >
              <i class="far fa-trash-alt me-2" aria-hidden="true"></i>Delete
            </a>
            <a class="btn btn-link text-dark px-3 mb-0" href="javascript:;">
              <i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i
              >Edit
            </a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import SchedulerService from "../../services/scheduler.service";
export default {
  name: "myPrescriptions",
  data() {
    return {
      mesRDVcloturé: [],
    };
  },
  async mounted() {
    this.mesRDVcloturé = await SchedulerService.patientallCLosedevents();
    console.log(this.mesRDVcloturé);
  },
  methods: {},
};
</script>

<style scoped>
@import url("http://fonts.cdnfonts.com/css/over-the-rainbow");
#maindiv {
  height: 400px;
  width: 377px;
  position: initial;
  background-image: url("../../assets/img/prescription_img.jpg");
}
/* #form {
  height: 400px;
  width: 377px;
} */

#patient_name,
#date,
#drug {
  white-space: pre-wrap;
  font-family: "Over the Rainbow", sans-serif;
  color: #002b59;
  font-weight: bold;
}
#card {
  min-height: 450px;
}
</style>
