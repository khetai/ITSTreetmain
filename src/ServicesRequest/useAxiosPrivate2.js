import { axiosPrivate } from "./axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { getCookie } from "../helpers/cookie";

const sendRequest = async (
  method,
  url,
  data = null,
  head = null,
  params = {}
) => {
  console.log("send", method);
  console.log(url);
  console.log(data);

  try {
    const response = await axiosPrivate({
      method,
      url,
      data: data,
      headers: { "Content-Type": head ? `${head}` : "application/json" },
    });
    console.log(response);
    if (method === "GET") {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

const useAxiosPrivate2 = () => {
  const refresh = useRefreshToken();
  const token = getCookie("token");

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      config => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      response => response,
      async error => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          try {
            const newAccessToken = await refresh();
            prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return sendRequest(
              prevRequest.method,
              prevRequest.url,
              prevRequest.data,
              prevRequest.params
            );
          } catch (refreshError) {
            console.log(refreshError);
            return Promise.reject(refreshError.data.result.Accestoken);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [refresh, token]);

  return {
    sendRequest,
  };
};

export default useAxiosPrivate2;
