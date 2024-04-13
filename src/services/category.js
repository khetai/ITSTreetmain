import { get, postJSON } from "./request";


export const getCategory = () => get("catalogue")
export const getCategoryById = (id) => get("catalogue/" + id)
export const postCategory = data => postJSON("catalogue", data)
