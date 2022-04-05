<template>
  <Form role="form" @submit="handleRegister">
    <v-date-picker v-model="date" />
    {{ this.date }}
    <div class="col-lg-2 col-md-6 col-sm-6 mt-lg-0 mt-4 py-4">
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
    </div>
  </Form>
</template>

<script>
import timedispoService from "../../services/timedispo.service";
import { Form } from "vee-validate";
export default {
  name: "prendrerdv",
  components: {
    Form,
  },
  data() {
    return {
      date: "",
      doctimedispo: [],
    };
  },
  async mounted() {
    console.log(this.$route.params.id);
  },
  methods: {
    async handleRegister() {
      const ev = {
        _id: this.$route.params.id,
        start_date: this.date.toISOString().split(/[T ,]+/)[0],
      };
      this.doctimedispo = await timedispoService.getDoctorTimeDispo(ev);
      console.log("date", this.$data);
    },
  },
};
</script>
