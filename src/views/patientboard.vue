<template>
  <div class="py-4 container-fluid">
    <div class="row mb-4">
      <div class="col-lg-12 position-relative z-index-2">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-sm-6">
            <mini-cards
              title="Today's Money"
              value="$53k"
              percentage="+55%"
              iconName="weekend"
              detail="than last week"
              iconClass="text-white"
              iconBackground="bg-gradient-dark"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4">
            <mini-cards
              title="Today's Users"
              value="2,300"
              percentage="+3%"
              iconName="person"
              detail="than last month"
              iconClass="text-white"
              iconBackground="bg-gradient-primary"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4">
            <mini-cards
              title="New Clients"
              value="3,462"
              percentage="-2%"
              valueColor="text-danger"
              iconName="person"
              detail="than yesterday"
              iconClass="text-white"
              iconBackground="bg-gradient-success"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4">
            <mini-cards
              title="Sales"
              value="$103,430"
              percentage="+5%"
              iconName="weekend"
              detail="Just updated"
              iconClass="text-white"
              iconBackground="bg-gradient-info"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MiniCards from "./components/MiniCards.vue";

export default {
  name: "patientboard",
  components: {
    MiniCards,
  },
};
</script>

<style></style>
