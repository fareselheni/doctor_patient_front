import axios from "axios";
// import store from "../store";
const API_URL = "http://localhost:3000/api/blacklist/";
class RatingService {
  async addtoBlacklist(event1, event2) {
    console.log("event1", event1);
    return axios.post(API_URL + "add", {
      user_id: event1,
      phone_number: event2,
    });
  }
  async getBlacklist() {
    const response = await axios.get(API_URL + "getAll", {});
    return response.data.allBlacklist;
  }
}
export default new RatingService();
