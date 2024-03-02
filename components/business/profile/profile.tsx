"use client";
import React from "react";
import { Link } from "react-router-dom";
import EditProfileButton from "./EditProfileButton";
const BusinessProfilePage = () => {
  const businessData = {
    name: "Business Name",
    location: "Business Location",
    email: "business@example.com",
    phone: "123-456-7890",
    website: "www.example.com",
    about: "This is a brief description about the business...",
    services: ["Service 1", "Service 2", "Service 3"],
    reviews: [
      { name: "User 1", review: "This is a review..." },
      { name: "User 2", review: "This is another review..." },
    ],
    posts: [
      { title: "Post 1", content: "This is a post..." },
      { title: "Post 2", content: "This is another post..." },
    ],
  };

  return (
    <main className="flex-1 bg-gray-100 p-5">
      <div className="container mx-auto">
        <div className="bg-white shadow rounded-lg mb-6 p-5">
          <div className="flex items-center space-x-5">
            <div className="flex-shrink-0">
              <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-xl font-medium uppercase">
                  {businessData.name[0]}
                </span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                    {businessData.name}
                  </h2>
                  <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      {businessData.location}
                    </div>
                  </div>
                </div>
                <EditProfileButton />
              </div>
            </div>
          </div>

          <div className="px-4 py-5 sm:p-6 border-t border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Contact Information
            </h3>
            <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {businessData.email}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {businessData.phone}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Website</dt>
                <dd className="mt-1 text-sm text-900">
                  <a
                    href={businessData.website}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    {businessData.website}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div className="px-4 py-5 sm:p-6 border-t border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              About
            </h3>
            <p className="mt-2 text-sm text-gray-900">{businessData.about}</p>
          </div>

          <div className="px-4 py-5 sm:p-6 border-t border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Services
            </h3>
            <ul className="mt-2 text-sm text-gray-900">
              {businessData.services.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
          </div>

          <div className="px-4 py-5 sm:p-6 border-t border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Reviews
            </h3>
            {businessData.reviews.map((review, index) => (
              <div key={index} className="mt-2 text-sm text-gray-900">
                <p>
                  <strong>{review.name}:</strong> {review.review}
                </p>
              </div>
            ))}
          </div>

          <div className="px-4 py-5 sm:p-6 border-t border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Posts
            </h3>
            {businessData.posts.map((post, index) => (
              <div key={index} className="mt-2 text-sm text-gray-900">
                <h4 className="font-medium">{post.title}</h4>
                <p>{post.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default BusinessProfilePage;
