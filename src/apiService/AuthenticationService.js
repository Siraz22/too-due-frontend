import axios from "axios";

import { Component } from 'react'

export class AuthenticationService extends Component {

  basicAuthentication(username, password) {
    return axios.get("http://localhost:8080/auth-api",
      {
        headers: {
          authorization: 'Basic ' + window.btoa(username + ":" + password)
        }
      }
    )
  }

  successfulLogin(username) {
    sessionStorage.setItem("authenticatedUser", username)
  }

  logout() {
    sessionStorage.removeItem("authenticatedUser")
  }

  isLoggedIn() {
    let username = sessionStorage.getItem("authenticatedUser");
    if (username != null) return true
    else return false
  }

  getUsername() {
    let username = ''
    if (this.isLoggedIn()) {
      return sessionStorage.getItem('authenticatedUser');
    }
    else {
      return 'Guest'
    }
  }
}

export default new AuthenticationService();