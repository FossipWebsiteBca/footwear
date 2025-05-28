import {
  FaTachometerAlt,
  FaBoxOpen,
  FaChartBar,
  FaChartPie,
  FaSignOutAlt,
  FaUserCheck,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../scripts/firebase.Config";
import logoImage from "../assets/Negetive2.png";

const Sidebar = ({ active, setActive }) => {
  const navigate = useNavigate();

  const navItems = [
    { name: "Dashboard", icon: <FaTachometerAlt /> },
    { name: "Inventory", icon: <FaBoxOpen /> },
    { name: "Sales", icon: <FaChartBar /> },
    { name: "Attendance", icon: <FaUserCheck /> },
    { name: "Report", icon: <FaChartPie /> },
    { name: "Logout", icon: <FaSignOutAlt /> },
  ];

  const handleNavClick = async (name) => {
    if (name === "Logout") {
      await signOut(auth);
      navigate("/login");
    } else {
      setActive(name);
    }
  };

  return (
    <aside className="flex-none basis-[240px] w-[240px] h-[max-content] bg-white font-poppins">
      <div className="mb-10 flex justify-center">
        <img
          src={logoImage}
          alt="Noble Footwear Logo"
          className="w-[160px] h-[85px] object-contain"
        />
      </div>

      <nav className="space-y-4">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => handleNavClick(item.name)}
            className={`w-full h-[57px] flex items-center gap-4 px-6 rounded font-bold text-[20px] transition
              ${
                active === item.name
                  ? "bg-[#1A73E8] text-white"
                  : "bg-transparent text-[#111827] hover:bg-[#155AB6] hover:text-white"
              }
            `}
          >
            <span className="text-[20px]">{item.icon}</span>
            <span>{item.name}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
