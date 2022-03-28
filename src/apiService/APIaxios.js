import axios from "axios";
import { Component } from "react/cjs/react.production.min";

const api = axios.create({
  baseURL: "https://too-due-backend.herokuapp.com/react-api"
})

class APIaxios extends Component {

  getGenericTasks = async () => {
    //NOTE LEARNING : response.data is an array of objects.
    //But as soon as this async function ends, the contents are lost and response as well as
    //response.data gets set to Promise datatype instead.

    //states have to be set within async functions as of right now till i learn more
    //by trial and error
    return await api.get("/genericTask/getTasks");
  }
  addGenericTask = async (genericTaskEntry) => {
    return await api.post("/genericTask/addTask", genericTaskEntry);
  }
  deleteGenericTask = async (genericTaskId) => {
    return await api.delete(`/genericTask/deleteTask/${genericTaskId}`);
  }
  updateGenericTask = async (genericTaskId, genericTaskEntry) => {
    return await api.put(`/genericTask/updateTask/${genericTaskId}`, genericTaskEntry)
  }


  getInterviewbitTasks = async () => {
    return await api.get("/interviewbitTask/getTasks");
  }
  addInterviewbitTask = async (interviewbitTask) => {
    return await api.post("/interviewbitTask/addTask", interviewbitTask);
  }
  deleteInterviewbitTask = async (interviewbitId) => {
    return await api.delete(`/interviewbitTask/deleteTask/${interviewbitId}`);
  }
  updateInterviewbitTask = async (interviewbitId, interviewbitTaskEntry) => {
    //console.log(interviewbitTaskEntry);
    return await api.put(`/interviewbitTask/updateTask/${interviewbitId}`, interviewbitTaskEntry);
  }
}

export default new APIaxios();