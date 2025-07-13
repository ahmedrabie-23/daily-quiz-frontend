import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const theme = createTheme();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);