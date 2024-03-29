import axios from "axios";
import store from "../store";
const API_URL = "http://localhost:3000/api/signal/";
class RatingService {
  async addnewSignal(user_id) {
    return axios.post(API_URL + "add", {
      doctor_id: store.state.auth.user.id,
      user_id: user_id,
    });
  }
  async getNbSignalByUserId(event) {
    const response = await axios.get(API_URL + "getNbByUserId", {
      params: {
        user_id: event.user_id,
      },
    });
    return response.data;
  }
  async checkExistingSignal(id) {
    const response = await axios.get(API_URL + "check", {
      params: {
        doctor_id: store.state.auth.user.id,
        user_id: id,
      },
    });
    return response.data.Signal;
  }
  async updateUserSignalNb(user_id) {
    return axios.put(API_URL + "updateSignal", {
      user_id: user_id,
    });
  }
  async orderPatientBySignal() {
    const response = await axios.get(API_URL + "patientOrderBySignal", {});
    return response.data.ordredList;
  }
}
export default new RatingService();
