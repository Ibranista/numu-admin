import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../firebase";
import { icons } from "../assets/icons";

const links = [
  {
    name: "Dashboard",
    path: "/",
    icon: icons.dashboard,
  },
  {
    name: "Therapist",
    path: "/therapist",
    icon: icons.therapist,
  },
  {
    name: "Therapist Match",
    path: "/therapist-match",
    icon: icons.therapistMatch,
  },
  {
    name: "Utils",
    path: "/utils",
    icon: icons.utils,
  },
];

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate("/auth");
  };

  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-full w-72 lg:w-96 bg-purple-800/95 text-white flex flex-col z-40 transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:static`}
      >
        <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-700/60 shadow-sm">
          <img src="/wecare.png" alt="WeCare Logo" className="h-10 w-auto" />
          <span className="text-2xl font-bold tracking-wide text-white">
            WeCare
          </span>
        </div>

        <nav className="flex-1 py-6 flex flex-col gap-4 px-4">
          {links.map((link) => (
            <button
              key={link.name}
              onClick={() => {
                navigate(link.path);
                setOpen(false);
              }}
              className={`text-lg flex items-center px-4 py-3 rounded-lg transition-all duration-200 w-full font-medium
                ${
                  location.pathname === link.path
                    ? "bg-purple-700 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={link.icon}
                />
              </svg>
              {link.name}
            </button>
          ))}
        </nav>

        <div className="mt-auto mb-6 px-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center py-3 px-4 rounded-lg bg-red-600 hover:bg-red-700 transition-colors font-medium text-white"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
