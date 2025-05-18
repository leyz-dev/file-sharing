"use client";
import React, { useState } from "react";
import Image from "next/image";

// Define the keyframe animation for falling snowflakes
const snowflakeAnimation = `@keyframes snow {
  0% { transform: translateY(-100px); opacity: 1; }
  100% { transform: translateY(100vh); opacity: 0; }
}`;

const Header = () => {
  // State to manage the open/closed state of the mobile menu
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the menu visibility
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <style>{snowflakeAnimation}</style>
      <header className="bg-red-400 shadow relative overflow-hidden">
        {/* Snowflakes effect */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="snowflake absolute bg-white rounded-full opacity-75 animate-snowing"
              style={{
                animationDuration: `${Math.random() * 5 + 3}s`,
                animationDelay: `${Math.random() * 3}s`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * -50}%`,
                width: `${Math.random() * 15 + 10}px`,
                height: `${Math.random() * 15 + 10}px`,
              }}
            />
          ))}
        </div>

        <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
          <a>
            <p className="text-lg font-black text-white">PROTECTYOU</p>
          </a>
          <div className="flex flex-1 items-center justify-end md:justify-between">
            {/* Desktop Navigation */}
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm text-white">
                <li>
                  <a
                    className="text-white transition hover:text-gray-200"
                    href="#"
                  >
                    Home
                  </a>
                </li>

                <li>
                  <a
                    className="text-white transition hover:text-gray-200"
                    href="/upload"
                  >
                    Upload
                  </a>
                </li>

                <li>
                  <a
                    className="text-white transition hover:text-gray-200"
                    href="#about"
                  >
                    About Us
                  </a>
                </li>

                <li>
                  <a
                    className="text-white transition hover:text-gray-200"
                    href="#contact"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </nav>

            {/* Mobile Menu Toggle Button */}
            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                <a
                  className="block rounded-md bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-700"
                  href="/files"
                >
                  Get Started
                </a>
              </div>

              <button
                className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
                onClick={toggleMenu} // Toggle the menu visibility
              >
                <span className="sr-only">Toggle menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden">
            <ul className="flex flex-col items-center bg-red-300 border-t">
              <li>
                <a
                  className="block px-4 py-2 text-white hover:text-gray-200"
                  href="#"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  className="block px-4 py-2 text-white hover:text-gray-200"
                  href="/upload"
                >
                  Upload
                </a>
              </li>
              <li>
                <a
                  className="block px-4 py-2 text-white hover:text-gray-200"
                  href="#about"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  className="block px-4 py-2 text-white hover:text-gray-200"
                  href="#contact"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </nav>
        )}
      </header>
    </>
  );
};

export default Header;
