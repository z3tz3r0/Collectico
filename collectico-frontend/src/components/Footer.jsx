import React from "react";
import Animation from "../../Animation/Animation.jsx";

function Footer() {
  return (
    <>
      <footer className="bg-[#62483A] text-white text-[10px]">
        <div className="grid grid-cols-2 grid-rows-2 md:hidden">
          <div className="flex items-center justify-center border-white border-b border-r">
            <div className="p-3">
              <img
                src="/logo/logofull.png"
                alt="Collectico Logo"
                className="w-16 object-contain"
              />
            </div>
            <div>
              <h2>Visit</h2>
              <p>The Collection</p>
              <p>Exhibitions and Events</p>
            </div>
          </div>
          <div className="grid grid-cols-2 border-white border-b">
            <div className="ml-2 sm:ml-5 p-2 sm:p-3">
              <h2 className="font-bold pb-2 sm:pb-4">Support us</h2>
              <a href="/membership">Membership</a>
              <p>
                {" "}
                <a href="/luminary">Luminary</a>
              </p>
              <p>
                {" "}
                <a href="/sponsorship">Corporate Sponsorship</a>
              </p>
            </div>
            <div className="p-2 sm:p-3 flex flex-col justify-center">
              <img
                src="./logo/generation.png"
                alt="Collectico Logo"
                className="mb-1 w-full max-w-[80px]"
              />
              <img
                src="./logo/genkx.png"
                alt="Collectico Logo"
                className="w-full max-w-[80px]"
              />
            </div>
          </div>
          <div className="flex items-center justify-center border-white border-r">
            <div className="p-3">
              <img
                src="./logo/map.png"
                alt="Collectico Logo"
                className="w-16 object-contain"
              />
            </div>
            <div>
              <h2>159 East Movest Street Thailand, IL 60603</h2>
            </div>
          </div>
          <div className="grid grid-cols-3">
            <div className="flex items-center justify-center col-span-2 border-white border-r">
              <div className="p-2">
                <h2 className="font-bold pb-1 sm:pb-2">About us</h2>
                <p>
                  {" "}
                  <a href="/mission">Mission and History</a>
                </p>
                <p>
                  {" "}
                  <a href="/teammember">Meet Team Member</a>
                </p>
                <p>
                  {" "}
                  <a href="/financialreport">Financial Reporting</a>
                </p>
              </div>
            </div>
            <div className="grid items-center justify-center p-1 sm:p-2">
              <h2 className="font-bold">Follow us</h2>
              <div className="grid items-center justify-center space-y-2 sm:space-y-3">
                <a href="https://www.facebook.com/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 sm:h-4 sm:w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
                <a href="https://x.com/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 sm:h-4 sm:w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="https://www.instagram.com/accounts/login/?hl=en">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 sm:h-4 sm:w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* pc-footer */}
        <div className="mx-auto max-w-screen-2xl px-16 py-5 text-sm hidden md:block">
          <div className="grid grid-cols-4 gap-8">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center">
                <img
                  src="./logo/logofull.png"
                  alt="Collectico Logo"
                  className="w-20"
                />
              </div>
              <div className="mt-4">
                <Animation />
                <p>Visit</p>
                <p>The Collection</p>
                <p>Exhibitions and Events</p>
              </div>
            </div>
            <div>
              <img
                src="./logo/map.png"
                alt="Collectico Logo"
                className="w-20"
              />
              <div className="mt-4">
                <p>159 East Movest Street</p>
                <p>Thailand, IL 60603</p>
              </div>
            </div>
            <div>
              <h3 className="text-base font-semibold mb-4">Support Us</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/membership">Membership</a>
                </li>
                <li>
                  <a href="/luminary">Luminary</a>
                </li>
                <li>
                  <a href="/sponsorship">Corporate Sponsorship</a>
                </li>
              </ul>
              <div className="mt-6 flex space-x-4">
                <img
                  src="./logo/generation.png"
                  alt="Collectico Logo"
                  className="w-28"
                />
                <img
                  src="./logo/genkx.png"
                  alt="Collectico Logo"
                  className="w-28"
                />
              </div>
            </div>
            <div>
              <h3 className="text-base font-semibold mb-4">About Us</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/mission">Mission and History</a>
                </li>
                <li>
                  <a href="/teammember">Meet Team Member</a>
                </li>
                <li>
                  <a href="/financialreport">Financial Reporting</a>
                </li>
              </ul>
              <h3 className="text-base font-semibold mt-6 mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
                <a href="https://x.com/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="https://www.instagram.com/accounts/login/?hl=en">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-6 text-center">
            <p>© 2025 Collectico. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
