import axios from "axios";
const API_URL = "http://localhost:4040/latest";

class AuthService {
  login(email, password) {
    return axios.post(API_URL + "/user/login", { email, password });
  }
  logout() {
    return axios.post(API_URL + "/user/logout")
  }
  register(username, email, password, role) {
    return axios.post(API_URL + "/user/register", {
      username,
      email,
      password,
      role,
    });
  }

  googleLoginSuccess() {
    return axios.get(API_URL + "/profile/data", {
      withCredentials: true
    })
    .then(response => {
      if (response.data !== "fail") {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
