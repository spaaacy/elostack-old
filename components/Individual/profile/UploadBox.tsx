// UploadBox.js
import React from 'react';

const UploadBox = ({ onUpload }) => {
  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      onUpload(files[0]); // Assuming single file upload, adjust as necessary
    }
  };

  return (
    <label className="flex flex-col items-center justify-center w-full h-32 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300">
      <div className="text-4xl">+</div>
      <input type="file" className="hidden" onChange={handleFileChange} />
      <div>Upload</div>
    </label>
  );
};

export default UploadBox;
