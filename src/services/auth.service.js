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
  // register(user) {
  //   return axios.post(API_URL + 'signup', {
  //     firstname: user.firstname,
  //     lastname: user.lastname,
  //     email: user.email,
  //     password: user.password,
  //     // roles:["doctor"]
  //     roles:[user.roles],
  //     gender:user.gender,
  //     phone_number:user.phone_number,
  //     adresse:user.adresse

  //   });
  // }
  registerPatient(user) {
    return axios.post(API_URL + 'signuppatient', {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      gender:user.gender,
      phone_number:user.phone_number,
      adresse:user.adresse

    });
  }
  registerDoctor(user) {
    return axios.post(API_URL + 'signupdoctor', {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      gender:user.gender,
      phone_number:user.phone_number,
      adresse:user.adresse,
      specialité:user.specialité

    });
  }
  registerAdmin(user) {
    return axios.post(API_URL + 'signupadmin', {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      gender:user.gender,
      phone_number:user.phone_number,
      adresse:user.adresse,
      specialité:user.specialité

    });
  }
}
export default new AuthService();