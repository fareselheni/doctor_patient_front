<template>
  <div class="d-flex justify-content-center px-6 py-4 row">
    <div class="col-10 bg-white px-8 py-6 d-flex flex-row">
      <div class="col-6 d-flex flex-column">
        <i id="check" class="material-icons">check_circle</i>
        <p id="paiement" class="font-weight-bold">Paiement Réussi</p>
        <div class="d-flex flex-column">
          <span class="mb-4 text-xs">
            ID de la transaction :
            <div class="mt-1 text-dark font-weight-bold">
              {{ payment_id }}
            </div>
          </span>
          <span class="mb-4 text-xs">
            Utilisateur:
            <div class="mt-1 text-dark font-weight-bold">
              {{ username }}
            </div>
          </span>
          <span class="mb-4 text-xs">
            Montant de la transaction:
            <div class="mt-1 text-dark font-weight-bold">
              {{ amount }}
            </div>
          </span>
        </div>
      </div>
      <div class="col-3">
        <div id="image_user">
          <img src="../../assets/img/iconm.jpg" alt="user image" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import timedispoService from "../../services/timedispo.service";
import modelService from "../../services/model.service";
import paiementService from "../../services/paiement.service";
export default {
  name: "success",
  data() {
    return {
      date: Date.now(),
      doctimedispo: [],
      snackbar: null,
      typeRDV: "visio",
      existingPreApp: null,
      paiement: null,
      payment_id: null,
      user_id: null,
      username: null,
      amount: null,
    };
  },
  async mounted() {
    const event = {
      paiement_id: this.$route.query.payment_id,
      payed: true,
      status: "validé",
    };
    const updateTimedispo = await timedispoService.updateByPaiementId(event);
    console.log(updateTimedispo);
    const updatePaiement = await paiementService.updateByPaiementId(event);
    console.log(updatePaiement);
    this.payment_id = this.$route.query.payment_id;
    this.paiement = await paiementService.getPaiementbyPaymentId(
      this.payment_id
    );
    console.log("user_id", this.paiement[0].amount);
    this.user_id = this.paiement[0].user_id;
    this.amount = this.paiement[0].amount;
    this.username = await modelService.getDoctorById(this.user_id);
    this.username =
      this.username[0].firstname + " " + this.username[0].lastname;
  },
  methods: {},
};
</script>

<style scoped>
#check {
  font-size: 80px;
  color: rgb(0, 255, 115);
}
#paiement {
  font-size: 30px;
  color: rgb(0, 255, 115);
}
/* #image_user {
  height: 200px;
} */
</style>
