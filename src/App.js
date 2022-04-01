import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Footer from './components/Footer';
import TaskList from './components/TaskList';
import React, { createContext, useReducer, useState } from 'react';
import LoginPage from './components/LoginPage';
import { BrowserRouter } from 'react-router-dom';
import AuthenticationService from './apiService/AuthenticationService';
import { Button } from 'react-bootstrap';

export const GENERIC_TASK_ACTIONS = {
  POST: 'add',
  DELETE: 'delete',
  PUT: 'update',
  //get will get called by useEffect when that specific taskList is to be rendered
  //eg -> GenericTask -> UseEffect -> axios async() -> GET Api -> return to contextState
  GET: 'get'
}

export const INTERVIEWBIT_TASK_ACTIONS = {
  POST: 'add',
  DELETE: 'delete',
  PUT: 'put',
  GET: 'get'
}

export const AUTHENTICATION_ACTIONS = {
  LOGIN: 'login',
  LOGOUT: 'logout'
}

export const AuthenticationContext = createContext();
export const GenericTaskContext = createContext();
export const InterviewbitTaskContext = createContext();

function App() {

  console.log("App")

  const [genericTaskState, genericTaskDispatch] = useReducer(genericTaskReducer, [])
  const [interviewbitTaskState, interviewbitTaskDispatch] = useReducer(interviewbitTaskReducer, [])
  const [authenticationState, authenticationDispatch] = useReducer(authenticationReducer, { isLoggedIn: false })

  function deleteGenericTask(taskStatePassed, id) {
    const newGenericTasks = taskStatePassed.filter((task) => {
      return task.id !== id
    })
    return newGenericTasks
  }

  function updateGenericTask(taskStatePassed, payloadPassed) {
    return taskStatePassed.map((task) => {
      return task.id === payloadPassed.id ? payloadPassed : task
    })
  }

  function genericTaskReducer(taskState, action) {
    switch (action.type) {
      case GENERIC_TASK_ACTIONS.POST: return [...taskState, action.payload];
      case GENERIC_TASK_ACTIONS.DELETE: return deleteGenericTask(taskState, action.payload);
      case GENERIC_TASK_ACTIONS.PUT: return updateGenericTask(taskState, action.payload);
      case GENERIC_TASK_ACTIONS.GET: return action.payload;
    }
  }

  function deleteInterviewbitTask(taskStatePassed, id) {
    const newInterviewbitTasks = taskStatePassed.filter((task) => {
      return task.id !== id
    })
    return newInterviewbitTasks
  }

  function updateInterviewbitTask(taskStatePassed, payloadPassed) {
    // console.log("Putting");
    // console.log(payloadPassed);
    return taskStatePassed.map((task) => {
      return task.id === payloadPassed.id ? payloadPassed : task
    })
  }

  function interviewbitTaskReducer(taskState, action) {
    switch (action.type) {
      case INTERVIEWBIT_TASK_ACTIONS.POST: return [...taskState, action.payload];
      case INTERVIEWBIT_TASK_ACTIONS.DELETE: return deleteInterviewbitTask(taskState, action.payload);
      case INTERVIEWBIT_TASK_ACTIONS.PUT: return updateInterviewbitTask(taskState, action.payload);
      case INTERVIEWBIT_TASK_ACTIONS.GET: return action.payload;
    }
  }

  function authenticationReducer(authenticationState, action) {
    console.log('authentication reducer executed')
    switch (action.type) {
      case AUTHENTICATION_ACTIONS.LOGIN: return { isLoggedIn: true }
      case AUTHENTICATION_ACTIONS.LOGOUT: return { isLoggedIn: false }
    }
  }

  function showLogs() {
    //console.log(genericTaskState);
    // console.log(interviewbitTaskState);
    console.log(authenticationState)
  }

  function loginAtStartUp() {
    return (
      <React.Fragment>
        <LoginPage />
      </React.Fragment>
    )
  }

  return (
    <BrowserRouter>
      <div className="App">

        <GenericTaskContext.Provider
          value={{ genericTaskState: genericTaskState, genericTaskDispatch: genericTaskDispatch }}
        >
          <InterviewbitTaskContext.Provider
            value={{ interviewbitTaskState: interviewbitTaskState, interviewbitTaskDispatch: interviewbitTaskDispatch }}
          >
            <AuthenticationContext.Provider
              value={{ authenticationState: authenticationState, authenticationDispatch: authenticationDispatch }}
            >


              <Header />
              {/* {!AuthenticationService.isLoggedIn() && loginAtStartUp()} */}
              <div className="container">
                <TaskList></TaskList>
              </div>
              <Button onClick={showLogs} >Show Logs</Button>
              <Footer />




            </AuthenticationContext.Provider>
          </InterviewbitTaskContext.Provider>
        </GenericTaskContext.Provider>


      </div >
    </BrowserRouter>
  );
}

export default App;

