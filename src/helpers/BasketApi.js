import { getCookie } from "./cookie";
import usePrivate from "../ServicesRequest/useAxiosPrivate2";
const apiCall = async (endpoint, method, data, head = null) => {
  const { sendRequest } = usePrivate();
  console.log("apicallm", endpoint);
  console.log(endpoint);
  console.log(data);
  const token = getCookie("token");
  try {
    const formData = new FormData();

    data && formData.append("ProdcutId", data.ProductId);
    data && formData.append("Quantity", data.Quantity);

    const response = await sendRequest(
      method,
      endpoint,
      formData ?? null,
      head ? head : null
    );
    // const response = await fetch(
    //   `https://apistreet.kursline.az${endpoint}`,
    //   info
    // );
    if (!response.ok) {
      // Attempt to read the response body even in case of an HTTP error
      const errorBody = await response.json();
      throw new Error(
        `API call failed with status: ${
          response.status
        }, body: ${JSON.stringify(errorBody)}`
      );
    }
    console.log(response);
    return response;
  } catch (error) {
    console.error("API call error:", error);
    throw error;
  }
};

export default apiCall;
