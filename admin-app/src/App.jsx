import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: { background: "#fffdf8", color: "#1a2544", border: "1px solid rgba(201,149,14,0.25)", borderRadius: "12px", boxShadow: "0 8px 30px rgba(26,37,68,0.12)" },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
