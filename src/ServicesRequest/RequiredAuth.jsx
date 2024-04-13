import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
const RequiredAuth = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const location = useLocation();
  if (isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};
export default RequiredAuth;
