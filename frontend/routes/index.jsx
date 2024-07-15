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
import DiscussionPage from "../src/components/user/DiscussionPage";
import ReviewPage from "../src/components/user/ReviewPage";
import ChangeProfile from "../src/components/user/ChangeProfile";
import ChangePassword from "../src/components/user/ChangePassword";
import ChangeEmail from "../src/components/user/ChangeEmail";
import SellingProduct from "../src/components/seller/SellingProduct";
import ProductList from "../src/components/seller/ProductList";
import SalesHistory from "../src/components/seller/SalesHistory";
import RegisterSeller from "../src/components/seller/RegisterSeller";
import CartPage from "../src/pages/CartPage";
import ShipmentPage from "../src/pages/ShipmentPage";

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
      {
        path: "discussion",
        element: <DiscussionPage />,
      },
      {
        path: "review",
        element: <ReviewPage />,
      },
      {
        path: "change-profile",
        element: <ChangeProfile />,
      },
      {
        path: "change-password",
        element: <ChangePassword />,
      },
      {
        path: "change-email",
        element: <ChangeEmail />,
      },
    ],
  },
  {
    path: "/seller",
    element: <UserPage />,
    children: [
      {
        path: "register",
        element: <RegisterSeller />,
      },
      {
        path: "add-product",
        element: <SellingProduct />,
      },
      {
        path: "product-list",
        element: <ProductList />,
      },
      {
        path: "sales-history",
        element: <SalesHistory />,
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
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/cart/shipment",
    element: <ShipmentPage />,
  },
]);

export default router;
