import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RequireAuth from "./components/Layout/RequireAuth";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Orders from "./pages/Orders/Orders";
import Menu from "./pages/Menu/Menu";
import Kitchen from "./pages/Kitchen/Kitchen";
import Customers from "./pages/Customers/Customers";
import Staff from "./pages/Staff/Staff";
import Analytics from "./pages/Analytics/Analytics";
import Settings from "./pages/Settings/Settings";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<RequireAuth />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/kitchen" element={<Kitchen />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
