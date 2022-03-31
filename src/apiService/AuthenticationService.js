import axios from "axios";

import React, { Component } from 'react'

export class AuthenticationService extends Component {

  successfulLogin() {
    sessionStorage.setItem("authenticatedUser", "siraz")
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