/* eslint-disable no-undef */
<template>
  <div ref="scheduler"></div>
</template>

<script>
import "dhtmlx-scheduler";
import axios from "axios";

export default {
  name: "scheduler",
  props: {
    events: {
      type: Array,
      default() {
        // eslint-disable-next-line vue/require-valid-default-prop
        return { events: [], evs: [] };
      },
    },
  },

  methods: {
    // test: async function () {
    //   const newevent = {
    //     start_date: "2020-01-20 6:00",
    //     end_date: "2020-01-20 15:00",
    //   };
    //   console.log("teeeee", scheduler.checkCollision(newevent));
    // },
    $_initSchedulerEvents: function () {
      //default definition
      // eslint-disable-next-line no-undef
      // scheduler.templates.event_text = function (start, end, ev) {
      //   return ev.text;
      // };
      // // eslint-disable-next-line no-undef
      // scheduler.attachEvent("onTemplatesReady", function () {
      //   // eslint-disable-next-line no-undef
      //   scheduler.templates.event_text = function (start, end, event) {
      //     return "<b>" + event.user_name + "</b><i>" + "hello" + "</i>";
      //   };
      // });
      // eslint-disable-next-line no-undef
      if (!scheduler.$_eventsInitialized) {
        // eslint-disable-next-line no-undef
        scheduler.attachEvent("onEventAdded", (id, ev) => {
          this.$emit("event-updated", id, "inserted", ev);
          //
          const newevent = {
            start_date: ev.start_date,
            end_date: ev.end_date,
            text: ev.text,
            user_id: this.$store.state.auth.user.id,
            doctor_id: this.$store.state.auth.user.id,
          };
          this.$store.dispatch("scheduler/newevent", newevent).then(
            () => {
              console.log(ev);
            },
            (error) => {
              this.loading = false;
              this.message =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
            }
          );
          //
        });
        // eslint-disable-next-line no-undef
        scheduler.attachEvent("onEventChanged", (id, ev) => {
          this.$emit("event-updated", id, "updated", ev);
          const idd = JSON.parse(JSON.stringify(ev._id));
          const text = JSON.parse(JSON.stringify(ev.text));
          const start_date = JSON.parse(JSON.stringify(ev.start_date));
          const end_date = JSON.parse(JSON.stringify(ev.end_date));
          console.log("idd", idd);
          const event = {
            _id: idd,
            start_date: start_date,
            end_date: end_date,
            text: text,
          };
          axios
            .put(
              `http://localhost:3000/api/scheduler/updateevent/${idd}`,
              event
            )
            .then((response) => {
              console.log(response);
            });
        });
        // eslint-disable-next-line no-undef
        scheduler.attachEvent("onEventDeleted", (id, ev) => {
          this.$emit("event-updated", id, "deleted");
          //console.log("etet", JSON.parse(JSON.stringify(ev._id)));
          const idd = JSON.parse(JSON.stringify(ev._id));
          // this.$store.dispatch("scheduler/deleteevent", obj);
          console.log("idd", idd);
          axios
            .delete(`http://localhost:3000/api/scheduler/deleteevent/${idd}`)
            .then((response) => {
              console.log(response);
            });
        });

        // eslint-disable-next-line no-undef
        scheduler.$_eventsInitialized = true;
      }
    },
  },

  mounted: function () {
    // this.test();
    // eslint-disable-next-line no-undef
    scheduler.skin = "material";
    // eslint-disable-next-line no-undef
    scheduler.config.header = [
      "day",
      "week",
      "month",
      "date",
      "prev",
      "today",
      "next",
    ];

    this.$_initSchedulerEvents();

    // eslint-disable-next-line no-undef
    scheduler.init(this.$refs.scheduler, new Date(), "week");
    // eslint-disable-next-line no-undef
    scheduler.parse(this.$props.events);
    // console.log("evvvvvv", this.$props.events);
  },
};
</script>

<style>
@import "~dhtmlx-scheduler/codebase/dhtmlxscheduler_material.css";
</style>
