import axios from "axios";
const API_URL = "http://localhost:3000/api/searchdoctor/";
class SearchDoctorService {
  async alldoctors() {
    const response = await axios.get(API_URL + "all", {});
    return response.data.alldoctors;
  }
  async filtreDoctors(filtre) {
    const response = await axios.get(API_URL + "filtre", {
      params: {
        specialite: filtre.specialite,
        gouvernorat: filtre.gouvernorat,
      },
    });
    return response.data.alldoctors;
  }
}
export default new SearchDoctorService();
