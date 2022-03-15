import axios from "axios";
const API_URL = "http://localhost:3000/api/auth/";
class AuthService {
  login(user) {
    return axios
      .post(API_URL + "signin", {
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(user) {
    return axios.post(API_URL + "signup", {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      // roles:["doctor"]
      roles: [user.roles],
      gender: user.gender,
      phone_number: user.phone_number,
      adresse: user.adresse,
      specialite: user.specialite,
      gouvernorat: user.gouvernorat,
      numero_inscription_cnom: user.numero_inscription_cnom,
    });
  }
}
export default new AuthService();
