/* eslint-disable no-undef */
<template>
  <div ref="scheduler"></div>
</template>

<script>
import "dhtmlx-scheduler";

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
    $_initSchedulerEvents: function () {
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
            user_id: "1",
            doctor_id: "1",
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
          // const event = {
          //   _id: ev._id,
          //   start_date: ev.start_date,
          //   end_date: ev.end_date,
          //   text: ev.text,
          // };
          // // console.log(event);
          // this.$store.dispatch("scheduler/updateevent", event);
        });
        // eslint-disable-next-line no-undef
        scheduler.attachEvent("onEventDeleted", (id, ev) => {
          this.$emit("event-updated", id, "deleted");
          console.log("del", ev);
          this.$store.dispatch("scheduler/deleteevent", ev);
        });

        // eslint-disable-next-line no-undef
        scheduler.$_eventsInitialized = true;
      }
    },
  },

  mounted: function () {
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
    scheduler.init(this.$refs.scheduler, new Date(2020, 0, 20), "week");
    // eslint-disable-next-line no-undef
    scheduler.parse(this.$props.events);
    // console.log("evvvvvv", this.$props.events);
  },
};
</script>

<style>
@import "~dhtmlx-scheduler/codebase/dhtmlxscheduler_material.css";
</style>
