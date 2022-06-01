import axios from "axios";
// import "datejs";
import store from "../store";
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
      typeRDV: event.typeRDV,
    });
  }
  async updateevent(event) {
    return axios.put(API_URL + "updateevent", {
      _id: event._id,
      start_date: event.start_date,
      end_date: event.end_date,
      text: event.text,
      status: event.status,
      // params: {
      //   _id: event._id,
      // },
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
  async getEventByLink(link) {
    const response = await axios.get(API_URL + "geteventByLink", {
      params: {
        link: link,
      },
    });
    return response.data.allevents;
  }
  async patientallConfirmedevents() {
    const response = await axios.get(API_URL + "patient/getall", {
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
export default new SchedulerService();
