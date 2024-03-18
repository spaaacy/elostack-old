import React, { useState } from 'react';

const MediaSection = () => {
  const [mediaItems, setMediaItems] = useState([
    { id: 1, title: 'Portfolio', url: null },
    { id: 2, title: 'Resume', url: null },
    { id: 3, title: 'Certificate', url: null },
  ]);

  const handleUpload = (id, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setMediaItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id ? { ...item, url: reader.result } : item
          )
        );
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
        setMediaItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id ? { ...item, url: reader.result } : item
          )
        );
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Media</h2>
      <div className="flex flex-wrap -mx-2">
        {mediaItems.map((item) => (
          <div
            key={item.id}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4"
            onDragOver={handleDragOver}
            onDrop={(event) => handleDrop(item.id, event)}
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                {item.url ? (
                  <img src={item.url} alt={item.title} className="w-full mb-2" />
                ) : (
                  <div
                    className="flex justify-center items-center h-48 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer"
                    onClick={() => {
                      const fileInput = document.createElement('input');
                      fileInput.type = 'file';
                      fileInput.onchange = (event) => handleUpload(item.id, event);
                      fileInput.click();
                    }}
                  >
                    <span className="text-gray-500">Click to upload or drag and drop</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaSection;

