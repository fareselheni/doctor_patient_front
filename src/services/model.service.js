import axios from "axios";
const API_URL = "http://localhost:3000/api/model/";
class ModelService {
  async allusers() {
    const response = await axios.get(API_URL + "allusers", {});
    return response.data.allusers;
  }
  async allgouvernorats() {
    const response = await axios.get(API_URL + "allgouvernorats", {});
    return response.data.allgouvernorats;
  }
  async allspecialites() {
    const response = await axios.get(API_URL + "allspecialites", {});
    return response.data.allspecialites;
  }
}
export default new ModelService();
