import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import AllCateGories from "../pages/AllCateGories/AllCateGories";
import ProductDetails from "../pages/ProductDetails/ProductDetails";

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
          element: <AllCateGories />,
        },
        {
          path: "/categories/product/:id",
          element: <ProductDetails />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRoutes;
