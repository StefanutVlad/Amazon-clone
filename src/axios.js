import axios from "axios";

const instance = axios.create({
  //THE API (Cloud function) URL - firebase blaze
  baseURL: "https://us-central1-clone-project-f8143.cloudfunctions.net/api",

  //local host point: http://localhost:5001/clone-project-f8143/us-central1/api
});
i;
export default instance;
