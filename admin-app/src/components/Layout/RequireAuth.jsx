import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Layout from "./Layout";

function RequireAuth() {
  const { isAdmin, isAuthed } = useAuth();
  const location = useLocation();

  if (!isAuthed || !isAdmin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Layout />;
}

export default RequireAuth;
