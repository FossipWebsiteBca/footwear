import React from "react";
import notificationImage from "../assets/notification.png";

const Navbar = () => {
  return (
    <header className="h-[64px] w-full bg-white shadow absolute top-0 left-0 z-50 flex items-center justify-between px-8">
      <h2 className="text-[24px] font-medium font-[Poppins] text-gray-800">
        Welcome Back, Admin
      </h2>

      <button className="w-[40px] h-[40px] bg-white border border-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-100 transition">         
        <img
          src={notificationImage}
          alt="Notifications"
          className="w-[20px] h-[20px]"
        />
      </button>
    </header>
  );
};

export default Navbar;
