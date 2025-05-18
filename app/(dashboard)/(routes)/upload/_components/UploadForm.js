"use client";
import React, { useState, useRef } from "react";
import { File, Trash2 } from "lucide-react";
import AlertMsg from "./AlertMsg";

const UploadForm = ({ uploadBtnClick }) => {
  const [files, setFiles] = useState([]);
  const [errorMsg, setErrorMsg] = useState();
  const fileInputRef = useRef(null);

  const onFileSelect = (selectedFiles) => {
    const newFiles = Array.from(selectedFiles);
    const totalSize = newFiles.reduce((sum, file) => sum + file.size, 0);

    // Change the size limit from 2MB to 20MB (20MB = 20,000,000 bytes)
    if (
      totalSize + files.reduce((sum, file) => sum + file.size, 0) >
      20000000
    ) {
      setErrorMsg("Maximum Total File Upload Size is 20MB");
      return;
    } else {
      setErrorMsg(null);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const formatFileSize = (size) => {
    return size > 1024 * 1024
      ? `${(size / (1024 * 1024)).toFixed(2)} MB`
      : `${(size / 1024).toFixed(2)} KB`;
  };

  const removeFile = (fileToRemove) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove));
  };

  return (
    <div className="text-center">
      <label
        htmlFor="uploadFile1"
        className="bg-blue-50 text-gray-500 font-semibold text-base rounded max-w-md h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-blue-300 border-dashed mx-auto"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 mb-2 fill-blue-500"
          viewBox="0 0 32 32"
        >
          <path
            d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
            data-original="#000000"
          />
          <path
            d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
            data-original="#000000"
          />
        </svg>
        <span className="text-primary text-lg">Upload file</span>
        <input
          type="file"
          id="uploadFile1"
          className="hidden"
          onChange={(event) => onFileSelect(event.target.files)}
          ref={fileInputRef}
          multiple
        />
        <p className="text-xs font-medium text-gray-400 mt-2">
          PNG, JPG, SVG, WEBP, and GIF are Allowed.
          <br /> <span className="text-primary">[Max Total Size: 20MB]</span>
        </p>
      </label>

      {/* Display all selected files and remove buttons */}
      {files.length > 0 && (
        <div className="mt-4">
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-center gap-2">
              <File width={24} height={24} className="text-gray-500" />{" "}
              {/* File icon */}
              <p className="text-gray-600">
                {file.name} - {formatFileSize(file.size)}
              </p>
              {/* Remove (Trash) icon to delete the file */}
              <button
                onClick={() => removeFile(file)}
                className="text-gray-500 hover:text-red-600"
              >
                <Trash2 width={20} height={20} />
              </button>
            </div>
          ))}
        </div>
      )}

      {errorMsg ? <AlertMsg msg={errorMsg} /> : null}

      <button
        disabled={files.length === 0}
        className="p-2 bg-primary text-white w-[30%] rounded-full mt-5 disabled:bg-gray-400"
        onClick={() => uploadBtnClick(files)}
      >
        Upload
      </button>
    </div>
  );
};

export default UploadForm;
