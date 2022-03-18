import axios from "axios";
const API_URL = "http://localhost:3000/api/scheduler/";
class SchedulerService {
  async addevent(event) {
    return axios.post(API_URL + "newevent", {
      start_date: event.start_date,
      end_date: event.end_date,
      text: event.text,
      user_id: event.user_id,
      doctor_id: event.doctor_id,
    });
  }
  async allevents() {
    const response = await axios.get(API_URL + "getall", {});
    return response.data.allevents;
  }
}
export default new SchedulerService();
