"use client";
import { File, Shield, Upload } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation

const SideNav = () => {
  const router = useRouter(); // Initialize the router
  const menuList = [
    {
      id: 1,
      name: "Upload",
      icon: Upload,
      path: "/upload", // Ensure this path is correct
    },
    {
      id: 2,
      name: "Files",
      icon: File,
      path: "/files", // Ensure this path is correct
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index, path) => {
    setActiveIndex(index); // Set the active index for styling
    router.push(path); // Navigate to the selected path
  };

  return (
    <div className="shadow-sm border-r h-full bg-white">
      <div className="p-5 border-b">
        <p className="text-xl font-black">PROTECTYOU</p>
      </div>
      <div className="flex flex-col">
        {menuList.map((item, index) => (
          <button
            key={item.id}
            className={`flex gap-2 p-4 px-6 hover:bg-gray-100 w-full text-gray-500 ${
              activeIndex === index ? "bg-blue-50 text-primary" : ""
            }`}
            onClick={() => handleClick(index, item.path)} // Update click handler
          >
            <item.icon />
            <h2>{item.name}</h2>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SideNav;
