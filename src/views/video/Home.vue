<template>
  <main>
    <div class="wrapper">
      <h1 class="mt-4">VisioConférence Haute qualité</h1>
      <p class="mt-4">Service de visioconférence professionnel sécurisé</p>

      <form class="join-form" @submit="joinWithName">
        <div class="name-container">
          <label for="name">Nom et Prénom</label>
          <input type="text" id="name" required v-model="name" disabled />
          <label for="name">Daily URL</label>
          <input type="text" id="url" required v-model="url" />
        </div>
        <div class="submit-container">
          <button type="submit" class="btn btn-outline-success btn-sm mt-3">
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
          <h3 class="modal-title" id="doctorModalLabel">
            Clôturer ce rendez-vous
          </h3>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row justify-content-around">
            <div id="form" class="p-2">
              <h5 class="mt-2">Générer une ordonnance</h5>
              <p class="mt-2">Pour {{ this.patientName }}</p>
              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label pt-2"
                  >Liste des médicaments</label
                >
                <textarea
                  class="form-control border border-dark"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  v-model="drugs"
                ></textarea>
              </div>
              <div class="d-flex justify-content-center">
                <button
                  type="button"
                  class="btn btn-outline-success btn-sm"
                  @click="voir"
                >
                  Prévisualiser
                  <i class="material-icons-round opacity-10 fs-5">filter </i>
                </button>
              </div>
            </div>
            <div id="withbutton" class="d-flex flex-column d-none p-2">
              <div id="maindiv" ref="document">
                <div class="d-flex flex-column">
                  <label id="patient_name" class="pt-6 ps-5"
                    >nom du patient</label
                  >
                  <label id="date" class="ps-12">{{ date }}</label>
                  <label id="drug" class="ps-3">Liste des médicaments</label>
                </div>
              </div>
              <!-- <div class="w-50 pt-2 m-auto d-flex justify-content-center">
                <button
                  class="btn btn-outline-success btn-sm"
                  @click="exportToPDF"
                >
                  <i class="material-icons-round opacity-10 fs-5"
                    >file_download
                  </i>
                </button>
              </div> -->
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-primary btn-sm"
            data-bs-dismiss="modal"
          >
            <i class="material-icons-round opacity-10 fs-5">close </i>
          </button>
          <button
            type="button"
            class="btn btn-outline-success btn-sm"
            @click="sendToPatient"
          >
            Envoyer
            <i class="material-icons-round opacity-10 fs-5">send </i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PrescriptionService from "../../services/prescription.service";
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
    participantLength: {
      type: Boolean,
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
      patientName: "",
      drugs: "",
      date: new Date().toLocaleDateString(),
      schedulerId: "",
    };
  },
  methods: {
    // Submit form with prop method defined in App.vue
    async joinWithName() {
      this.joinCall(this.name, this.url);
      localStorage.setItem("MeetUrl", this.url);
      // console.log("INSIDE JOIN", this.eventtoUpdate);
    },
    async setRating(rating) {
      this.rating = rating;
      const event = {
        score: this.rating,
        doctor_id: this.scheduler[0].doctor_id,
      };
      await RatingService.addnewRating(event);
    },
    async voir() {
      document.getElementById("drug").innerHTML = this.drugs;
      document.getElementById("patient_name").innerHTML = this.patientName;
      if (
        document.getElementById("withbutton").className ==
        "d-flex flex-column d-none"
      ) {
        document.getElementById("withbutton").className = "d-flex flex-column";
      } else {
        document.getElementById("withbutton").className =
          "d-flex flex-column d-none";
      }
    },
    async sendToPatient() {
      const event = {
        scheduler_id: this.schedulerId,
        drugs: this.drugs,
        date: this.date,
        user_id: this.scheduler[0].user_id,
      };
      await PrescriptionService.addnewPrescription(event);
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
  async mounted() {
    if (this.participantLength == true) {
      if (this.openModal && this.showToPatient) {
        var PatienttoggleButton = document.getElementById("toggleModalPatient");
        PatienttoggleButton.click();
        this.ratingDoctorName = this.scheduler[0].doctor_name;
      }
      if (this.openModal && this.showToDoctor) {
        var DoctortoggleButton = document.getElementById("toggleModalDoctor");
        DoctortoggleButton.click();
        this.patientName = this.scheduler[0].user_name;
        this.schedulerId = this.scheduler[0]._id;
      }
      const url = await schedulerService.getEventByLink(
        localStorage.getItem("MeetUrl")
      );
      const eventtoUpdate = {
        _id: url[0]._id,
        status: "cloturé",
      };
      await schedulerService.updateevent(eventtoUpdate);
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
@import url("http://fonts.cdnfonts.com/css/over-the-rainbow");
#maindiv {
  height: 400px;
  width: 377px;
  position: initial;
  background-image: url("../../assets/img/prescription_img.jpg");
}

#patient_name,
#date,
#drug {
  white-space: pre-wrap;
  font-family: "Over the Rainbow", sans-serif;
  color: #002b59;
  font-weight: bold;
}
</style>
