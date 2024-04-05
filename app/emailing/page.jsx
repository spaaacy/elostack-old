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
  { id: 1, name: "Company 1", state: "State 1", city: "City 1", logo: "/logo.png" },
  { id: 2, name: "Company 2", state: "State 2", city: "City 2", logo: "/logo.png" },
  { id: 3, name: "Company 3", state: "State 1", city: "City 3", logo: "/logo.png" },
  { id: 4, name: "Company 1", state: "State 1", city: "City 1", logo: "/logo.png" },
  { id: 5, name: "Company 2", state: "State 2", city: "City 2", logo: "/logo.png" },
  { id: 6, name: "Company 3", state: "State 1", city: "City 3", logo: "/logo.png" },
  { id: 7, name: "Company 1", state: "State 1", city: "City 1", logo: "/logo.png" },
  { id: 8, name: "Company 2", state: "State 2", city: "City 2", logo: "/logo.png" },
  { id: 9, name: "Company 3", state: "State 1", city: "City 3", logo: "/logo.png" },
  { id: 10, name: "Company 1", state: "State 1", city: "City 1", logo: "/logo.png" },
  { id: 11, name: "Company 2", state: "State 2", city: "City 2", logo: "/logo.png" },
  { id: 12, name: "Company 3", state: "State 1", city: "City 3", logo: "/logo.png" },
  { id: 13, name: "Company 1", state: "State 1", city: "City 1", logo: "/logo.png" },
  { id: 14, name: "Company 2", state: "State 2", city: "City 2", logo: "/logo.png" },
  { id: 15, name: "Company 3", state: "State 1", city: "City 3", logo: "/logo.png" },
];

const mockStates = ["State 1", "State 2"];
const mockCities = ["City 1", "City 2", "City 3"];

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { session } = useContext(UserContext);
  const [companies, setCompanies] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [emailCount, setEmailCount] = useState(1);
  const [template, setTemplate] = useState({
    subject: "",
    content: "",
  });
  const [coverLetter, setCoverLetter] = useState("");
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

  const handleCompanySelect = (companyId) => {
    if (selectedCompanies.includes(companyId)) {
      setSelectedCompanies(selectedCompanies.filter((id) => id !== companyId));
    } else {
      setSelectedCompanies([...selectedCompanies, companyId]);
    }
  };

  const handleTemplateChange = (e, field) => {
    setTemplate({ ...template, [field]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Selected Companies:", selectedCompanies);
    console.log("Email Count:", emailCount);
    console.log("Template:", template);
    console.log("Cover Letter:", coverLetter);
    alert("Emails sent successfully!");
  };

  let filteredCompanies = [];
  if (companies) {
    filteredCompanies = companies.filter(
      (company) =>
        (filters.state ? company.state === filters.state : true) &&
        (filters.city ? company.city === filters.city : true) &&
        (filters.company ? company.name.toLowerCase().includes(filters.company.toLowerCase()) : true)
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
          <h2 className="text-4xl font-bold text-white">Email Service</h2>
        </section>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 w-full">
          <h3 className="text-2xl font-bold mb-4 flex items-center text-purple-400">
            <FaFilter className="mr-2" />
            Filters
          </h3>
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
            <div>
              <label htmlFor="company" className="block text-lg font-semibold mb-1">
                Company:
              </label>
              <div className="relative">
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
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-[126rem]">
          <div className="lg:col-span-2">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 w-full">
              <h3 className="text-2xl font-bold mb-4 text-purple-400">Companies</h3>
              <div className="max-h-96 overflow-auto">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {filteredCompanies.map((company) => (
                    <label
                      key={company.id}
                      className="flex items-center bg-gray-700 p-4 rounded-lg shadow-md cursor-pointer transition-colors duration-300 hover:bg-gray-600"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCompanies.includes(company.id)}
                        onChange={() => handleCompanySelect(company.id)}
                        className="mr-4 h-5 w-5 text-purple-500 focus:ring-purple-500 rounded"
                      />
                      <img src={company.logo} alt={company.name} className="h-10 w-10 rounded-full mr-4" />
                      <div>
                        <h4 className="text-lg font-semibold">{company.name}</h4>
                        <p className="text-sm text-gray-400">
                          {company.state}, {company.city}
                        </p>
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
                  <div className="flex items-center space-x-4">
                    <span className="text-lg">Emails per Company:</span>
                    <input
                      type="number"
                      value={emailCount}
                      onChange={(e) => setEmailCount(parseInt(e.target.value))}
                      className="w-24 p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      min={1}
                    />
                    <span className="text-lg">Total Emails: {emailCount * selectedCompanies.length}</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {selectedCompanies.map((companyId) => {
                    const company = companies.find((c) => c.id === companyId);
                    return (
                      <div key={companyId} className="flex items-center">
                        <img src={company.logo} alt={company.name} className="h-10 w-10 rounded-full mr-4" />
                        <span className="text-lg">{company.name}</span>
                        <button
                          onClick={() => handleCompanySelect(companyId)}
                          className="ml-auto bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
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
            <section className="bg-gray-800 p-6 rounded-lg shadow-lg w-full">
              <h3 className="text-2xl font-bold mb-4 text-purple-400">Cover Letter</h3>
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                className="w-full h-48 p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              ></textarea>
            </section>
          </div>
        </div>
        <div className="mt-12 text-right">
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-purple-600 text-white text-lg font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-300 flex items-center"
          >
            <FaPaperPlane className="mr-2" />
            Send Emails
          </button>
        </div>
      </main>
      <Footer />
    </main>
  );
};

export default Page;
