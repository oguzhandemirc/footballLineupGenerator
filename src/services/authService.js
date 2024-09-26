// src/services/authService.js
import axios from "axios";

const API_URL = "http://localhost:5005/api/auth/";

class AuthService {
  register(username, password) {
    return axios.post(API_URL + "register", { username, password });
  }

  login(username, password) {
    return axios
      .post(API_URL + "login", { username, password })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("token");
  }

  getCurrentUser() {
    return localStorage.getItem("token");
  }
}

export default new AuthService();
