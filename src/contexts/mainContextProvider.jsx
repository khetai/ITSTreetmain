import { createContext, useEffect, useState } from "react";
import { getCookie, setCookie } from "../helpers/cookie";
import apiCall from "../helpers/BasketApi";
import { jwtDecode } from "jwt-decode";
import usePrivate from "../ServicesRequest/useAxiosPrivate2";
export const MainContext = createContext();
import { useSelector } from "react-redux";
export function MainContextProvider({ children }) {
  const { sendRequest } = usePrivate();
  const [user, setUser] = useState(getCookie("token") ? true : null);
  const [role, setRole] = useState();
  const [expire, setExpire] = useState(null);
  const [basket, setBasket] = useState([]);
  const [wishList, setWishList] = useState(
    JSON.parse(localStorage.getItem("wishList")) || []
  );
  useEffect(() => {
    if (wishList.length === 0) {
      localStorage.setItem("wishList", JSON.stringify([]));
    } else {
      localStorage.setItem("wishList", JSON.stringify(wishList));
    }
  }, [wishList]);

  useEffect(() => {
    const token = getCookie("token");
    const retrieveTokenData = async () => {
      if (token) {
        const decoded = jwtDecode(token);
        const user_name =
          decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
        setUser(user_name);

        const user_role =
          decoded[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ];
        const response = await sendRequest("GET", "/Basket", null);
        if (response.status === 200) {
          setBasket(response.data);
        } else {
          const localBasket = JSON.parse(localStorage.getItem("basket")) || [];
          setBasket(localBasket);
        }
        setRole(user_role);
        setExpire(decoded.exp);
      } else {
        const localBasket = JSON.parse(localStorage.getItem("basket")) || [];
        setBasket(localBasket);
      }
    };
    retrieveTokenData();
  }, [user]);

  useEffect(() => {
    const convertToUnixTimestamp = expire => {
      if (typeof expire === "number") {
        return expire; // If expire is already a Unix timestamp
      } else if (typeof expire === "string") {
        return Math.floor(new Date(expire).getTime() / 1000); // Convert ISO 8601 date string to Unix timestamp
      }
      return null;
    };

    const token = getCookie("token");
    const expireTimestamp = convertToUnixTimestamp(expire);

    if (expireTimestamp && token) {
      const now = Math.floor(Date.now() / 1000); // Current time in seconds
      const timeDifferenceInMilliseconds = (expireTimestamp - now) * 1000; // Convert to milliseconds

      const timeout = setTimeout(() => {
        requestNewToken();
      }, timeDifferenceInMilliseconds - 10000); // Request 10 seconds before expiry

      // Cleanup the timeout when component unmounts or expire changes
      return () => clearTimeout(timeout);
    }
  }, [expire]);

  const requestNewToken = async () => {
    const refreshToken = getCookie("refresh_token");
    try {
      const response = await fetch(
        `https://api.it-street.az/api/Auth/LoginWithRefreshToken?refreshToken=${refreshToken}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setCookie("token", data.token, data.expires);
      setCookie("refresh_token", data.refreshToken, data.refreshTokenExpires);
      setExpire(data.refreshTokenExpires);
    } catch (error) {
      console.error("Error refreshing token:", error.message);
    }
  };

  return (
    <MainContext.Provider
      value={{
        basket,
        setBasket,
        wishList,
        setWishList,
        user,
        setUser,
        role,
        setRole,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
