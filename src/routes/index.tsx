import React from "react";
import { Navigate, Outlet, RouteObject } from "react-router-dom";

import path from "./path";
import Home from "../pages/Home";
import LoginPage from "../pages/Login";
import SignUpPage from "../pages/SignUp";
import withCredencial from "../components/withCredencial";
import CasePage from "../pages/Case";
import Layout from "../components/Layout";
import AnswerPage from "../pages/Answer";
import ResetPassword from "../pages/ResetPassword";

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
        path: path.answer,
        element: <AnswerPage />,
      },
      {
        path: path.case,
        element: <CasePage />,
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
    path: path.resetPassword,
    element: <ResetPassword />,
  },
  {
    path: "*",
    element: <Navigate to={path.root} />,
  },
];

export { routes };
