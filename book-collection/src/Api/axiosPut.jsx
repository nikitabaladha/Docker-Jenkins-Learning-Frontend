import axiosInstance from "./axiosConfig.jsx";

async function putAPI(url, payload, headers = {}, isPrivate = true) {
  try {
    let accessToken;
    if (isPrivate) {
      accessToken = JSON.parse(localStorage.getItem("accessToken"));
    }

    const response = await axiosInstance.put(url, payload, {
      headers: {
        ...headers,
        access_token: accessToken,
        "Content-Type": "multipart/form-data",
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
    console.error("Error during Api request:", error);

    throw error;
  }
}

export default putAPI;
