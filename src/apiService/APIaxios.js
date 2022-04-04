import axios from "axios";
import { Component } from "react/cjs/react.production.min";
import AuthenticationService from "./AuthenticationService";

// const api = axios.create({
//   //baseURL: "https://too-due-backend.herokuapp.com/react-api"
//   baseURL: "http://localhost:8080/react-api"
// })

//export const baseURL = "http://localhost:8080/react-api"
export const baseURL = "https://too-due-backend.herokuapp.com"

class APIaxios extends Component {

  setupAxiosInterceptorResponse() {

    console.log("Setting up authnetication interceptor")

    axios.interceptors.response.use(
      (config) => {
        if (AuthenticationService.isLoggedIn()) {
          config.headers.authorization = sessionStorage.getItem("authenticationHeader")
          console.log("using interceptor")
          console.log(config)
        }
        return config
      }
    )
  }

  setupAxiosInterceptorRequest() {

    console.log("Setting up authnetication interceptor")

    axios.interceptors.request.use(
      (config) => {
        if (AuthenticationService.isLoggedIn()) {
          config.headers.authorization = sessionStorage.getItem("authenticationHeader")
        }
        return config
      }
    )
  }

  getGenericTasks = async () => {
    //NOTE LEARNING : response.data is an array of objects.
    //But as soon as this async function ends, the contents are lost and response as well as
    //response.data gets set to Promise datatype instead.

    //states have to be set within async functions as of right now till i learn more
    //by trial and error
    console.log("Get task async")
    return await axios.get(baseURL + "/react-api/genericTask/getTasks");
  }
  addGenericTask = async (genericTaskEntry) => {
    return await axios.post(baseURL + "/react-api/genericTask/addTask", genericTaskEntry);
  }

  deleteGenericTask = async (genericTaskId) => {
    return await axios.delete(`${baseURL}/react-api/genericTask/deleteTask/${genericTaskId}`);
  }
  updateGenericTask = async (genericTaskId, genericTaskEntry) => {
    return await axios.put(`${baseURL}/react-api/genericTask/updateTask/${genericTaskId}`, genericTaskEntry,
      {
        headers: {
          authorization: 'Basic ' + window.btoa('siraz' + ":" + 'password123')
        }
      }
    )
  }


  getInterviewbitTasks = async () => {
    return await axios.get(`${baseURL}/react-api/interviewbitTask/getTasks`);
  }
  addInterviewbitTask = async (interviewbitTask) => {
    return await axios.post(`${baseURL}/react-api/interviewbitTask/addTask`, interviewbitTask);
  }
  deleteInterviewbitTask = async (interviewbitId) => {
    return await axios.delete(`${baseURL}/react-api/interviewbitTask/deleteTask/${interviewbitId}`);
  }
  updateInterviewbitTask = async (interviewbitId, interviewbitTaskEntry) => {
    return await axios.put(`${baseURL}/react-api/interviewbitTask/updateTask/${interviewbitId}`, interviewbitTaskEntry);
  }
}

export default new APIaxios();