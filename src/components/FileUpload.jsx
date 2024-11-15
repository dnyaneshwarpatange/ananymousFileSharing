import React, { useState } from "react";
import { uploadFile } from "../firebase/storageService";
import { storage } from "../firebase/firebaseConfig";
import { v4 as uuidv4 } from "uuid";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const [expirationTime, setExpirationTime] = useState(60); // Default to 60 minutes
  const [timeUnit, setTimeUnit] = useState("minutes"); // Default to minutes

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleExpirationChange = (e) => {
    setExpirationTime(e.target.value);
  };

  const handleTimeUnitChange = (e) => {
    setTimeUnit(e.target.value);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    setUploading(true);
    const fileId = uuidv4(); // Use unique ID for each file

    try {
      const uploadedUrl = await uploadFile(file, fileId, storage);
      setFileUrl(uploadedUrl); // Set the uploaded file URL
      console.log("File uploaded successfully, URL:", uploadedUrl);

      // Set expiration time logic (in minutes or hours)
      const expirationInMillis =
        timeUnit === "minutes"
          ? expirationTime * 60 * 1000
          : expirationTime * 60 * 60 * 1000;
      const expirationTimeStamp = Date.now() + expirationInMillis;

      // Store the file info with expiration time
      await storeFileInfo(fileId, uploadedUrl, expirationTimeStamp);

      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("File upload failed.");
    }

    setUploading(false);
  };

  // Function to copy the file URL to clipboard
  const handleCopyLink = () => {
    if (fileUrl) {
      navigator.clipboard.writeText(fileUrl)
        .then(() => {
          alert("Link copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy link: ", err);
          alert("Failed to copy link.");
        });
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <div>
        <label>Expiration Time:</label>
        <input
          type="number"
          value={expirationTime}
          onChange={handleExpirationChange}
          min="1"
          max="1440" // Max 24 hours (1440 minutes)
        />
        <select value={timeUnit} onChange={handleTimeUnitChange}>
          <option value="minutes">Minutes</option>
          <option value="hours">Hours</option>
        </select>
      </div>

      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {/* Conditionally render the Copy Link button only when the file has been uploaded successfully */}
      {fileUrl && (
        <div>
          <p>File uploaded successfully!</p>
          <button onClick={handleCopyLink}>
            Copy Link
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
