import { createBrowserRouter, redirect } from "react-router-dom";
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
import OrderPage from "../src/components/user/checkout/OrderPage";
import AboutUs from "../src/components/footer/AboutUs";
import ContactUs from "../src/components/footer/ContactUs";
import Faq from "../src/components/footer/Faq";
import PrivacyPolicy from "../src/components/footer/PrivacyPolicy";
import TermCondition from "../src/components/footer/TermCondition";
import ReturnPolicy from "../src/components/footer/ReturnPolicy";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/home",
    element: <Home />,
    loader: () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        return redirect("/");
      }
      return null;
    },
  },

  {
    path: "/logout",
    element: <Home />,
  },
  {
    path: "/product",
    element: <ProductPage />,
  },
  {
    path: "/:seller/:title",
    element: <ProductDetail />,
  },
  {
    path: "/user",
    element: <UserPage />,
    loader: () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        return redirect("/");
      }
      return null;
    },
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
    loader: () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        return redirect("/");
      }
      return null;
    },
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
    loader: () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        return redirect("/");
      }
      return null;
    },
  },
  {
    path: "/shipment",
    element: <ShipmentPage />,
    loader: () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        return redirect("/");
      }
      return null;
    },
  },
  {
    path: "/order",
    element: <OrderPage />,
    loader: () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        return redirect("/");
      }
      return null;
    },
  },
  {
    path: "/about-us",
    element: <AboutUs />,
  },
  {
    path: "/contact",
    element: <ContactUs />,
  },
  {
    path: "/faq",
    element: <Faq />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/terms-condition",
    element: <TermCondition />,
  },
  {
    path: "/return-policy",
    element: <ReturnPolicy />,
  },
]);

export default router;
