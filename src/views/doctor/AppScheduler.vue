<template>
  <div class="container py-4">
    <scheduler
      class="left-container border border-2"
      :events="events"
      @event-updated="logEventUpdate"
      v-if="rend"
    ></scheduler>
    <!-- <div class="right-container">
      <ul class="scheduler-messages">
        <li
          class="scheduler-message"
          v-for="message in messages"
          :key="message"
        >
          {{ message }}
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script>
import Scheduler from "./Scheduler.vue";
import schedulerService from "../../services/scheduler.service";

export default {
  name: "appScheduler",
  components: { Scheduler },
  data() {
    return {
      rend: false,
      events: [
        // {
        //   id: 1,
        //   start_date: "2020-01-20 6:00",
        //   end_date: "2020-01-20 15:00",
        //   text: "Event 1",
        //   user_id: this.currentUser,
        //   doctor_id: "1",
        // },
        // {
        //   id: 2,
        //   start_date: "2020-01-23 6:00",
        //   end_date: "2020-01-23 20:00",
        //   text: "Event 2",
        //   user_id: this.currentUser,
        //   doctor_id: "1",
        // },
      ],
      messages: [],
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user.firstname;
    },
  },
  async mounted() {
    this.events = await schedulerService.allevents();
    this.rend = true;
    // console.log("evvvvvvvvvvvvvvv", this.events);
  },
  methods: {
    addMessage(message) {
      this.messages.unshift(message);
      if (this.messages.length > 40) {
        this.messages.pop();
      }
    },

    logEventUpdate(id, mode, ev) {
      let text = ev && ev.text ? ` (${ev.text})` : "";
      let message = `Event ${mode}: ${id} ${text}`;
      this.addMessage(message);
    },
  },
};
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

.container {
  height: 100%;
  width: 100%;
}

.left-container {
  overflow: hidden;
  position: relative;
  height: 90vh;
  display: inline-block;
  width: 100%;
}

.right-container {
  border-right: 1px solid #cecece;
  float: right;
  height: 100%;
  width: 200px;
  box-shadow: 0 0 5px 2px #aaa;
  position: relative;
  z-index: 2;
}

.scheduler-messages {
  list-style-type: none;
  height: 50%;
  margin: 0;
  overflow-x: hidden;
  overflow-y: auto;
  padding-left: 5px;
}

.scheduler-messages > .scheduler-message {
  background-color: #f4f4f4;
  box-shadow: inset 5px 0 #d69000;
  font-family: Geneva, Arial, Helvetica, sans-serif;
  font-size: 14px;
  margin: 5px 0;
  padding: 8px 0 8px 10px;
}
</style>
