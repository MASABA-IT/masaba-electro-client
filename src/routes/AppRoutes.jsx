import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";

import ProductDetails from "../pages/ProductDetails/ProductDetails";
import AllCartPage from "../pages/AllCartPage/AllCartPage";
import AllCategories from "../pages/AllCateGories/AllCateGories";

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
          path: "/categories/product/:category/:condition/:id",
          element: <ProductDetails />,
        },
        {
          path: "/cart",
          element: <AllCartPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRoutes;
