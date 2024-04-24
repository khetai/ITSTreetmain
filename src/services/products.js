import { get, postJSON } from "./request";

export const getProducts = headers =>
  get("Product/GetAllPaginated?page=1&count=10", headers);
export const getProductsById = (id, headers) => get("Product/" + id, headers);
export const postProducts = (data, headers) =>
  postJSON("Product", data, headers);
