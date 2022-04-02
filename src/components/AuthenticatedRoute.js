import React from 'react'
import { Redirect } from 'react-router-dom'
import { Route } from 'react-router-dom'
import AuthenticationService from '../apiService/AuthenticationService'

function AuthenticatedRoute(props) {

  console.log("Called authenticated route")
  console.log(props)

  if (AuthenticationService.isLoggedIn()) {
    return (
      <React.Fragment>
        <Route {...props} />
      </React.Fragment>
    )
  }
  else {
    return (
      <Redirect to="/login" />
    )
  }

}

export default AuthenticatedRoute