import React from "react";
import { Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import MainLayout from "./layouts/MainLayout";
import AccountView from "./views/account/AccountView";
import CustomerListView from "./views/customer/CustomerListView";
import DashboardView from "./views/reports/DashboardView";
import LoginView from "./views/auth/LoginView";
import NotFoundView from "./views/errors/NotFoundView";
import OrderListView from "./views/order/OrderListView";
import RegisterView from "./views/auth/RegisterView";

const routes = isLoggedIn => [
  {
    path: "/",
    element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/dashboard" />,
    children: [
      { path: "account", element: <AccountView /> },
      { path: "customers", element: <CustomerListView /> },
      { path: "dashboard", element: <DashboardView /> },
      { path: "orders", element: <OrderListView /> },
      { path: "*", element: <Navigate to="/404" /> }
    ]
  },
  {
    path: "/",
    element: !isLoggedIn ? <MainLayout /> : <Navigate to="/login" />,
    children: [
      { path: "login", element: <LoginView /> },
      { path: "register", element: <RegisterView /> },
      { path: "404", element: <NotFoundView /> },
      { path: "*", element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
