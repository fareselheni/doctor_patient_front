<template>
  <!-- <app-header /> -->
  <home
    v-if="appState === 'idle'"
    :joinCall="joinCall"
    :opened="open"
    :scheduler="schedulerEvent"
    :participantLength="participantsLength"
  />
  <call
    id="call"
    v-else-if="appState === 'incall'"
    :leaveCall="leaveCall"
    :name="name"
    :roomUrl="roomUrl"
    @load="onLoadChild"
  />
</template>

<script>
import Call from "./Call.vue";
// import AppHeader from "./AppHeader.vue";
import Home from "./Home.vue";
import schedulerService from "../../services/scheduler.service";

export default {
  name: "App",
  components: {
    Call,
    // AppHeader,
    Home,
  },
  data() {
    return {
      appState: "idle",
      name: "Guest",
      roomUrl: null,
      schedulerEvent: [],
      open: false,
      participantsLength: false,
    };
  },
  // async mounted() {
  //   this.schedulerEvent = await schedulerService.getEventByLink(this.roomUrl);
  // },

  methods: {
    /**
     * Set name and URL values entered in Home.vue form in data obj
     */
    joinCall(name, url) {
      this.name = name;
      this.roomUrl = url;
      this.appState = "incall";
    },
    // Reset app state to return to the home screen after leaving call
    async leaveCall() {
      this.schedulerEvent = await schedulerService.getEventByLink(this.roomUrl);
      this.open = true;
      this.appState = "idle";
    },
    onLoadChild(value) {
      if (value > 1) {
        this.participantsLength = true;
      }
      //console.log("ggb", this.participantsLength); // someValue
    },
  },
};
</script>

<style scoped>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-x: hidden;
  background-color: #121a24;
}
a {
  text-decoration: none;
  color: #2c3e50;
  display: flex;
  align-items: center;
}
body {
  margin: 0;
}
#call {
  height: 90vh;
}
</style>
