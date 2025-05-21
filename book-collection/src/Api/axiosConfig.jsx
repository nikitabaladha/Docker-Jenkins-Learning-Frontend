// src/api/axiosConfig.js

import Axios from "axios";

const baseURL = import.meta.env.REACT_APP_API_URL;

const axiosInstance = Axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
