import { UserButton } from "@clerk/nextjs";
import { Minimize2, AlignJustify } from "lucide-react";
import React from "react";

const TopHeader = ({ toggleSideNav, isSideNavVisible }) => {
  return (
    <div className="flex p-5 border-b items-center justify-between md:justify-end">
      {/* Toggle Button for smaller screens */}
      <button onClick={toggleSideNav} className="md:hidden">
        {isSideNavVisible ? (
          <Minimize2 className="w-6 h-6" />
        ) : (
          <AlignJustify className="w-6 h-6" />
        )}
      </button>

      {/* Logo for smaller screens */}
      <a>
        <p className="text-xl font-black md:hidden">PROTECTYOU</p>
      </a>

      {/* UserButton (right-aligned) */}
      <UserButton />
    </div>
  );
};

export default TopHeader;
