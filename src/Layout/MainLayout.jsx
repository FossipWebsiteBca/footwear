import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import Dashboard from "../pages/Dashboard";
import Inventory from "../pages/Inventory";
import Sales from "../pages/Sales";
import Attendance from "../pages/Attendance";
import Report from "../pages/Report";

const MainLayout = () => {
  const [active, setActive] = useState("Dashboard");

  return (
    <div className="flex">
      <Sidebar active={active} setActive={setActive} />
      <div className="flex-1 relative w-full max-w-full">
        <Navbar />
        <div className="mt-[64px]">
          {active === "Dashboard" && <Dashboard />}
          {active === "Inventory" && <Inventory />}
          {active === "Sales" && <Sales />}
          {active === "Attendance" && <Attendance />}
          {active === "Report" && <Report />}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
