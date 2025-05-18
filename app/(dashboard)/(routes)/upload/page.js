"use client";
import React, { useState } from "react";
import UploadForm from "./_components/UploadForm";
import ProgressBar from "./_components/ProgressBar";
import { app } from "../../../../firebaseConfig";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useUser } from "@clerk/nextjs";

const Upload = () => {
  const { user } = useUser();
  const [progress, setProgress] = useState(0);
  const storage = getStorage(app);

  const uploadFile = (file) => {
    if (!user) {
      console.error("User not found");
      return; // Exit if the user is not found
    }

    const metadata = {
      contentType: file.type,
    };
    const userId = user.id; // Get the unique user ID
    const storageRef = ref(storage, `users/${userId}/files/${file.name}`); // Save files in user-specific folder
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.error("Upload failed:", error);
      },
      () => {
        console.log("Upload successful!");
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setProgress(0);
        });
      }
    );
  };

  return (
    <div className="p-4 sm:p-5 sm:px-8 lg:px-28">
      <h2 className="text-lg sm:text-xl lg:text-2xl text-center mb-4 lg:mb-5">
        Start <strong className="text-primary">Uploading</strong> Files and
        <strong className="text-primary"> Share</strong> it
      </h2>

      <UploadForm
        uploadBtnClick={(files) => {
          if (files.length === 0) {
            console.error("No files selected");
            return; // Exit if no files are selected
          }
          files.forEach(uploadFile); // Call uploadFile for each file
        }}
      />
      {progress > 0 && (
        <div className="mt-4 sm:mt-5">
          <ProgressBar progress={progress} />
        </div>
      )}
    </div>
  );
};

export default Upload;
