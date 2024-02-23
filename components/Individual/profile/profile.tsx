// pages/profile.tsx
import Head from "next/head";

const ProfilePage = () => {
  return (
    <>
      <Head>
        <title>User's Profile | LinkedIn</title>
      </Head>
      <div className="bg-gray-100 min-h-screen p-8">
        <div className="bg-white p-6 rounded-lg shadow max-w-2xl mx-auto">
          {/* Profile Header */}
          <div className="flex items-center space-x-4">
            <div className="h-24 w-24 bg-gray-300 rounded-full flex-shrink-0"></div>
            <div>
              <h2 className="text-xl font-bold">John Doe</h2>
              <p className="text-gray-600">Software Engineer at Tech Company</p>
              <p className="text-gray-600">City, Country</p>
            </div>
          </div>

          {/* About Section */}
          <div className="mt-6">
            <h3 className="font-bold text-lg">About</h3>
            <p className="text-gray-600 mt-2">
              Experienced Software Engineer with a demonstrated history of
              working in the industry. Skilled in Full Stack Development,
              DevOps, and Cloud Technologies.
            </p>
          </div>

          {/* Experience Section */}
          <div className="mt-6">
            <h3 className="font-bold text-lg">Experience</h3>
            <div className="mt-4">
              <h4 className="text-md font-bold">Software Engineer</h4>
              <p className="text-gray-600">Tech Company - City, Country</p>
              <p className="text-gray-600">June 2018 - Present</p>
              <ul className="list-disc list-inside text-gray-600 mt-2">
                <li>
                  Developed and maintained web applications using React and
                  Node.js.
                </li>
                <li>Implemented CI/CD pipelines for automated deployments.</li>
                {/* Add more experience points as needed */}
              </ul>
            </div>
          </div>

          {/* Education Section */}
          <div className="mt-6">
            <h3 className="font-bold text-lg">Education</h3>
            <div className="mt-4">
              <h4 className="text-md font-bold">
                Bachelor of Science in Computer Science
              </h4>
              <p className="text-gray-600">University Name - City, Country</p>
              <p className="text-gray-600">2014 - 2018</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
