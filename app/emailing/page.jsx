"use client";
import NavBar from "@/components/common/NavBar";
import Footer from "@/components/common/Footer";
import Head from "next/head";
import { Suspense, useContext, useEffect, useState } from "react";
import { FaSearch, FaFilter, FaPaperPlane, FaTrash, FaEye, FaEyeSlash, FaPlus } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import { UserContext } from "@/context/UserContext";
import Loader from "@/components/common/Loader";
import toast, { Toaster } from "react-hot-toast";

const mockStates = ["Florida", "State 2"];
const mockCities = ["Saint Petersburg", "City 2", "City 3"];

import React from "react";

const Page = () => {
  return (
    <div className="flex flex-col min-h-screen text-white w-full  ">
      <NavBar />
      <Head>
        <title>Email Service</title>
      </Head>
      <Suspense>
        <Emailing />
      </Suspense>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Page;

const Emailing = () => {
  const searchParams = useSearchParams();
  const [matchesFound, setMatchesFound] = useState();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { session } = useContext(UserContext);
  const [companies, setCompanies] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [template, setTemplate] = useState({
    subject: "",
    body: "",
  });
  const [loaded, setLoaded] = useState(false);
  const [companySearch, setCompanySearch] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [stateInput, setStateInput] = useState("");
  const [cityInput, setCityInput] = useState({ city: "", state: "" });
  const [selectedStates, setSelectedStates] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      if (session?.data?.session) {
        await fetchCompanies();
        setLoading(false);
      } else {
        router.push("/signin");
      }
    };

    if (session) {
      if (!loaded) {
        if (searchParams.has("success")) {
          toast.success("Purchase made successfully!");
        } else if (searchParams.has("cancelled")) {
          toast.error("Something went wrong...");
        }
        loadData();
        setLoaded(true);
      }
      fetchMatches();
    }
  }, [session, selectedCompanies, selectedStates, selectedCities]);

  const fetchCompanies = async () => {
    const response = await fetch("/api/receiver/list-companies", {
      method: "POST",
    });
    if (response.status === 200) {
      const results = await response.json();
      setCompanies(results.companyNames);
    }
  };

  const fetchMatches = async () => {
    const response = await fetch("/api/receiver/count-match", {
      method: "POST",
      body: JSON.stringify({
        companies: selectedCompanies,
        states: selectedStates,
        cities: selectedCities,
      }),
    });
    if (response.status === 200) {
      const results = await response.json();
      setMatchesFound(results.count);
    }
  };

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
        <div className="p-4 text-white" dangerouslySetInnerHTML={{ __html: template.body }}></div>
      </div>
    );
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

  const handleSubmit = async () => {
    const userId = session.data.session.user.id;
    if (userId && template.subject && template.body) {
      const response = await fetch("/api/subscriber/create", {
        method: "POST",
        headers: {
          "X-Supabase-Auth": session.data.session.access_token + " " + session.data.session.refresh_token,
        },
        body: JSON.stringify({
          user_id: userId,
          email_body: template.body,
          email_subject: template.subject,
          active: false,
          // options: { companies: selectedCompanies.length > 0 ? selectedCompanies : [], cities: [], states: [] },
          options: { companies: selectedCompanies.length > 0 ? [] : [], cities: [], states: [] },
        }),
      });
      if (response.status === 201) {
        toast.success("Preferences saved!");
      } else {
        toast.error("Something went wrong...");
      }
    } else {
      toast.error("Subject/body cannot be left blank!");
    }
  };

  let filteredCompanies = [];
  if (companies) {
    filteredCompanies = companies.filter((company) =>
      companySearch ? company.toLowerCase().includes(companySearch.toLowerCase()) : true
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
    <main className="container mx-auto p-8">
      <section className="text-center mt-2 mb-10">
        <h2 className="text-3xl font-bold text-white">Preferences</h2>
      </section>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-[126rem]">
        <div className="lg:col-span-2">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 w-full">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold mb-4 text-purple-400">Companies</h3>
              {matchesFound !== null && matchesFound !== undefined && matchesFound !== "" && (
                <p className="font-semibold text-lg">{`${matchesFound} leads found`}</p>
              )}
            </div>
            <div className="relative my-4">
              <input
                id="company"
                value={companySearch}
                onChange={(e) => setCompanySearch(e.target.value)}
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
                    key={company}
                    className="flex items-center bg-gray-700 p-4 rounded-lg shadow-md cursor-pointer transition-colors duration-300 hover:bg-gray-600"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCompanies.includes(company)}
                      onChange={() => handleCompanySelect(company)}
                      className="capitalize mr-4 h-5 w-5 text-purple-500 focus:ring-purple-500 rounded"
                    />
                    <div>
                      <h4 className="capitalize text-lg font-semibold">{company}</h4>
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
                  const company = companies.find((c) => c === companyName);
                  return (
                    <div key={companyName} className="flex items-center">
                      <span className="text-lg capitalize">{company}</span>
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
            <h3 className="text-2xl font-bold mb-2 flex items-center text-purple-400">Locations</h3>
            <div className="flex gap-2 justify-start" onSubmit={() => {}}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSelectedStates([...selectedStates, stateInput]);
                }}
                className="flex flex-col items-start justify-center w-1/2"
              >
                <label className="text-lg font-semibold">State: </label>
                <div className="flex gap-2 justify-start">
                  <input
                    onChange={(e) => setStateInput(e.target.value)}
                    value={stateInput}
                    placeholder="(e.g., California, Florida, New York)"
                    className="flex-1 p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button type="submit" className="bg-purple-600 hover:bg-purple-700 rounded-lg px-4 py-2 ">
                    <FaPlus />
                  </button>
                </div>
              </form>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSelectedCities([...selectedCities, cityInput]);
                }}
                className="flex flex-col items-start justify-center w-1/2"
              >
                <label className="text-lg font-semibold">City: </label>
                <div className="flex gap-2 justify-start">
                  <input
                    onChange={(e) => setCityInput({ ...cityInput, city: e.target.value })}
                    value={cityInput.city}
                    placeholder="City (e.g., Miami)"
                    className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />

                  <input
                    onChange={(e) => setCityInput({ ...cityInput, state: e.target.value })}
                    value={cityInput.state}
                    placeholder="State (e.g., Florida)"
                    className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button type="submit" className="bg-purple-600 hover:bg-purple-700 rounded-lg px-4 py-2 ">
                    <FaPlus />
                  </button>
                </div>
              </form>
            </div>
            {selectedStates.length > 0 && (
              <section className="mt-8 w-full">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-purple-400">Selected States</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {selectedStates.map((state) => {
                    return (
                      <div key={state} className="flex items-center">
                        <span className="text-lg capitalize">{state}</span>
                        <button
                          onClick={() => setSelectedStates(selectedStates.filter((state) => state !== deletedState))}
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
            {selectedCities.length > 0 && (
              <section className="mt-8 w-full">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-purple-400">Selected Cities</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {selectedCities.map((city) => {
                    return (
                      <div key={city} className="flex items-center">
                        <span className="text-lg capitalize">{city.city + ", " + city.state}</span>
                        <button
                          onClick={() => setSelectedCities(selectedCities.filter((city) => city !== deletedCity))}
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
              <label htmlFor="templateBody" className="block text-lg font-semibold mb-1">
                Body:
              </label>
              <textarea
                id="templateBody"
                value={template.body}
                onChange={(e) => handleTemplateChange(e, "body")}
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
  );
};

const mockCompanies = [
  // TODO: Logo must be a url
  { name: "TECfusions", logo: "/logo.png" },
  { name: "company 1", logo: "/logo.png" },
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
  { name: "company 16", logo: "/logo.png" },
  { name: "company 17", logo: "/logo.png" },
  { name: "company 18", logo: "/logo.png" },
  { name: "company 19", logo: "/logo.png" },
  { name: "company 20", logo: "/logo.png" },
  { name: "company 21", logo: "/logo.png" },
  { name: "company 22", logo: "/logo.png" },
  { name: "company 23", logo: "/logo.png" },
  { name: "company 24", logo: "/logo.png" },
  { name: "company 25", logo: "/logo.png" },
  { name: "company 26", logo: "/logo.png" },
  { name: "company 27", logo: "/logo.png" },
  { name: "company 28", logo: "/logo.png" },
  { name: "company 29", logo: "/logo.png" },
  { name: "company 30", logo: "/logo.png" },
  { name: "company 31", logo: "/logo.png" },
  { name: "company 32", logo: "/logo.png" },
  { name: "company 33", logo: "/logo.png" },
  { name: "company 34", logo: "/logo.png" },
  { name: "company 35", logo: "/logo.png" },
  { name: "company 36", logo: "/logo.png" },
  { name: "company 37", logo: "/logo.png" },
  { name: "company 38", logo: "/logo.png" },
  { name: "company 39", logo: "/logo.png" },
  { name: "company 40", logo: "/logo.png" },
  { name: "company 41", logo: "/logo.png" },
  { name: "company 42", logo: "/logo.png" },
  { name: "company 43", logo: "/logo.png" },
  { name: "company 44", logo: "/logo.png" },
  { name: "company 45", logo: "/logo.png" },
  { name: "company 46", logo: "/logo.png" },
  { name: "company 47", logo: "/logo.png" },
  { name: "company 48", logo: "/logo.png" },
  { name: "company 49", logo: "/logo.png" },
  { name: "company 50", logo: "/logo.png" },
  { name: "company 51", logo: "/logo.png" },
  { name: "company 52", logo: "/logo.png" },
  { name: "company 53", logo: "/logo.png" },
  { name: "company 54", logo: "/logo.png" },
  { name: "company 55", logo: "/logo.png" },
  { name: "company 56", logo: "/logo.png" },
  { name: "company 57", logo: "/logo.png" },
  { name: "company 58", logo: "/logo.png" },
  { name: "company 59", logo: "/logo.png" },
  { name: "company 60", logo: "/logo.png" },
  { name: "company 61", logo: "/logo.png" },
  { name: "company 62", logo: "/logo.png" },
  { name: "company 63", logo: "/logo.png" },
  { name: "company 64", logo: "/logo.png" },
  { name: "company 65", logo: "/logo.png" },
  { name: "company 66", logo: "/logo.png" },
  { name: "company 67", logo: "/logo.png" },
  { name: "company 68", logo: "/logo.png" },
  { name: "company 69", logo: "/logo.png" },
  { name: "company 70", logo: "/logo.png" },
  { name: "company 71", logo: "/logo.png" },
  { name: "company 72", logo: "/logo.png" },
  { name: "company 73", logo: "/logo.png" },
  { name: "company 74", logo: "/logo.png" },
  { name: "company 75", logo: "/logo.png" },
  { name: "company 76", logo: "/logo.png" },
  { name: "company 77", logo: "/logo.png" },
  { name: "company 78", logo: "/logo.png" },
  { name: "company 79", logo: "/logo.png" },
  { name: "company 80", logo: "/logo.png" },
  { name: "company 81", logo: "/logo.png" },
  { name: "company 82", logo: "/logo.png" },
  { name: "company 83", logo: "/logo.png" },
  { name: "company 84", logo: "/logo.png" },
  { name: "company 85", logo: "/logo.png" },
  { name: "company 86", logo: "/logo.png" },
  { name: "company 87", logo: "/logo.png" },
  { name: "company 88", logo: "/logo.png" },
  { name: "company 89", logo: "/logo.png" },
  { name: "company 90", logo: "/logo.png" },
  { name: "company 91", logo: "/logo.png" },
  { name: "company 92", logo: "/logo.png" },
  { name: "company 93", logo: "/logo.png" },
  { name: "company 94", logo: "/logo.png" },
  { name: "company 95", logo: "/logo.png" },
  { name: "company 96", logo: "/logo.png" },
  { name: "company 97", logo: "/logo.png" },
  { name: "company 98", logo: "/logo.png" },
  { name: "company 99", logo: "/logo.png" },
  { name: "company 100", logo: "/logo.png" },
];
