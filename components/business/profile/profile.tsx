import React from 'react';

const BusinessProfilePage = () => {
  const businessData = {
    name: 'Business Name',
    location: 'Business Location',
    email: 'business@example.com',
    phone: '123-456-7890',
    website: 'www.example.com',
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
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                {businessData.name}
              </h2>
              <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  {businessData.location}
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Contact Information</h3>
            <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900">{businessData.email}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                <dd className="mt-1 text-sm text-gray-900">{businessData.phone}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Website</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <a href={businessData.website} className="text-blue-600 hover:text-blue-700">
                    {businessData.website}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BusinessProfilePage;