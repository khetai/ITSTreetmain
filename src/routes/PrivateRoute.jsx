import { Navigate, Outlet } from "react-router-dom";
import React, { useContext } from "react";
import { MainContext } from "../contexts/mainContextProvider";
import MainLayout from "../layouts/MainLayout/MainLayout";

function PrivateRoute() {
  const { user, role } = useContext(MainContext);

  let auth = { token: user };
  return auth.token ? <MainLayout /> : <Navigate to="/login" />;
}

export default PrivateRoute;
