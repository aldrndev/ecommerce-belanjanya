import React from "react";
import Navbar from "../components/Navbar";
import UserSidebar from "../components/user/UserSidebar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const UserPage = () => {
  return (
    <main>
      <div className="fixed top-0 z-50 w-full bg-white border-b-1">
        <Navbar />
      </div>
      <div className="container mx-auto">
        <div className="flex gap-5 mt-40">
          <div className="h-full">
            <UserSidebar />
          </div>
          <div className="flex-grow">
            <Outlet />
          </div>
        </div>
        <div className="mt-20">
          <Footer />
        </div>
      </div>
    </main>
  );
};

export default UserPage;
