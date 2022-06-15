<template>
  <div>SUCCESS</div>
</template>
<script>
import timedispoService from "../../services/timedispo.service";
export default {
  name: "success",
  data() {
    return {
      date: Date.now(),
      doctimedispo: [],
      snackbar: null,
      typeRDV: "visio",
      existingPreApp: null,
    };
  },
  async mounted() {
    const event = {
      paiement_id: this.$route.query.payment_id,
      payed: true,
    };
    const check = await timedispoService.updateByPaiementId(event);
    console.log(check);
  },
  methods: {},
};
</script>
