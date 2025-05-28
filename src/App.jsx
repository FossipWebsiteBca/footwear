import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Sales from "./pages/Sales";
import Attendance from "./pages/Attendance";
import Report from "./pages/Report";
import Billing from "./pages/Billing";
import Login from "./pages/Login";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />

      {/* MainLayout for Admin */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/report" element={<Report />} />
      </Route>

      {/* Employee-only route (no layout assumed) */}
      <Route path="/billing" element={<Billing />} />

      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
}

export default App;
