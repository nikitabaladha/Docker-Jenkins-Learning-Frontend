import axiosInstance from "./axiosConfig.jsx";

async function deleteAPI(url, headers = {}, isPrivate = true) {
  try {
    let accessToken;
    if (isPrivate) {
      accessToken = JSON.parse(localStorage.getItem("accessToken"));
    }

    const response = await axiosInstance.delete(url, {
      headers: {
        ...headers,
        access_token: accessToken,
      },
    });

    if (response.status === 200) {
      return {
        message: response.data.message,
        hasError: response.data.hasError,
        data: response.data,
      };
    }
  } catch (error) {
    console.error("Error during API request:", error);
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

export default deleteAPI;
