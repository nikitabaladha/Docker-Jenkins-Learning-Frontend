// src/api/axiosConfig.js

import Axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;
console.log("Base URL is", baseURL);

const axiosInstance = Axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
