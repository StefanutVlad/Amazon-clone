import axios from "axios";

const instance = axios.create({
  //THE API (Cloud function) URL
  baseURL: "http://localhost:5001/clone-project-f8143/us-central1/api",
});

export default instance;
