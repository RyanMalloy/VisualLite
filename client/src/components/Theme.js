import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Change this to your primary color
    },
    secondary: {
      main: "#dc004e", // Change this to your secondary color
    },
    // Add more customization here
  },
  typography: {
    fontFamily: "Poppins",
  },
  
  modal: {
    width: {
      xs: "90%", 
      sm: "75%", 
      md: "50%", 
      lg: "40%", 
      xl: "30%", 
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
            textTransform: "none",
            fontFamily: "Poppins",
            fontWeight: 400
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: "Poppins",
          fontWeight: 400,
          
        },
      },
    },
  },
});

const Theme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
