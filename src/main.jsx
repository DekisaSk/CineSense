import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainRoutes from "./router/MainRoutes.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import { CustomThemeProvider } from "./components/Header/ThemeContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CustomThemeProvider>
      <CssBaseline />
      <BrowserRouter>
        <Header />
        <MainRoutes />
        <App />
        <Footer />
      </BrowserRouter>
    </CustomThemeProvider>
  </StrictMode>
);
