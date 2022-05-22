<template>
  <div
    class="card mb-2 h-100"
    :class="directionReverse ? reverseDirection : ''"
  >
    <div class="card-header p-3 pt-2">
      <div
        class="icon icon-lg icon-shape shadow-dark shadow text-center border-radius-xl mt-n4 position-absolute"
        :class="iconBackground"
      >
        <img
          v-if="pdp"
          :src="pdp"
          alt="profile_image"
          class="shadow-sm w-100 h-100 border-radius-lg"
        />
        <i
          v-if="!pdp"
          class="material-icons opacity-10"
          :class="iconClass"
          aria-hidden="true"
          >{{ iconName }}</i
        >
      </div>
      <div
        class="pt-1"
        :class="this.$store.state.isRTL ? 'text-start' : 'text-end'"
      >
        <p class="text-sm mb-0 text-capitalize">{{ title }}</p>
        <h4 class="mb-0">{{ value }}</h4>
        <div class="d-flex justify-content-between">
          <div>
            <star-rating
              @update:rating="setRating"
              :border-width="1"
              :star-size="18"
              :show-rating="false"
              :animate="true"
              :star-points="[
                23,
                2,
                14,
                17,
                0,
                19,
                10,
                34,
                7,
                50,
                23,
                43,
                38,
                50,
                36,
                34,
                46,
                19,
                31,
                17,
              ]"
              :active-on-click="true"
              :clearable="true"
              :padding="3"
            />
          </div>
          <div class="d-flex">
            <div class="text-lg font-weight-bolder">
              {{ doctorscore.toFixed(2) }}
            </div>
            <div>
              <i class="material-icons-round icon-yellow opacity-10 fs-5"
                >stars</i
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr class="dark horizontal my-0" />
    <div
      class="card-footer p-3"
      :class="this.$store.state.isRTL ? 'text-start' : 'text-end'"
    >
      <p class="mb-0">
        {{ detail }}
      </p>
      <div>
        <router-link
          :to="{ name: 'prendrerdv', params: { id: doctor_id } }"
          tag="button"
          class="btn btn-outline-success mt-2"
          fullWidth
          >Prendre RDV</router-link
        >
      </div>
      <!-- <button
        @click="$router.push({ name: 'prendrerdv', params: { id: doctor_id } })"
      >
        Click to Navigate
      </button> -->
      <!-- <div class="d-flex justify-content-center">
        <star-rating @update:rating="setRating" :star-size="20" />
      </div> -->
    </div>
  </div>
</template>

<script>
import RatingService from "../../services/rating.service";
import StarRating from "vue-star-rating";
export default {
  name: "mini-cards",
  components: {
    StarRating,
  },
  data() {
    return {
      rating: 0,
      doctorscore: 0,
      reverseDirection: "flex-row-reverse justify-content-between",
    };
  },
  async mounted() {
    // eslint-disable-next-line vue/no-mutating-props
    await this.getDoctorScore();
  },
  methods: {
    async setRating(rating) {
      this.rating = rating;
      const event = {
        score: this.rating,
        doctor_id: this.doctor_id,
      };
      await RatingService.addnewRating(event);
      await this.getDoctorScore();
    },
    async getDoctorScore() {
      this.doctorscore = await RatingService.getScore(this.doctor_id);
    },
  },
  props: {
    directionReverse: Boolean,
    title: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
      required: true,
    },
    value: {
      required: true,
    },
    percentage: String,
    iconName: {
      type: String,
      required: true,
    },
    iconClass: {
      type: String,
      required: true,
    },
    iconBackground: {
      type: String,
      default: "bg-white",
    },
    pdp: {
      type: String,
    },
    doctor_id: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
i.icon-yellow {
  color: rgb(255, 196, 0);
}
</style>
