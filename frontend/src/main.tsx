// entry point for the frontend vite app

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material"; // customize design aspects; parent of components
import { BrowserRouter } from "react-router-dom"; //wrapper for routing inside browsers to store current location
import { AuthProvider } from "./context/AuthContext.tsx";
import axios from "axios"; // backend to frontend communication/API calls/http requests
import { Toaster } from "react-hot-toast"; //

// http communication from frontend to backend using axios [using port from .env in backend]
axios.defaults.baseURL = "http://localhost:5050/api/v1";
axios.defaults.withCredentials = true; // to set and send cookies with request from backend

// customized theme from mui library, ThemeProvider from mui to wrap theme with
const theme = createTheme({
  typography: {
    fontFamily: "Roboto Slab, serif",
    allVariants: { color: "white" },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Toaster position="top-right" />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
