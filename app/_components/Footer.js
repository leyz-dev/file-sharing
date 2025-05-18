import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h3 className="text-2xl font-bold">PROTECTYOU.COM</h3>
            <p className="text-gray-400">
              Your reliable file storage and sharing platform.
            </p>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} PROTECTYOU. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
