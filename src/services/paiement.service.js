import axios from "axios";
import store from "../store";
const API_URL = "http://localhost:3000/api/paiement/";
class PaiementService {
  async addnewPaiement(ev) {
    return axios.post(API_URL + "addPaiement", {
      amount: ev.amount,
      doctor_id: ev.doctor_id,
      user_id: store.state.auth.user.id,
    });
  }
  async getPaiementDetails(ev) {
    const paiement_id = ev;
    const response = await axios.get(
      API_URL + "getDetailPaiement/" + paiement_id,
      {}
    );
    return response.data.allevents;
  }
  async getPaiementbyPaymentId(ev) {
    const payment_id = ev;
    const response = await axios.get(
      API_URL + "getPaiementbyPaymentId/" + payment_id,
      {}
    );
    return response.data;
  }
  async updateByPaiementId(event) {
    return axios.put(API_URL + "updatePaiementByPaiementId", {
      paiement_id: event.paiement_id,
      status: event.status,
    });
  }
}
export default new PaiementService();
