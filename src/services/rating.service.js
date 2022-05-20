import axios from "axios";
import store from "../store";
const API_URL = "http://localhost:3000/api/rating/";
class RatingService {
  async addnewRating(event) {
    return axios.post(API_URL + "newRating", {
      score: event.score,
      doctor_id: event.doctor_id,
      user_id: store.state.auth.user.id,
    });
  }
  async getDoctorAllRating(event) {
    const response = await axios.get(API_URL + "doctorgetAll", {
      params: {
        doctor_id: event.doctor_id,
      },
    });
    return response.data.allevents;
  }
}
export default new RatingService();
