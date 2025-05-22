// postAPI.js

import axiosInstance from "./axiosConfig.jsx";

async function postAPI(url, payload, options = {}, isPrivate = true) {
  try {
    if (options && !options.headers) options.headers = {};

    if (isPrivate) {
      options.headers.access_token = JSON.parse(
        localStorage.getItem("accessToken")
      );
    }

    const response = await axiosInstance.post(url, payload, options);

    if ((response.status = 200)) {
      return {
        message: response.data.message,
        hasError: response.data.hasError,
        data: response.data,
      };
    }
  } catch (error) {
    console.error("Error during Api request:", error);

    throw error;
  }
}

export const isAuthenticated = () => {
  const userInfo = localStorage.getItem("userInfo");
  return userInfo !== null;
};

export const handleUnauthorized = (navigate) => {
  navigate("/login");
};

export default postAPI;
