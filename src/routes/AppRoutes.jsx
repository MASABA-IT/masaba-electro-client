import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";

import ProductDetails from "../pages/ProductDetails/ProductDetails";
import AllCartPage from "../pages/AllCartPage/AllCartPage";
import AllCategories from "../pages/AllCateGories/AllCateGories";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "../components/PrivateRoute";
import Dashboard from "../pages/Dashboard/Dashboard";
import WishlistProducts from "../pages/WishlistProducts/WishlistProducts";
import GuestCheckoutPage from "../pages/GuestCheckoutPage/GuestCheckoutPage";
import UserCheckoutPage from "../pages/UserCheckoutPage/UserCheckoutPage";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import AboutUs from "../pages/AboutUs/AboutUs";

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/categories",
          element: <AllCategories />,
        },
        {
          path: "/categories/:id",
          element: <AllCategories />,
        },
        {
          path: "/categories/product/:id",
          element: <ProductDetails />,
        },
        {
          path: "/cart",
          element: <AllCartPage />,
        },
        {
          path: "/wishlist",
          element: <WishlistProducts />,
        },
        {
          path: "/about",
          element: <AboutUs />,
        },
        {
          path: "/login",
          element: <Login />,
        },

        {
          path: "/signup",
          element: <SignUp />,
        },
        {
          path: "/password-reset",
          element: <ForgotPassword />,
        },
        {
          path: "/guest-checkout",
          element: <GuestCheckoutPage />,
        },
        {
          path: "/user-checkout",
          element: (
            <PrivateRoute>
              <UserCheckoutPage />
            </PrivateRoute>
          ),
        },
        {
          path: "/dashboard",
          element: (
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          ),
        },
        {
          path: "/dashboard/:orders/:index",
          element: (
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          ),
        },
        {
          path: "/dashboard/:profile/:index",
          element: (
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          ),
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRoutes;
