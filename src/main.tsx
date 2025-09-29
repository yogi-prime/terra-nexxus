import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AuthProvider } from "@/context/AuthContext";
import "./index.css";
import 'leaflet/dist/leaflet.css';


createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
