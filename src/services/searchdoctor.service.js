import axios from "axios";
const API_URL = "http://localhost:3000/api/searchdoctor/";
class SearchDoctorService {
  async alldoctors() {
    const response = await axios.get(API_URL + "all", {});
    return response.data.alldoctors;
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
export default new SearchDoctorService();
