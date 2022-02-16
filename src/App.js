import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Footer from './components/Footer';
import TaskList from './components/TaskList';
import tempData from './components/temp_axiosJSON';
import { createContext, useContext, useReducer } from 'react';

const GENERIC_TASK_ACTIONS = {
  POST: 'add',
  DELETE: 'delete',
  PUT: 'update'
  //NO NEED FOR GET IN HERE, as it is a global state and is always updated as of now
}

export const GenericTaskContext = createContext();

function App() {

  const [genericTaskState, genericTaskDispatch] = useReducer(genericTaskReducer, tempData)

  function genericTaskReducer(taskState, action) {
    switch (action.type) {
      case GENERIC_TASK_ACTIONS.POST: return [...genericTaskState, ...taskState]
      case GENERIC_TASK_ACTIONS.GET: return genericTaskState;
    }
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
        <Footer />
      </GenericTaskContext.Provider>
    </div>
  );
}

export default App;
