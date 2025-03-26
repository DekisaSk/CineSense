import React, { createContext, useContext, useMemo, useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import darkTheme from "../../styles/themes/darkTheme";
import lightTheme from "../../styles/themes/lightTheme";

const ThemeToggleContext = createContext();

export const useThemeToggle = () => useContext(ThemeToggleContext);

export function CustomThemeProvider({ children }) {
  // ⬇ Load theme from localStorage or fallback to 'dark'
  const [mode, setMode] = useState(() => {
    const storedMode = localStorage.getItem("themeMode");
    return storedMode === "light" ? "light" : "dark";
  });

  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light";
      localStorage.setItem("themeMode", newMode);
      return newMode;
    });
  };

  const theme = useMemo(
    () => (mode === "light" ? lightTheme : darkTheme),
    [mode]
  );

  return (
    <ThemeToggleContext.Provider value={{ toggleTheme, mode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeToggleContext.Provider>
  );
}
