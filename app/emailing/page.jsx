"use client";
import NavBar from "@/components/common/NavBar";
import Footer from "@/components/common/Footer";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { FaSearch, FaFilter, FaPaperPlane, FaTrash, FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";
import Loader from "@/components/common/Loader";

const mockCompanies = [
  { name: "company 1", logo: "/logo.png" }, // TODO: Logo must be a url
  { name: "company 2", logo: "/logo.png" },
  { name: "company 3", logo: "/logo.png" },
  { name: "company 4", logo: "/logo.png" },
  { name: "company 5", logo: "/logo.png" },
  { name: "company 6", logo: "/logo.png" },
  { name: "company 7", logo: "/logo.png" },
  { name: "company 8", logo: "/logo.png" },
  { name: "company 9", logo: "/logo.png" },
  { name: "company 10", logo: "/logo.png" },
  { name: "company 11", logo: "/logo.png" },
  { name: "company 12", logo: "/logo.png" },
  { name: "company 13", logo: "/logo.png" },
  { name: "company 14", logo: "/logo.png" },
  { name: "company 15", logo: "/logo.png" },
];

const mockStates = ["State 1", "State 2"];
const mockCities = ["City 1", "City 2", "City 3"];

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { session } = useContext(UserContext);
  const [companies, setCompanies] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [template, setTemplate] = useState({
    subject: "",
    content: "",
  });
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [filters, setFilters] = useState({
    state: "",
    city: "",
    company: "",
  });
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (session?.data?.session) {
        setCompanies(mockCompanies);
        setStates(mockStates);
        setCities(mockCities);
        setLoading(false);
      } else {
        router.push("/signin");
      }
    };

    if (session) {
      loadData();
    }
  }, [session]);

  const renderEmailPreview = () => {
    return (
      <div className="bg-gray-600 rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gray-700 p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold text-white">{template.subject}</h2>
            <div className="flex items-center space-x-2">
              <button className="bg-white text-purple-600 rounded-md px-3 py-1 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                Reply
              </button>
              <button className="bg-white text-purple-600 rounded-md px-3 py-1 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                Forward
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-200">
            <span>To: Recipient &lt;recipient@example.com&gt;</span>
            <span className="border-l border-gray-400 pl-2">From: Sender &lt;sender@example.com&gt;</span>
          </div>
        </div>
        <div className="p-4 text-white" dangerouslySetInnerHTML={{ __html: template.content }}></div>
      </div>
    );
  };

  const handleFilterChange = (e, filterName) => {
    setFilters({ ...filters, [filterName]: e.target.value });
  };

  const handleCompanySelect = (name) => {
    if (selectedCompanies.includes(name)) {
      setSelectedCompanies(selectedCompanies.filter((selectedName) => selectedName !== name));
    } else {
      setSelectedCompanies([...selectedCompanies, name]);
    }
  };

  const handleTemplateChange = (e, field) => {
    setTemplate({ ...template, [field]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Selected Companies:", selectedCompanies);
    console.log("Template:", template);
    alert("Emails sent successfully!");
  };

  let filteredCompanies = [];
  if (companies) {
    filteredCompanies = companies.filter((company) =>
      filters.company ? company.name.toLowerCase().includes(filters.company.toLowerCase()) : true
    );
  }

  if (loading)
    return (
      <>
        <NavBar />
        <Loader />
      </>
    );

  return (
    <main className="flex flex-col min-h-screen text-white w-full  ">
      <NavBar />
      <Head>
        <title>Email Service</title>
      </Head>
      <main className="container mx-auto p-8">
        <section className="text-center mt-2 mb-10">
          <h2 className="text-3xl font-bold text-white">Preferences</h2>
        </section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-[126rem]">
          <div className="lg:col-span-2">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 w-full">
              <h3 className="text-2xl font-bold mb-4 text-purple-400">Companies</h3>
              <div className="relative my-4">
                <input
                  id="company"
                  value={filters.company}
                  onChange={(e) => handleFilterChange(e, "company")}
                  className="w-full p-2 bg-gray-700 text-white rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  type="text"
                  placeholder="Search companies..."
                />
                <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-purple-400" />
              </div>
              <div className="max-h-96 overflow-auto">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {filteredCompanies.map((company) => (
                    <label
                      key={company.name}
                      className="flex items-center bg-gray-700 p-4 rounded-lg shadow-md cursor-pointer transition-colors duration-300 hover:bg-gray-600"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCompanies.includes(company.name)}
                        onChange={() => handleCompanySelect(company.name)}
                        className="capitalize mr-4 h-5 w-5 text-purple-500 focus:ring-purple-500 rounded"
                      />
                      <img src={company.logo} alt={company.name} className="h-10 w-10 rounded-full mr-4" />
                      <div>
                        <h4 className="capitalize text-lg font-semibold">{company.name}</h4>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            {selectedCompanies.length > 0 && (
              <section className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 w-full">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-purple-400">Selected Companies</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {selectedCompanies.map((companyName) => {
                    const company = companies.find((c) => c.name === companyName);
                    return (
                      <div key={companyName} className="flex items-center">
                        <img src={company.logo} alt={company.name} className="h-10 w-10 rounded-full mr-4" />
                        <span className="text-lg">{company.name}</span>
                        <button
                          onClick={() => handleCompanySelect(companyName)}
                          className="ml-auto text-white font-semibold rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          <FaTrash color="#DC1C1C" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 w-full">
              <h3 className="text-2xl font-bold mb-4 flex items-center text-purple-400">Locations</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="state" className="block text-lg font-semibold mb-1">
                    State:
                  </label>
                  <select
                    id="state"
                    value={filters.state}
                    onChange={(e) => handleFilterChange(e, "state")}
                    className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">All States</option>
                    {states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="city" className="block text-lg font-semibold mb-1">
                    City:
                  </label>
                  <select
                    id="city"
                    value={filters.city}
                    onChange={(e) => handleFilterChange(e, "city")}
                    className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">All Cities</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <section className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 w-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-purple-400">Email Template</h3>
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-300 flex items-center"
                >
                  {showPreview ? (
                    <>
                      <FaEyeSlash className="mr-2" />
                      Hide Preview
                    </>
                  ) : (
                    <>
                      <FaEye className="mr-2" />
                      Show Preview
                    </>
                  )}
                </button>
              </div>
              <div className="mb-4">
                <label htmlFor="templateSubject" className="block text-lg font-semibold mb-1">
                  Subject:
                </label>
                <input
                  id="templateSubject"
                  value={template.subject}
                  onChange={(e) => handleTemplateChange(e, "subject")}
                  className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  type="text"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="templateContent" className="block text-lg font-semibold mb-1">
                  Content:
                </label>
                <textarea
                  id="templateContent"
                  value={template.content}
                  onChange={(e) => handleTemplateChange(e, "content")}
                  className="w-full h-48 p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                ></textarea>
              </div>
              {showPreview && (
                <div className="mt-8">
                  <h4 className="text-xl font-semibold mb-4 text-purple-400">Preview:</h4>
                  {renderEmailPreview()}
                </div>
              )}
            </section>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="px-6 py-3 ml-auto bg-purple-600 text-white text-lg font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-300 flex items-center"
        >
          Save
        </button>
      </main>
      <Footer />
    </main>
  );
};

export default Page;
