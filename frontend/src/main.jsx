import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { SellerProvider } from "./components/seller/RegisterSeller.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SellerProvider>
      <NextUIProvider>
        <App />
      </NextUIProvider>
    </SellerProvider>
  </React.StrictMode>
);
