import React from "react";
import { RouteObject, Outlet, Navigate } from "react-router-dom";

import path from "./path";
import Home from "../pages/Home";
import LoginPage from "../pages/Login";
import SignUpPage from "../pages/SignUp";
import withCredencial from "../components/withCredencial";
import CasePage from "../pages/CaseExample";
import Layout from "../components/Layout";
import { caseExample } from "../pages/CaseExample/case-example";

const AuthedAppLayout = withCredencial(Layout);

const routes: RouteObject[] = [
  {
    path: path.root,
    element: (
      <AuthedAppLayout>
        <Outlet />
      </AuthedAppLayout>
    ),
    children: [
      {
        path: path.root,
        element: <Home />,
      },
      {
        path: "/case-example",
        element: <CasePage list={caseExample} />,
      },
    ],
  },
  {
    path: path.login,
    element: <LoginPage />,
  },
  {
    path: path.signup,
    element: <SignUpPage />,
  },
  {
    path: "*",
    element: <Navigate to={path.root} />,
  },
];

export { routes };
