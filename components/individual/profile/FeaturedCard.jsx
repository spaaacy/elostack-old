// components/Featured.tsx
import React, { useState } from "react";

const Featured = () => {
  const [items, setItems] = useState([
    { type: "", isLink: false },
    { type: "", isLink: false },
    { type: "", isLink: true },
    { type: "", isLink: true },

    // Initially empty slot for adding new files
  ]);

  // Function to handle file or link upload based on type
  const handleUpload = (index) => {
    const item = items[index];
    if (item.isLink) {
      const url = prompt(`Please enter the URL for your ${item.type}`);
      // Validate the URL and then save it to your state or backend
      const newItems = [...items];
      newItems[index] = { ...item, content: url };
      setItems(newItems);
    } else {
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = ".pdf,image/*";
      fileInput.onchange = async (e) => {
        const file = e.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            // Here you can handle the file upload to your state or backend
            const newItems = [...items];
            newItems[index] = { ...item, content: reader.result };
            setItems(newItems);
          };
          reader.readAsDataURL(file);
        }
      };
      fileInput.click();
    }
  };

  // Function to handle item deletion
  const handleDelete = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  // Function to add a new item
  const handleAdd = () => {
    const newItem = { type: `Item ${items.length + 1}`, isLink: false };
    setItems([...items, newItem]);
  };
  const isImageFile = (content) => {
    return content.startsWith("data:image");
  };

  return (
    <div className="border-gray-200 rounded-xl ml-0 mr-0 border-2 h-[18.5rem]">
      <div className="flex flex-wrap gap-4 justify-start pl-4 pt-6 pb-0">
        {items.map((item, index) => (
          <div key={index} className="w-72">
            <div
              className="border-2 border-gray-300 rounded-lg h-60 flex justify-center items-center cursor-pointer hover:border-gray-400 relative overflow-hidden"
              onClick={() => handleUpload(index)}
            >
              {item.content ? (
                isImageFile(item.content) ? (
                  <img src={item.content} alt={`Preview of ${item.type}`} className="max-w-full max-h-full" />
                ) : (
                  <div className="text-center p-4">
                    <p className="text-gray-700">File uploaded</p>
                  </div>
                )
              ) : (
                <div className="text-center">
                  <div className="text-4xl text-gray-700">+</div>
                  <p className="text-gray-700">{item.type}</p>
                </div>
              )}
            </div>
            {item.content && (
              <button className="mt-2 text-red-500 hover:text-red-700 text-sm" onClick={() => handleDelete(index)}>
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
