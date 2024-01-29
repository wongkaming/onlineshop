import axios from "axios";
const API_URL = "http://localhost:4040/latest";

class AuthService {
  login(email, password) {
    return axios.post(API_URL + "/user/login", { email, password });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(username, email, password, role) {
    return axios.post(API_URL + "/user/register", {
      username,
      email,
      password,
      role,
    });
  }

  googleLogin() {
    return axios.post(API_URL + "/profile");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
