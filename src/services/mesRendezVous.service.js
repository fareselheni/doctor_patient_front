import axios from "axios";
import store from "../store";
const API_URL = "http://localhost:3000/api/pre_app/";
class TimedispoService {
  async Patientallrdvs() {
    const response = await axios.get(API_URL + "user/getall", {
      params: {
        _id: store.state.auth.user.id,
      },
    });
    return response.data.allpreApp;
  }
  async Doctorallrdvs() {
    const response = await axios.get(API_URL + "doctor/getall", {
      params: {
        _id: store.state.auth.user.id,
      },
    });
    return response.data.allpreApp;
  }
}
export default new TimedispoService();
