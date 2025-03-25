import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import MoviesPage from "./pages/MoviesPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import CustomPage from "./pages/CustomPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/list" element={<MoviesPage />} />
        <Route path="/custom" element={<CustomPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <App />
      <Footer />
    </BrowserRouter>
  </StrictMode>
);
