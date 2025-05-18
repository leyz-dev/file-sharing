import React from "react";
import Constant from "./_utils/Constant";

// Define the keyframe animation for falling snowflakes
const snowflakeAnimation = `@keyframes snow {
  0% { transform: translateY(-100px); opacity: 1; }
  100% { transform: translateY(100vh); opacity: 0; }
}`;

const Hero = () => {
  return (
    <>
      <style>{snowflakeAnimation}</style>
      <section className="bg-red-300 shadow relative overflow-hidden">
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

        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex">
          <div className="mx-auto max-w-xl text-center text-white">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              <span className="text-green-700">Upload, Save</span> and easily{" "}
              <span className="text-green-700">Share</span> your files in one
              place
            </h1>

            <p className="mt-4 sm:text-xl/relaxed text-gray-200">
              {Constant.desc}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                className="block w-full rounded px-12 py-3 text-sm font-medium text-white shadow bg-green-600 focus:outline-none focus:ring hover:bg-green-700 sm:w-auto"
                href="/upload"
              >
                Get Started
              </a>

              <a
                className="block w-full rounded px-12 py-3 text-sm font-medium text-green-600 shadow hover:text-green-700 focus:outline-none focus:ring sm:w-auto"
                href="#"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
