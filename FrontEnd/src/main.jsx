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
import { RoleProvider } from "./contexts/RoleContext.jsx";
import ReactGA from "react-ga4";
import AnalyticsTracker from "./utils/AnalyticsTracker.jsx";

ReactGA.initialize("G-DFWNC57GYW");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CustomThemeProvider>
      <CssBaseline />
      <RoleProvider>
        <BrowserRouter>
          <Header />
          <AnalyticsTracker />
          <MainRoutes />
          <App />
          <Footer />
        </BrowserRouter>
      </RoleProvider>
    </CustomThemeProvider>
  </StrictMode>
);
