import axios from "axios";

const axiosBase = axios.create({
  baseURL: "https://portfolio-project-production-fbf9.up.railway.app/api/",
});

export default axiosBase;
