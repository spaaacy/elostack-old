"use client";

import NavBar from "@/components/common/NavBar";
import Footer from "@/components/common/Footer";
import Head from "next/head";
import { useEffect, useState } from "react";

const mockCompanies = [
  { id: 1, name: "Company 1", state: "State 1", city: "City 1", logo: "/logo.png" },
  { id: 2, name: "Company 2", state: "State 2", city: "City 2", logo: "/logo.png" },
  { id: 3, name: "Company 3", state: "State 1", city: "City 3", logo: "/logo.png" },
  // Add more mock companies as needed
];

const mockStates = ["State 1", "State 2"];
const mockCities = ["City 1", "City 2", "City 3"];

const Page = () => {
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

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  
  useEffect(() => {
    setCompanies(mockCompanies);
    setStates(mockStates);
    setCities(mockCities);
  }, []);
  const renderEmailPreview = () => {
    return (
      <div className="bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gray-700 p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold">{template.subject}</h2>
            <div className="flex items-center space-x-2">
              <button className="bg-purple-600 hover:bg-purple-700 text-white rounded-md px-3 py-1 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                Reply
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 text-white rounded-md px-3 py-1 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                Forward
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <span>To: Recipient &lt;recipient@example.com&gt;</span>
            <span className="border-l border-gray-500 pl-2">
              From: Sender &lt;sender@example.com&gt;
            </span>
          </div>
        </div>
        <div className="p-4 bg-gray-900" dangerouslySetInnerHTML={{ __html: template.content }}></div>
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
    // Simulate sending emails
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

  return (
    <main className="flex flex-col min-h-screen text-white w-full bg-gradient-to-b from-[#0f0f1c] via-[#1b1b29] to-[#251b30]">
      <NavBar />
      <Head>
        <title>Email Service</title>
      </Head>
      <main className="container mx-auto p-8 bg-[#1b1b29] rounded-lg shadow mt-16">
        <section className="p-5 border-b border-gray-700">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Email Service</h2>
          </div>
        </section>
        <div className="flex justify-center items-center bg-[#1b1b29] text-black p-6 rounded-lg mt-8">
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-8">
            {/* State Filter */}
            <div className="flex items-center space-x-2">
              <label htmlFor="state" className="text-white font-semibold">State:</label>
              <select
                id="state"
                value={filters.state}
                onChange={(e) => handleFilterChange(e, "state")}
                className="p-2 border rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">All States</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            {/* City Filter */}
            <div className="flex items-center space-x-2">
              <label htmlFor="city" className="text-white font-semibold">City:</label>
              <select
                id="city"
                value={filters.city}
                onChange={(e) => handleFilterChange(e, "city")}
                className="p-2 border rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">All Cities</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Company Filter */}
            <div className="flex items-center space-x-2">
              <label htmlFor="company" className="text-white font-semibold">Company:</label>
              <input
                id="company"
                value={filters.company}
                onChange={(e) => handleFilterChange(e, "company")}
                className="p-2 border rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 "
                type="text"
              />
            </div>
          </div>
        </div>
        <section className="p-8 rounded-lg shadow-lg bg-[#1b1b29] mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCompanies.map((company) => (
              <label
                key={company.id}
                className="flex items-center space-x-4 bg-gray-700 p-4 rounded-lg hover:shadow-lg transition-shadow duration-300 focus:ring-purple-500 "
              >
                <input
                  type="checkbox"
                  checked={selectedCompanies.includes(company.id)}
                  onChange={() => handleCompanySelect(company.id)}
                  className="form-checkbox h-5 w-5 text-purple-500"
                />
                <img src={company.logo} alt={company.name} className="h-10 w-10 rounded-full" />
                <div>
                  <h3 className="font-semibold text-xl text-white">{company.name}</h3>
                  <p className="text-sm text-gray-400">{company.state}, {company.city}</p>
                </div>
              </label>
            ))}
          </div>
        </section>
        {selectedCompanies.length > 0 && (
          <section className="p-8 rounded-lg shadow-lg bg-[#1b1b29] mt-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
              <h3 className="font-semibold text-2xl text-white mb-4 md:mb-0">Selected Companies</h3>
              <div className="flex items-center space-x-4">
                <span className="text-white text-lg">Emails per Company:</span>
                <input
                  type="number"
                  value={emailCount}
                  onChange={(e) => setEmailCount(parseInt(e.target.value))}
                  className="p-2 border rounded-lg bg-gray-700 text-white w-24 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  min={1}
                />
                <span className="text-white text-lg">
                  Total Emails: {emailCount * selectedCompanies.length}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {selectedCompanies.map((companyId) => {
                const company = companies.find((c) => c.id === companyId);
                return (
                  <div key={companyId} className="flex items-center space-x-4">
                    <img src={company.logo} alt={company.name} className="h-10 w-10 rounded-full" />
                    <span className="text-white text-lg">{company.name}</span>
                  </div>
                );
              })}
            </div>
          </section>
        )}
        <section className="p-8 rounded-lg shadow-lg bg-[#1b1b29] mt-8">
        <div className="mb-6 flex justify-between items-center">
          <h3 className="font-semibold text-2xl text-white">Email Template</h3>
          <button
            onClick={togglePreview}
            className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-300"
          >
            {showPreview ? "Hide Preview" : "Show Preview"}
          </button>
        </div>
        <div className="mb-4">
          <label htmlFor="templateSubject" className="block text-white text-lg font-semibold mb-2">Template Subject:</label>
          <input
            id="templateSubject"
            value={template.subject}
            onChange={(e) => handleTemplateChange(e, "subject")}
            className="p-3 border rounded-lg bg-gray-700 text-white w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            type="text"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="templateContent" className="block text-white text-lg font-semibold mb-2">Template Content:</label>
          <textarea
            id="templateContent"
            value={template.content}
            onChange={(e) => handleTemplateChange(e, "content")}
            className="w-full h-48 p-4 border rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          ></textarea>
        </div>
        {showPreview && (
          <div className="mt-8">
            <h4 className="font-semibold text-xl text-white mb-4">Email Preview:</h4>
            {renderEmailPreview()}
          </div>
        )}
      </section>
        
        <section className="p-8 rounded-lg shadow-lg bg-[#1b1b29] mt-8">
          <div className="mb-6">
            <h3 className="font-semibold text-2xl text-white">Cover Letter</h3>
          </div>
          <div className="mb-4">
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              className="w-full h-48 p-4 border rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
          </div>
        </section>
        <div className="flex justify-end mt-8">
          <button
            onClick={handleSubmit}
            className="ml-auto px-6 py-3 bg-purple-600 text-white text-lg font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-300"
          >
            Send Emails
          </button>
        </div>
      </main>
      <Footer />
    </main>
  );
};

export default Page;