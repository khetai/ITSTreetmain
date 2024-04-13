import axios from "axios";
const BASE_URL = "https://api.it-street.az/api/";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json", accept: "*/*" },
  // withCredentials: true,
});
