import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FFD700",
    },
    secondary: {
      main: "#0C0C0C",
    },
    background: {
      default: "#000000",
      paper: "#0C0C0C",
    },
    text: {
      primary: "#FFFFF0",
      secondary: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

export default darkTheme;
