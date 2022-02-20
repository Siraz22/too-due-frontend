import axios from "axios";

const api = axios.create({
  baseURL: "https://too-due-backend.herokuapp.com/react-api"
})

class APIaxios {
  getGenericTasks = async () => {
    //NOTE LEARNING : response.data is an array of objects.
    //But as soon as this async function ends, the contents are lost and response as well as
    //response.data gets set to Promise datatype instead.

    //states have to be set within async functions as of right now till i learn more
    //by trial and error
    return await api.get("/genericTask/getTasks");
  }
}

export default new APIaxios();