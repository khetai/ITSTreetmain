import axios from "./axios";
import { getCookie } from "../helpers/cookie";
import { setCookie } from "../helpers/cookie";
const useRefreshToken = () => {
  const token = getCookie("refresh_token");
  const refresh = async () => {
    const response = await axios.post(`auth/get/refreshtoken/${token}`, {
      withCredentials: true,
    });
    //authslice de accesstokeni yenile ve locala vur refresh tokeni
    if (response.ok) {
      setCookie("token", response.data.token, response.data.expires);
      setCookie(
        "refresh_token",
        response.data.refreshToken,
        response.data.refreshTokenExpires
      );
      return response.data;
    } else {
      window.location.href = "/#/login";
    }
  };
  return refresh;
};

export default useRefreshToken;
