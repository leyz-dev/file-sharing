"use client";
import React, { useState, useEffect, useRef } from "react";
import SideNav from "../(dashboard)/(routes)/_components/SideNav";
import TopHeader from "../(dashboard)/(routes)/_components/TopHeader";

const Layout = ({ children }) => {
  const [isSideNavVisible, setSideNavVisible] = useState(false);
  const sideNavRef = useRef(null);

  const toggleSideNav = () => {
    setSideNavVisible((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (
      sideNavRef.current &&
      !sideNavRef.current.contains(event.target) &&
      isSideNavVisible
    ) {
      setSideNavVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSideNavVisible]);

  return (
    <div className="h-full flex">
      {/* SideNav */}
      <div
        ref={sideNavRef}
        className={`fixed inset-y-0 z-50 h-full bg-white transition-transform transform ${
          isSideNavVisible ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:flex md:w-64 flex-col`}
      >
        <SideNav />
      </div>

      {/* Main Content */}
      <div className="md:ml-64 flex-1">
        <TopHeader
          toggleSideNav={toggleSideNav}
          isSideNavVisible={isSideNavVisible}
        />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
