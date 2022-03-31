import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Footer from './components/Footer';
import TaskList from './components/TaskList';
import React, { createContext, useReducer } from 'react';
import LoginPage from './components/LoginPage';
import { BrowserRouter } from 'react-router-dom';

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

export const GenericTaskContext = createContext();
export const InterviewbitTaskContext = createContext();

function App() {

  const [genericTaskState, genericTaskDispatch] = useReducer(genericTaskReducer, [])
  const [interviewbitTaskState, interviewbitTaskDispatch] = useReducer(interviewbitTaskReducer, [])

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

  function showLogs() {
    //console.log(genericTaskState);
    console.log(interviewbitTaskState);
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



            <Header />
            {loginAtStartUp()}
            <div className="container">
              <TaskList></TaskList>
            </div>
            {/* <Button onClick={showLogs} >Show Logs</Button> */}
            <Footer />


          </InterviewbitTaskContext.Provider>
        </GenericTaskContext.Provider>


      </div >
    </BrowserRouter>
  );
}

export default App;

