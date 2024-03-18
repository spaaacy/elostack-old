import React, { useState } from 'react';

const MediaSection = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [uploadModal, setUploadModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setMediaItems((prevItems) => [
          ...prevItems,
          { id: prevItems.length + 1, title: newTitle, url: reader.result },
        ]);
        setUploadModal(false);
        setNewTitle('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (id, event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setMediaItems((prevItems) => [
          ...prevItems.map((item) =>
            item.id === id ? { ...item, url: reader.result } : item
          ),
        ]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Media</h2>
      <div className="flex overflow-x-auto">
        {mediaItems.map((item) => (
          <div
            key={item.id}
            className="flex-shrink-0 w-80 mr-4 bg-[#0f0f1c] rounded-lg shadow-md overflow-hidden"
            onDragOver={handleDragOver}
            onDrop={(event) => handleDrop(item.id, event)}
          >
            <div className="p-4">
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              {item.url && (
                <img src={item.url} alt={item.title} className="w-full" />
              )}
            </div>
          </div>
        ))}
        <div
          className="flex-shrink-0 w-80 bg-[#0f0f1c] rounded-lg shadow-md overflow-hidden flex items-center justify-center cursor-pointer"
          onClick={() => setUploadModal(true)}
        >
          <span className="text-gray-500 text-4xl">+</span>
        </div>
      </div>

      {uploadModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={() => setUploadModal(false)}
            >
              <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
            </div>
            <div className="bg-gray-900 rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full z-20">
              <div className="bg-gray-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium text-white mb-4">Add Media</h3>
                <div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 mb-4 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Enter title"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-flex items-center px-4 py-2 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <span>Select File</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleUpload}
                    />
                  </label>
                </div>
              </div>
              <div className="bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setUploadModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaSection;