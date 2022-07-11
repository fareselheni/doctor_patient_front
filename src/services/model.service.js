import axios from "axios";
const API_URL = "http://localhost:3000/api/model/";
class ModelService {
  async allusers() {
    const response = await axios.get(API_URL + "allusers", {});
    return response.data.allusers;
  }
  async alldoctors() {
    const response = await axios.get(API_URL + "alldoctors", {});
    return response.data.allusers;
  }
  async allpatients() {
    const response = await axios.get(API_URL + "allpatients", {});
    return response.data.allusers;
  }
  async alladmins() {
    const response = await axios.get(API_URL + "alladmins", {});
    return response.data.allusers;
  }
  async getDoctorById(_id) {
    const response = await axios.get(API_URL + "getDoctorById/" + _id, {});
    return response.data;
  }
  async allgouvernorats() {
    const response = await axios.get(API_URL + "allgouvernorats", {});
    return response.data.allgouvernorats;
  }
  async allspecialites() {
    const response = await axios.get(API_URL + "allspecialite", {});
    return response.data.allspecialites;
  }
}
export default new ModelService();
