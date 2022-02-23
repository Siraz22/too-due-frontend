import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Footer from './components/Footer';
import TaskList from './components/TaskList';
import { createContext, useReducer } from 'react';
import { Button } from 'reactstrap';
import APIaxios from './apiService/APIaxios';

export const GENERIC_TASK_ACTIONS = {
  POST: 'add',
  DELETE: 'delete',
  PUT: 'update',
  //get will get called by useEffect when that specific taskList is to be rendered
  //eg -> GenericTask -> UseEffect -> axios async() -> GET Api -> return to contextState
  GET: 'get'
}

export const GenericTaskContext = createContext();

function App() {

  const [genericTaskState, genericTaskDispatch] = useReducer(genericTaskReducer, [])

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

  function showLogs() {
    console.log(genericTaskState);
  }

  return (
    <div className="App">
      <GenericTaskContext.Provider
        value={{ genericTaskState: genericTaskState, genericTaskDispatch: genericTaskDispatch }}
      >

        <Header />
        <div className="container">
          <TaskList></TaskList>
        </div>
        <Button onClick={showLogs} >Show Logs</Button>
        <Footer />
      </GenericTaskContext.Provider>
    </div>
  );
}

export default App;
