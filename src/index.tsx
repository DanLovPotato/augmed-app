import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, useLocation, useRoutes } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";
import { routes } from "./routes";

import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

function App() {
  return useRoutes(routes);
}

function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
