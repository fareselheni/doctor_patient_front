import axios from "axios";
import store from "../store";
const API_URL = "http://localhost:3000/api/";
class TimedispoService {
  async addtimedispo(event) {
    return axios.post(API_URL + "newtimedispo", {
      start_date: event.start_date,
      end_date: event.end_date,
      doctor_id: store.state.auth.user.id,
    });
  }
  async allevents() {
    const response = await axios.get(API_URL + "getall", {
      params: {
        _id: store.state.auth.user.id,
      },
    });
    return response.data.allevents;
  }
  async deleteevent(ev) {
    // return axios.delete(API_URL + "deleteevent", {});
    console.log("from service", ev);
    return axios
      .delete(API_URL + "deleteevent", {
        _id: ev._id,
      })
      .then((response) => {
        console.log(response);
      });
  }
}
export default new TimedispoService();
