import axios from "axios";
const API_URL = "http://localhost:3000/api/scheduler/";
class SchedulerService {
  async addevent(event) {
    return axios.post(API_URL + "newevent", {
      id: event.id,
      start_date: event.start_date,
      end_date: event.end_date,
      text: event.text,
      user_id: event.user_id,
      doctor_id: event.doctor_id,
    });
  }
  // async updateevent(event) {
  //   return axios.put(API_URL + "updateevent", {
  //     _id: event._id,
  //     start_date: event.start_date,
  //     end_date: event.end_date,
  //     text: event.text,
  //   });
  // }
  async allevents() {
    const response = await axios.get(API_URL + "getall", {});
    return response.data.allevents;
  }
  async deleteevent(ev) {
    // return axios.delete(API_URL + "deleteevent", {});
    return axios
      .delete(API_URL + "deleteevent", {
        _id: ev._id,
      })
      .then((response) => {
        console.log(response);
      });
  }
}
export default new SchedulerService();
