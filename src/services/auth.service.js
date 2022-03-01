import axios from 'axios';
const API_URL = 'http://localhost:3000/api/auth/';
class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'signin', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem('user');
  }
  register(user) {
    return axios.post(API_URL + 'signup', {
      firstname: user.firstname,
      email: user.email,
      password: user.password,
      // roles:["doctor"]
      roles:[user.roles],
      phone_number:user.phone_number

    });
  }
}
export default new AuthService();