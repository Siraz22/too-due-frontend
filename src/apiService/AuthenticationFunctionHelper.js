//OBSOLETE ATTEMPT

// import React, { createContext, useReducer } from 'react'

// export const AUTHENTICATION_ACTIONS = {
//   LOGIN: 'login',
//   LOGOUT: 'logout'
// }

// export const AuthenticationContext = createContext()

// function AuthenticationFunctionHelper() {

//   const [authenticationState, authenticationDispatch] = useReducer(authenticationReducer, { isLoggedIn: false })

//   function authenticationReducer(authenticationState, action) {
//     switch (action.type) {
//       case AUTHENTICATION_ACTIONS.LOGIN: return authenticationState.isLoggedIn = true;
//       case AUTHENTICATION_ACTIONS.LOGOUT: return authenticationState.isLoggedIn = false;
//     }
//   }

// }

// export default AuthenticationFunctionHelper