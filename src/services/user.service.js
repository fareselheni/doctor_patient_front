import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:3000/api/test/';
class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }
  getDoctorBoard() {
    return axios.get(API_URL + 'doctor', { headers: authHeader() });
  }
  getPatientBoard() {
    return axios.get(API_URL + 'patient', { headers: authHeader() });
  }
  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}
export default new UserService();