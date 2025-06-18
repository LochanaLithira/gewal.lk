import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import {
  User,
  CalendarCheck,
  MessageSquare,
  LifeBuoy,
  LogOut,
} from "lucide-react";
import { assets } from "../assets/assets";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [profileDropdown, setProfileDropdown] = useState(false);
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState(false);
  const [clicked, setClicked] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  const { setcartItems } = useContext(ShopContext);

  useEffect(() => {
    if (!token) return;
    axios
      .get(`${backendUrl}/api/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.success) setUser(res.data.user);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setToken(null);
        navigate("/login");
      });
  }, [token, backendUrl, navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setcartItems({});
    setProfileDropdown(false);
    navigate("/login");
  };

  // Hide dropdown after click on any profile menu option
  const handleDropdownNavigate = (route) => {
    setProfileDropdown(false);
    navigate(route);
  };

  return (
    <nav className="flex items-center justify-between py-4 px-4 md:px-12 bg-white shadow-sm border-b border-gray-200 font-semibold sticky top-0 z-50">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <img
          src={assets.gewal}
          className="h-10 w-auto sm:h-12 object-contain transition-all hover:scale-105"
          alt="Logo"
        />
      </Link>

      {/* Navbar Links */}
      <ul className="hidden md:flex gap-7 text-base text-gray-700 font-medium items-center">
        {["Home", "Properties","About", "Contact", "Feedbacks", "News"].map((item) => (
          <NavLink
            key={item}
            to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
            className={({ isActive }) =>
              `hover:text-blue-600 transition-all duration-300 ${
                isActive ? "text-blue-700 font-bold" : ""
              }`
            }
          >
            {item}
          </NavLink>
        ))}

        {!user && (
          <button
            className="bg-black text-white px-5 py-2 rounded-lg font-semibold hover:bg-gray-800 transition shadow ml-12 z-50 relative"
            onClick={() => {
              console.log('Login button clicked');
              navigate("/login");
            }}
          >
            Login / Signup
          </button>
        )}
      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Profile Section */}
        <div className="relative profile-dropdown">
          {user ? (
            // Logged-in User Profile Picture
            <img
              src={user.profilePic || assets.profile_icon}
              className="w-10 h-10 rounded-full object-cover cursor-pointer transition-all hover:scale-110 border-2 border-gray-300"
              alt="Profile Icon"
              onClick={() => setProfileDropdown((prev) => !prev)}
            />
          ) : (
            // Default Profile Icon for Unregistered Users
            <div
              className="relative flex items-center justify-center"
              onMouseEnter={() => !clicked && setShowTooltip(true)}
              onMouseLeave={() => !clicked && setShowTooltip(false)}
            >
              <img
                src={assets.profile_icon}
                className="w-8 h-8 rounded-full cursor-pointer transition-all duration-300 hover:scale-110"
                alt="Profile Icon"
                onClick={() => {
                  setShowTooltip(false);
                  setClicked(true);
                  navigate("/login");
                }}
              />
              {showTooltip && (
                <div className="absolute bottom-full mt-6 px-3 py-1 bg-black text-white text-sm font-semibold rounded-md shadow-md animate-fadeIn">
                  Register
                </div>
              )}
            </div>
          )}

          {/* Dropdown Menu for Logged-in Users */}
          {user && profileDropdown && (
            <div className="absolute right-0 mt-3 w-56 bg-white shadow-lg rounded-lg p-2 text-gray-700 border border-gray-200 z-50 animate-fadeIn">
              <button
                onClick={() => handleDropdownNavigate("/profile")}
                className="w-full text-left px-4 py-2 rounded-md hover:bg-blue-100 flex items-center gap-2"
              >
                <User className="w-4 h-4 text-gray-600" /> My Profile
              </button>
              <button
                onClick={() => handleDropdownNavigate("/raise-ticket")}
                className="w-full text-left px-4 py-2 rounded-md hover:bg-blue-100 flex items-center gap-2"
              >
                <LifeBuoy className="w-4 h-4 text-gray-600" /> Raise A Ticket
              </button>
              <button
                onClick={() => handleDropdownNavigate("/my-tickets")}
                className="w-full text-left px-4 py-2 rounded-md hover:bg-blue-100 flex items-center gap-2"
              >
                <CalendarCheck className="w-4 h-4 text-gray-600" /> My Tickets
              </button>
              <button
                onClick={() => handleDropdownNavigate("/submit-feedbacks")}
                className="w-full text-left px-4 py-2 rounded-md hover:bg-blue-100 flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-gray-600" /> Add A Feedback
              </button>
              <button
                onClick={() => handleDropdownNavigate("/add-prop")}
                className="w-full text-left px-4 py-2 rounded-md hover:bg-blue-100 flex items-center gap-2"
              >
                <LifeBuoy className="w-4 h-4 text-gray-600" /> Add A Property
              </button>
              <button
                onClick={() => handleDropdownNavigate("/tenant-submit")}
                className="w-full text-left px-4 py-2 rounded-md hover:bg-blue-100 flex items-center gap-2"
              >
                <LifeBuoy className="w-4 h-4 text-gray-600" /> Submit Maintenance Request
              </button>
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 text-red-500 rounded-md hover:bg-red-100 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4 text-red-500" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
