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
</template>

<script>
export default {
  name: "Home",
  props: {
    joinCall: {
      type: Function,
    },
  },
  data() {
    return {
      name:
        this.$store.state.auth.user.firstname +
        " " +
        this.$store.state.auth.user.lastname,
      url: "",
    };
  },
  methods: {
    // Submit form with prop method defined in App.vue
    joinWithName() {
      this.joinCall(this.name, this.url);
    },
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
</style>
