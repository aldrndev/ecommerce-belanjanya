import { createBrowserRouter } from "react-router-dom";
import Home from "../src/pages/Home";
import AdminPage from "../src/pages/AdminPage";
import ProductPage from "../src/pages/ProductPage";
import ProductDetail from "../src/pages/ProductDetail";
import UserPage from "../src/pages/UserPage";
import UseProfile from "../src/components/user/UseProfile";
import OrderHistory from "../src/components/user/OrderHistory";
import WishlistPage from "../src/components/user/WishlistPage";
import ChatPage from "../src/components/user/ChatPage";

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
  {
    path: "/user",
    element: <UserPage />,
    children: [
      {
        path: "profile",
        element: <UseProfile />,
      },
      {
        path: "order-history",
        element: <OrderHistory />,
      },
      {
        path: "wishlist",
        element: <WishlistPage />,
      },
      {
        path: "chat",
        element: <ChatPage />,
      },
    ],
  },
]);

export default router;
