"use client";
import React from "react";
import { Link } from "react-router-dom";
import EditProfileButton from "./EditProfileButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import waveBg from "@/public/wave.svg";
import {
  faLinkedin,
  faTwitter,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
const BusinessProfilePage = () => {
  const businessData = {
    name: "Business Name",
    industry: "Industry",
    website: "www.example.com",
    address: "123 Main St",
    country: "Country",
    postalCode: "12345",
    city: "City",
    description: "This is a brief description about the business...",
    size: "1-10 employees",
    founded: "2000",
    email: "business@example.com",
    phone: "123-456-7890",
    services: ["Service 1", "Service 2", "Service 3"],
    reviews: [
      { name: "User 1", review: "This is a review..." },
      { name: "User 2", review: "This is another review..." },
    ],
    posts: [
      { title: "Post 1", content: "This is a post..." },
      { title: "Post 2", content: "This is another post..." },
    ],
    socialMedia: {
      linkedin: "https://linkedin.com/in/company",
      twitter: "https://twitter.com/company",
      facebook: "https://facebook.com/company",
      instagram: "https://instagram.com/company",
    },
  };

  return (
    <div
      className="flex flex-col flex-1 bg-gray-100 h-auto pb-20 bg-no-repeat bg-fixed bg-bottom"
      style={{ backgroundImage: `url(${waveBg})`, zIndex: 1 }}
    >
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
                    <div className="mt-1 flex flex-col sm:mt-0">
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        Industry: {businessData.industry}
                      </div>
                    </div>
                  </div>
                  <EditProfileButton />
                </div>
              </div>
            </div>
            <div className="px-4 py-5 sm:p-6 border-t border-gray-200 mt-6">
              <h3 className="text-lg leading-6 font-semibold text-blueprimary">
                About
              </h3>
              <p className="mt-2 text-sm text-gray-900">{businessData.about}</p>
            </div>
            <div className="px-4 py-5 sm:p-6 border-t border-gray-200">
              <h3 className="text-lg leading-6 font-semibold text-blueprimary">
                Company Information
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
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Size</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {businessData.size}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Founded</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {businessData.founded}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Social Media
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 space-x-4">
                    <a
                      href={businessData.socialMedia.linkedin}
                      className="transition-transform duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                    >
                      <FontAwesomeIcon
                        icon={faLinkedin}
                        size="2x"
                        color="#0e76a8"
                      />
                    </a>
                    <a
                      href={businessData.socialMedia.twitter}
                      className="transition-transform duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                    >
                      <FontAwesomeIcon
                        icon={faTwitter}
                        size="2x"
                        color="#1DA1F2"
                      />
                    </a>
                    <a
                      href={businessData.socialMedia.facebook}
                      className="transition-transform duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                    >
                      <FontAwesomeIcon
                        icon={faFacebook}
                        size="2x"
                        color="#4267B2"
                      />
                    </a>
                    <a
                      href={businessData.socialMedia.instagram}
                      className="transition-transform duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                    >
                      <FontAwesomeIcon
                        icon={faInstagram}
                        size="2x"
                        color="#C13584"
                      />
                    </a>
                  </dd>
                </div>

                <div className="sm:col-span-1">
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
              <h3 className="text-lg leading-6 font-semibold  text-blueprimary">
                Location
              </h3>
              <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Country</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {businessData.country}
                  </dd>
                </div>

                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">City</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {businessData.city}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Address</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {businessData.address}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Postal Code
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {businessData.postalCode}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="px-4 py-5 sm:p-6 border-t border-gray-200">
              <h3 className="text-lg leading-6 font-semibold text-blueprimary">
                Recent Job Listings
              </h3>
              <div className="space-y-6">
                {businessData.posts.map((post, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-6 rounded-lg flex justify-between items-center hover:shadow-xl transition-shadow duration-300"
                  >
                    <div>
                      <h4 className="font-medium text-lg">{post.title}</h4>
                      <p className="text-sm text-gray-600">{post.content}</p>
                    </div>
                    <button className="text-blue-600 hover:underline">
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BusinessProfilePage;
