import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Default MUI blue
    },
    secondary: {
      main: "#dc004e", // Default MUI red
    },
    background: {
      default: "#f5f5f5", // Light gray
    },
  },
  typography: {
    fontFamily: "PT Sans, Arial, sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    body1: {
      fontSize: "1rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;
