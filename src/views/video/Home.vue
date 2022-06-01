<template>
  <main>
    <div class="wrapper">
      <h1 class="mt-4">VisioConférence Haute qualité</h1>
      <p class="mt-4">Service de visioconférence professionnel sécurisé</p>

      <form class="join-form" @submit="joinWithName">
        <div class="name-container">
          <label for="name">Your name</label>
          <input type="text" id="name" required v-model="name" disabled />
          <label for="name">Daily URL</label>
          <input type="text" id="url" required v-model="url" />
        </div>
        <div class="submit-container">
          <button type="submit" class="btn btn-outline-success mt-2">
            commencer la réunion
          </button>
        </div>
      </form>

      <p class="subtext mt-4">
        sélectionnez "Autoriser" pour utiliser votre caméra et votre micro pour
        cet appel
      </p>
    </div>
  </main>
  <!-- Button trigger modal -->
  <button
    id="toggleModalPatient"
    type="button"
    class="btn btn-primary invisible"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
  >
    Launch patient modal
  </button>

  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Notez Dr. {{ ratingDoctorName }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div>
            <Star-rating
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
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
  <!-- DOCTOR MODAL -->
  <!-- Button trigger modal -->
  <button
    id="toggleModalDoctor"
    type="button"
    class="btn btn-primary invisible"
    data-bs-toggle="modal"
    data-bs-target="#doctorModal"
  >
    Launch doctor modal
  </button>

  <!-- Modal -->
  <div
    class="modal fade"
    id="doctorModal"
    tabindex="-1"
    aria-labelledby="doctorModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="doctorModalLabel">
            Clôturer ce rendez-vous
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div>Doctoor</div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RatingService from "../../services/rating.service";
import StarRating from "vue-star-rating";
import schedulerService from "../../services/scheduler.service";
export default {
  name: "Home",
  props: {
    joinCall: {
      type: Function,
    },
    opened: {
      type: Boolean,
    },
    scheduler: {
      type: Array,
    },
  },
  components: {
    StarRating,
  },
  data() {
    return {
      name:
        this.$store.state.auth.user.firstname +
        " " +
        this.$store.state.auth.user.lastname,
      url: "",
      rating: 0,
      ratingDoctorName: "",
    };
  },
  methods: {
    // Submit form with prop method defined in App.vue
    async joinWithName() {
      this.joinCall(this.name, this.url);
      const url = await schedulerService.getEventByLink(this.url);
      const event = {
        _id: url[0]._id,
        status: "cloturé",
      };
      await schedulerService.updateevent(event);
      console.log("joineedd", url);
    },
    async setRating(rating) {
      this.rating = rating;
      const event = {
        score: this.rating,
        doctor_id: this.scheduler[0].doctor_id,
      };
      await RatingService.addnewRating(event);
    },
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showToPatient() {
      if (this.currentUser && this.currentUser["roles"]) {
        return this.currentUser["roles"].includes("ROLE_PATIENT");
      }
      return false;
    },
    showToDoctor() {
      if (this.currentUser && this.currentUser["roles"]) {
        return this.currentUser["roles"].includes("ROLE_DOCTOR");
      }
      return false;
    },
    openModal() {
      return this.opened;
    },
  },
  mounted() {
    if (this.openModal && this.showToPatient) {
      var PatienttoggleButton = document.getElementById("toggleModalPatient");
      PatienttoggleButton.click();
      this.ratingDoctorName = this.scheduler[0].doctor_name;
    }
    if (this.openModal && this.showToDoctor) {
      var DoctortoggleButton = document.getElementById("toggleModalDoctor");
      DoctortoggleButton.click();
    }
  },
};
</script>

<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: #fff;
}
.wrapper {
  max-width: 1200px;
  margin: auto;
  padding: 0 16px;
}
.wrapper p {
  margin: 8px 0;
}
.join-form {
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: auto;
}

.join-form label {
  font-size: 12px;
  color: #6b7785;
  text-align: left;
  margin: 8px 0 4px;
}
.join-form input {
  padding: 8px;
  border: 1px solid #c8d1dc;
  border-radius: 12px;
}
.join-form div {
  display: flex;
  justify-content: center;
}
/* .join-form .submit-container button {
  padding: 7px 16px 9px;
  font-size: 12px;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  margin-top: 16px;
  margin-bottom: 12px;
  background-color: #1bebb9;
  cursor: pointer;
} */
.join-form .name-container {
  flex-direction: column;
}
.subtext {
  font-size: 12px;
  color: #6b7785;
}
i.icon-yellow {
  color: rgb(255, 196, 0);
}
</style>
