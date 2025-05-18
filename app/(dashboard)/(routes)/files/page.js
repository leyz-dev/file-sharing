"use client";
import React, { useEffect, useState } from "react";
import { app } from "../../../../firebaseConfig";
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { useUser } from "@clerk/nextjs";

const Files = () => {
  const { user } = useUser();
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null); // State to hold selected file for modal

  const categories = [
    { name: "All", icon: "📂", extensions: [] },
    { name: "Pictures", icon: "🖼️", extensions: ["jpg", "jpeg", "png", "gif"] },
    {
      name: "Documents",
      icon: "📄",
      extensions: ["pdf", "doc", "docx", "txt"],
    },
    { name: "Videos", icon: "🎥", extensions: ["mp4", "avi", "mov"] },
    { name: "Audio", icon: "🎵", extensions: ["mp3", "wav", "aac"] },
  ];

  const storage = getStorage(app);

  useEffect(() => {
    const fetchFiles = async () => {
      if (!user) {
        console.error("User not found");
        return;
      }

      const userId = user.id;
      const storageRef = ref(storage, `users/${userId}/files`);

      try {
        const fileList = await listAll(storageRef);

        if (fileList.items.length === 0) {
          return;
        }

        const filePromises = fileList.items.map((item) =>
          getDownloadURL(item).then((url) => ({
            name: item.name,
            url: url,
            fullPath: item.fullPath,
            type: item.name.split(".").pop().toLowerCase(),
            size: item.size,
            lastModified: item.timeCreated, // Date modified
          }))
        );

        const filesWithUrls = await Promise.all(filePromises);
        setFiles(filesWithUrls);
        setFilteredFiles(filesWithUrls); // Show all files initially
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, [user]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.name);
    if (category.name === "All") {
      setFilteredFiles(files);
    } else {
      const filtered = files.filter((file) =>
        category.extensions.some((ext) => file.type === ext)
      );
      setFilteredFiles(filtered);
    }
  };

  const handleDelete = async (filePath) => {
    try {
      const fileRef = ref(storage, filePath);
      await deleteObject(fileRef);
      setFiles((prevFiles) =>
        prevFiles.filter((file) => file.fullPath !== filePath)
      );
      setFilteredFiles((prevFiles) =>
        prevFiles.filter((file) => file.fullPath !== filePath)
      );
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const confirmDelete = (file) => {
    setFileToDelete(file);
    setIsModalOpen(true);
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const filteredBySearch = files.filter((file) =>
      file.name.toLowerCase().includes(searchValue)
    );

    setFilteredFiles(filteredBySearch);
  };

  const handleFileClick = (file) => {
    setSelectedFile(file);
    setIsModalOpen(true); // Open modal on file click
  };

  // Get the count of files per category
  const getFileCount = (category) => {
    if (category.name === "All") {
      return files.length;
    } else {
      return files.filter((file) =>
        category.extensions.some((ext) => file.type === ext)
      ).length;
    }
  };

  const handleShare = async (file) => {
    const shareData = {
      title: file.name,
      text: "Check out this file I shared with you!",
      url: file.url,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        console.log("File shared successfully");
      } else {
        navigator.clipboard.writeText(file.url).then(() => {
          alert("File link copied to clipboard!");
        });
      }
    } catch (err) {
      console.error("Error sharing the file:", err);
    }
  };

  const handleConfirmDelete = () => {
    if (fileToDelete) {
      handleDelete(fileToDelete.fullPath);
      setIsModalOpen(false);
      setFileToDelete(null);
    }
  };

  const formatFileSize = (size) => {
    const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
    return (
      parseFloat((size / Math.pow(1024, i)).toFixed(2)) +
      " " +
      ["Bytes", "KB", "MB", "GB", "TB"][i]
    );
  };

  const getFileTypeIcon = (type) => {
    switch (type) {
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return "🖼️";
      case "pdf":
        return "📄";
      case "doc":
      case "docx":
        return "📄";
      case "mp4":
        return "🎥";
      case "mp3":
        return "🎵";
      case "wav":
        return "🎶";
      case "aac":
        return "🎶";
      case "txt":
        return "📄";
      default:
        return "📁";
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 bg-gray-100">
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search files..."
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Categories Section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div
              key={category.name}
              className={`flex flex-col items-center p-4 ${
                selectedCategory === category.name
                  ? "bg-blue-200"
                  : "bg-blue-100"
              } rounded-lg text-center cursor-pointer hover:bg-blue-200 transition`}
              onClick={() => handleCategoryClick(category)}
            >
              <div className="text-3xl">{category.icon}</div>
              <div className="font-bold text-lg">{category.name}</div>
              <div className="text-gray-500">
                {getFileCount(category)}{" "}
                {getFileCount(category) === 1 ? "file" : "files"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Files Section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Files</h2>
        <div className="space-y-6">
          {filteredFiles.length > 0 ? (
            filteredFiles.map((file) => (
              <div
                key={file.name}
                className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-lg shadow-sm"
              >
                <div className="flex items-center w-full">
                  <div className="w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded-full flex-shrink-0">
                    {getFileTypeIcon(file.type)}
                  </div>
                  <div className="ml-4 flex-1">
                    <p
                      className="font-bold text-blue-500 truncate w-full cursor-pointer"
                      onClick={() => handleFileClick(file)} // Open modal on file click
                    >
                      {file.name.length > 20
                        ? file.name.slice(0, 10) + "..." + file.name.slice(-10)
                        : file.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {new Date(file.lastModified).toLocaleDateString()} |{" "}
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-4 mt-2 sm:mt-0">
                  <a
                    href={file.url}
                    download
                    className="text-blue-500 hover:underline"
                  >
                    Download
                  </a>
                  <button
                    onClick={() => handleShare(file)}
                    className="text-green-500 hover:underline"
                  >
                    Share
                  </button>
                  <button
                    onClick={() => confirmDelete(file)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No files found.</p>
          )}
        </div>
      </div>

      {/* File Detail Modal */}
      {isModalOpen && selectedFile && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="relative mx-4" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-white text-3xl focus:outline-none"
            >
              &times;
            </button>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold">{selectedFile.name}</h2>
              <div className="mb-4">
                <img
                  src={selectedFile.url}
                  alt={selectedFile.name}
                  className="max-w-full h-auto rounded-md"
                />
              </div>
              <p className="text-sm text-gray-600">
                {new Date(selectedFile.lastModified).toLocaleDateString()} |{" "}
                {formatFileSize(selectedFile.size)}
              </p>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isModalOpen && !selectedFile && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="relative mx-4" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-white text-3xl focus:outline-none"
            >
              &times;
            </button>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold">Confirm Deletion</h2>
              <p>Are you sure you want to delete this file?</p>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Files;
