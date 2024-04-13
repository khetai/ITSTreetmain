import { get, postJSON } from "./request";


export const getProducts = (headers) => get("products",headers)
export const getProductsById = (id,headers) => get("products/" + id,headers)
export const postProducts = (data,headers) => postJSON("products", data,headers)
