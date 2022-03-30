import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import "v-calendar/dist/style.css";
import MaterialDashboard from "./material-dashboard";
import VCalendar from "v-calendar";

const appInstance = createApp(App);
appInstance.use(store);
appInstance.use(router);
appInstance.use(MaterialDashboard);
// Use plugin with defaults
appInstance.use(VCalendar, {});
appInstance.mount("#app");
