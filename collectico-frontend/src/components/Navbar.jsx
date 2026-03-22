import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Animation from "../../Animation/Animation.jsx";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext.jsx";
import { Badge, Dialog, DialogContent } from "@mui/material";
import UserDropdown from "./UserDropdown.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import ForgotPassword from "../pages/ForgotPassword.jsx";

function Navbar() {
  const { cartCount } = useCart();

  const { isAuthenticated, isLoginPopupOpen, openLoginPopup, closeLoginPopup } =
    useAuth();
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [tempEmail, setTempEmail] = useState("");
  const [tempPassword, setTempPassword] = useState("");

  const handleOpenLogin = (email = "", password = "") => {
    setTempEmail(typeof email === "string" ? email : "");
    setTempPassword(typeof password === "string" ? password : "");
    openLoginPopup();
    setIsRegisterOpen(false);
    setIsForgotPasswordOpen(false);
  };

  const handleOpenRegister = () => {
    closeLoginPopup();
    setIsRegisterOpen(true);
    setIsForgotPasswordOpen(false);
  };

  const handleOpenForgotPassword = () => {
    closeLoginPopup();
    setIsRegisterOpen(false);
    setIsForgotPasswordOpen(true);
  };

  const handleCloseRegister = () => setIsRegisterOpen(false);
  const handleCloseForgotPassword = () => setIsForgotPasswordOpen(false);


  return (
    <>
      <nav className="sticky top-0 z-50 bg-[#62483A] text-white shadow-lg">
        {/* nav-mobile */}
        <div className="flex flex-col items-center justify-center w-full p-4 md:hidden">
          <div className="flex items-center justify-center w-full">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dnkaoicoo/image/upload/v1747275164/u1qjduxtlkxl1e9bl4tw.png"
                alt="Collectico Logo"
                className="w-7 h-7"
              />
            </Link>
            <Link to="/">
              <h2 className="text-l font-bold ml-2">COLLECTICO</h2>
            </Link>
          </div>
          <div className="w-11/12 h-[0.5px] bg-stone-200 mx-auto mt-4" />
          <div className="flex pt-4 w-11/12 justify-between">
            <div className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 cursor-pointer opacity-0"
                id="hamburger-icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </div>
            {isAuthenticated ? (
              <div className="flex items-end space-x-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 mb-2  opacity-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
                <UserDropdown />
                <Link to="/MyOrder">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 mb-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                    />
                  </svg>
                </Link>
                <Link to="/Cart">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 mb-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                </Link>
              </div>
            ) : (
              <>
                <button
                  onClick={handleOpenLogin}
                  className="hover:text-[#b49b8e]"
                >
                  Login
                </button>
              </>
            )}
          </div>
          <div className="flex-col items-center justify-between mt-4 space-x-8">
            <Link to="/">Home</Link>
            <Link to="/mainshop">Shop</Link>
            <Link to="/auction">Auction</Link>
            <Link to="/ourstory">About</Link>
          </div>
        </div>
        {/* nav-pc */}

        <div className="hidden md:block p-2">
          <div className="max-w-screen-2xl mx-auto flex items-center justify-between px-6">
            <div className="flex items-center pl-4">
              <Link to="/">
                <img
                  src="https://res.cloudinary.com/dnkaoicoo/image/upload/v1747275164/u1qjduxtlkxl1e9bl4tw.png"
                  alt="Collectico Logo"
                  className="w-10 h-10"
                />
              </Link>
              <Link to="/">
                <h2 className="text-2xl font-bold ml-2 hover:text-[#b49b8e]">
                  COLLECTICO
                </h2>
              </Link>
            </div>
            <div className="hidden md:flex space-x-10">
              <Link to="/" className="hover:text-[#b49b8e]">
                Home
              </Link>
              <Link to="/mainshop" className="hover:text-[#b49b8e]">
                Shop
              </Link>
              <Animation />
              <Link to="/auction" className="hover:text-[#b49b8e]">
                Auction
              </Link>
              <Link to="/ourstory" className="hover:text-[#b49b8e]">
                About
              </Link>
            </div>
            <div className="flex items-center space-x-4 pr-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6  opacity-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
              {isAuthenticated ? (
                <>
                  <UserDropdown />
                  <Link to="/myorder" className="hover:text-[#b49b8e]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                      />
                    </svg>
                  </Link>
                  <div className="relative">
                    <Link to="/cart" className="hover:text-[#b49b8e]">
                      <Badge badgeContent={cartCount} color="secondary">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                          />
                        </svg>
                      </Badge>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <button
                    onClick={handleOpenLogin}
                    className="hover:text-[#b49b8e]"
                  >
                    Login
                  </button>
                </>
              )}
            </div>
            {/* Login propup */}
            <Dialog
              open={isLoginPopupOpen}
              onClose={closeLoginPopup}
              PaperProps={{
                sx: {
                  backgroundColor: "transparent",
                  boxShadow: "none",
                },
              }}
            >
              <DialogContent sx={{ padding: 0 }}>
                <Login
                  onClose={closeLoginPopup}
                  switchToRegister={handleOpenRegister}
                  switchToForgotPassword={handleOpenForgotPassword}
                  prefillEmail={tempEmail}
                  prefillPassword={tempPassword}
                />
              </DialogContent>
            </Dialog>
            {/* Register propup */}
            <Dialog
              open={isRegisterOpen}
              onClose={handleCloseRegister}
              // fullWidth
              maxWidth="xl"
              PaperProps={{
                sx: {
                  backgroundColor: "transparent",
                  boxShadow: "none",
                },
              }}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <DialogContent sx={{ padding: 0 }}>
                <Register
                  onClose={handleCloseRegister}
                  switchToLogin={handleOpenLogin}
                />
              </DialogContent>
            </Dialog>
            {/* ForgotPassword propup */}
            <Dialog
              open={isForgotPasswordOpen}
              onClose={handleCloseForgotPassword}
              fullWidth
              maxWidth="xl"
              PaperProps={{
                sx: {
                  backgroundColor: "transparent",
                  boxShadow: "none",
                },
              }}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <DialogContent sx={{ padding: 0 }}>
                <ForgotPassword onClose={handleCloseForgotPassword} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
