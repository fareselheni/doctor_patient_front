import axios from "axios";
import store from "../store";
const API_URL = "http://localhost:3000/api/prescription/";
class PrescriptionService {
  async addnewPrescription(event) {
    return axios.post(API_URL + "newPrescription", {
      drugs: event.drugs,
      date: event.date,
      doctor_id: store.state.auth.user.id,
      user_id: event.user_id,
    });
  }
  async getPatientPrescriptions() {
    const response = await axios.get(API_URL + "patient/getall", {
      params: {
        _id: store.state.auth.user.id,
      },
    });
    return response.data.allevents;
  }
  async deleteevent(ev) {
    return axios.delete(API_URL + "delete/" + ev._id).then((response) => {
      console.log(response);
    });
  }
}
export default new PrescriptionService();
