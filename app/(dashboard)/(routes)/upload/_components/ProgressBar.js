import React from "react";

const ProgressBar = ({ progress = 0 }) => {
  return (
    <div className="w-full mt-3">
      {/* Display percentage above the progress bar */}
      <div className="text-center mb-1 text-sm text-gray-700">
        {`${Number(progress).toFixed(0)}%`}{" "}
        {/* Use curly braces for expression */}
      </div>
      <div className="bg-gray-400 w-full h-4 rounded-full">
        <div
          className="bg-primary h-4 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
