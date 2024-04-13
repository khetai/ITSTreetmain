import { getCookie } from "./cookie";

const apiCall = async (endpoint, method, data) => {
  const token = getCookie("token");
  console.log(token);
  console.log(endpoint);
  console.log(parseInt(data.ProductId));
  console.log(data);
  try {
    const formData = new FormData();

    data && formData.append("ProductId", parseInt(data.ProductId));
    data && formData.append("Rating", data.Rating);
    data && formData.append("Comment", data.Comment);
    const info = data
      ? {
          method: method,
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
                // "Content-Type": "multipart/form-data",
              }
            : {}, // Only add the Authorization header if token exists
          body: formData,
        }
      : {
          method: method,
          headers: token ? { Authorization: `Bearer ${token}` } : {}, // Only add the Authorization header if token exists
        };

    const response = await fetch(`https://api.it-street.az${endpoint}`, info);
    console.log(response);
    if (!response.ok) {
      // Attempt to read the response body even in case of an HTTP error
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
