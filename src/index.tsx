import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";

import reportWebVitals from "./reportWebVitals";
import { routes } from "./routes";
import theme from "./utils/theme/mui";

import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

function App() {
  return useRoutes(routes);
}

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
