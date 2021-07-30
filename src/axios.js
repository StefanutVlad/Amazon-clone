import axios from "axios";

const instance = axios.create({
  //THE API (Cloud function) URL - firebase blaze
  baseURL: "https://us-central1-clone-60a7f.cloudfunctions.net/api",

  //local host point: http://localhost:5001/clone-60a7f/us-central1/api
});
export default instance;
