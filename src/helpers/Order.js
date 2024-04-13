import { getCookie } from "./cookie";

const apiCall = async (endpoint, method, data) => {
  const token = getCookie("token");
  try {
    const formData = new FormData();
    console.log(data);
    const info = data
      ? {
          method: method,
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
                accept: " */*",
                "Content-Type": "application/json",
              }
            : {}, // Only add the Authorization header if token exists
          body: data,
        }
      : {
          method: method,
          headers: token ? { Authorization: `Bearer ${token}` } : {}, // Only add the Authorization header if token exists
        };
    console.log(info);
    const response = await fetch(`https://api.it-street.az${endpoint}`, info);
    console.log(response);
    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(
        `API call failed with status: ${
          response.status
        }, body: ${JSON.stringify(errorBody)}`
      );
    }
    return response;
  } catch (error) {
    console.error("API call error:", error);
    throw error;
  }
};

export default apiCall;
