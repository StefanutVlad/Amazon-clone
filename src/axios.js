import axios from "axios";

const instance = axios.create({
  baseURL: "..." //THE API (Cloud function) URL
});

export default instance;
