import axios from "axios";
import store from "../store";
const API_URL = "http://localhost:3000/api/dashboard/doctor/";
class DoctorApiService {
  async CountWeekAppointments() {
    const response = await axios.get(API_URL + "countWeekApp", {
      params: {
        doctor_id: store.state.auth.user.id,
      },
    });
    return response.data.result;
  }
  async PourcentageweekAppointments() {
    const response = await axios.get(API_URL + "PourcentageweekAppointments", {
      params: {
        doctor_id: store.state.auth.user.id,
      },
    });
    return response.data.result;
  }
  async CountTodayAppointments() {
    const response = await axios.get(API_URL + "countTodayApp", {
      params: {
        doctor_id: store.state.auth.user.id,
      },
    });
    return response.data.result;
  }
  async PourcentageTodayAppointments() {
    const response = await axios.get(API_URL + "PourcentageTodayAppointments", {
      params: {
        doctor_id: store.state.auth.user.id,
      },
    });
    return response.data.result;
  }
  async CountThisMonthAppointments() {
    const response = await axios.get(API_URL + "countMonthApp", {
      params: {
        doctor_id: store.state.auth.user.id,
      },
    });
    return response.data.result;
  }
  async PourcentageMonthAppointments() {
    const response = await axios.get(API_URL + "PourcentageMonthAppointments", {
      params: {
        doctor_id: store.state.auth.user.id,
      },
    });
    return response.data.result;
  }
}

export default new DoctorApiService();
