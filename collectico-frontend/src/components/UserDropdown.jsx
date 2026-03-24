import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { routePaths } from "@/shared/config/routes.js";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@mui/material";

const UserDropdown = () => {
  const { logout, user } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ");
 
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate(routePaths.home);
  };
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const closeDropdown = () => setDropdownOpen(false);
  const closeDropdownDisable = () => {
    alert("This function is disable for now; I told you not to click it!");
    setDropdownOpen(false);
  };

  const wrapperRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        closeDropdown();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="relative" ref={wrapperRef}>
      <button onClick={toggleDropdown} className="hover:text-[#b49b8e]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6 mt-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
      </button>

      {dropdownOpen && (
        <div className="absolute -translate-x-1/2 mt-2 w-56 bg-[#806248] shadow-lg z-50">
          <div className="flex items-center gap-2 p-4 border-b">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/thumb/8/82/Lightning_McQueen.png/250px-Lightning_McQueen.png"
              alt="profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className=" font-medium text-[##f9f7f3]">
              {fullName || "Guest"}
            </span>
          </div>
          <ul className="p-2 bg-[#806248] text-[#f9f7f3]">
            <li>
              <Link
                onClick={closeDropdownDisable}
                className="block px-4 py-2 bg-gray-600"
              >
                Account (don&apos;t click!)
              </Link>
            </li>
            <li>
              <Link
                to={routePaths.market}
                onClick={closeDropdown}
                className="block px-4 py-2 hover:bg-[#62483a]"
              >
                Market
              </Link>
            </li>
            <li>
              <Link
                onClick={closeDropdownDisable}
                className="block px-4 py-2 bg-gray-600"
              >
                Setting (don&apos;t click!)
              </Link>
            </li>
            <li>
              <Button
                onClick={handleLogout}
                fullWidth
                sx={{ color: "white" , bgcolor: "transparent" , "&:hover": { bgcolor: "red" } }}
              >
                Log Out
              </Button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
