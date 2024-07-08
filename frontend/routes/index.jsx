import { createBrowserRouter } from "react-router-dom";
import Home from "../src/pages/Home";
import AdminPage from "../src/pages/AdminPage";
import ProductPage from "../src/pages/ProductPage";
import ProductDetail from "../src/pages/ProductDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <AdminPage />,
  },
  {
    path: "/product",
    element: <ProductPage />,
  },
  {
    path: "/product/:id",
    element: <ProductDetail />,
  },
]);

export default router;
