import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { themeLight, themeDark } from "./theme.js";

//theme
import { ThemeProvider } from "@emotion/react";
console.log(process.env); // remove this after you've confirmed it is working

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={themeLight}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
