import axios from "axios";
const API_URL = `${process.env.NEXT_PUBLIC_API}/latest`;

class AuthService {
  login(email, password) {
    return axios.post(API_URL + "/user/login", { email, password });
  }
  logout() {
    return axios.post(API_URL + "/user/logout");
  }
  register(username, email, password, role, confirmPassword) {
    return axios.post(API_URL + "/user/register", {
      username,
      email,
      password,
      role,
      confirmPassword,
    });
  }

  googleLoginSuccess() {
    return axios
      .get(API_URL + "/profile/data", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data !== "fail") {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  googleLogout() {
    return axios.get(API_URL + "/user/logout");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
  setLocalCart(item) {
    return localStorage.setItem("cart3", JSON.stringify(item));
  }

  getLocalCart() {
    return JSON.parse(localStorage.getItem("cart3"));
  }
}

export default new AuthService();
