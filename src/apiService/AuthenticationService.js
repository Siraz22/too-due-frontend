import axios from "axios";

import { Component } from 'react'

export class AuthenticationService extends Component {

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
}

export default new AuthenticationService();