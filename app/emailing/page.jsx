"use client";
import NavBar from "@/components/common/NavBar";
import Footer from "@/components/common/Footer";
import Head from "next/head";
import { Suspense, useContext, useEffect, useState } from "react";
import { FaSearch, FaFilter, FaPaperPlane, FaTrash, FaEye, FaEyeSlash, FaPlus, FaQuestionCircle } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import { UserContext } from "@/context/UserContext";
import Loader from "@/components/common/Loader";
import toast, { Toaster } from "react-hot-toast";

const mockStates = ["Florida", "State 2"];
const mockCities = ["Saint Petersburg", "City 2", "City 3"];

import React from "react";
import Link from "next/link";

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
  const [delayedCall, setDelayedCall] = useState();
  const [subscriber, setSubscriber] = useState();
  const [user, setUser] = useState();
  const [attachments, setAttachments] = useState([]);
  useEffect(() => {
    const loadData = async () => {
      if (session?.data?.session) {
        await fetchCompanies();
        await fetchSubscriber();
        await fetchUser();
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
  const handleAttachmentChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setAttachments([...attachments, ...selectedFiles]);
  };

  const handleAttachmentRemove = (index) => {
    const updatedAttachments = [...attachments];
    updatedAttachments.splice(index, 1);
    setAttachments(updatedAttachments);
  };
  const fetchMatches = () => {
    if (delayedCall) clearTimeout(delayedCall);
    setDelayedCall(
      setTimeout(async () => {
        console.log("Now fetching");
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
      }, 2000)
    );
  };

  const requestEmailPermissions = async () => {
    const userId = session.data.session?.user.id;
    if (!userId) return;
    const response = await fetch("/api/oauth/request-permission", {
      method: "POST",
      headers: {
        "X-Supabase-Auth": session.data.session.access_token + " " + session.data.session.refresh_token,
      },
    });
    if (response.status === 200) {
      const { url } = await response.json();
      router.push(url);
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

  const fetchSubscriber = async () => {
    const userId = session.data.session?.user.id;
    if (!userId) return;
    try {
      const response = await fetch(`/api/subscriber/${userId}`, {
        method: "GET",
        headers: {
          "X-Supabase-Auth": session.data.session.access_token + " " + session.data.session.refresh_token,
        },
      });
      if (response.status === 200) {
        const results = await response.json();
        setSubscriber(results.subscriber);
        setSelectedCompanies(results.subscriber.options.companies);
        setSelectedCities(results.subscriber.options.cities);
        setSelectedStates(results.subscriber.options.states);
        setTemplate({ body: results.subscriber.email_body, subject: results.subscriber.email_subject });
      }
    } catch (error) {
      console.error(error);
    }
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

  const fetchUser = async () => {
    const userId = session?.data?.session?.user.id;
    if (userId) {
      const response = await fetch(`/api/user/${userId}`, {
        method: "GET",
      });
      if (response.status === 200) {
        const results = await response.json();
        setUser(results.user);
      }
    }
  };

  const handleSubmit = async () => {
    const userId = session.data.session.user.id;
    if (userId && template.subject && template.body) {
      const response = await fetch(`/api/subscriber/${subscriber ? "update" : "create"}`, {
        method: "POST",
        headers: {
          "X-Supabase-Auth": session.data.session.access_token + " " + session.data.session.refresh_token,
        },
        body: JSON.stringify({
          user_id: userId,
          email_body: template.body,
          email_subject: template.subject,
          active: false,
          options: {
            companies: selectedCompanies.length > 0 ? selectedCompanies : [],
            cities: selectedCities.length > 0 ? selectedCities : [],
            states: selectedStates.length > 0 ? selectedStates : [],
          },
        }),
      });
      if (response.status === 201 || response.status === 200) {
        if (!subscriber || !subscriber.refresh_token) {
          requestEmailPermissions();
        }
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

  const toggleCampaignStatus = async () => {
    if (subscriber && !subscriber.active && (!subscriber.access_token || !subscriber.refresh_token)) {
      requestEmailPermissions();
    } else if (user && user.credits > 0 && subscriber) {
      const response = await fetch(`/api/subscriber/toggle-active`, {
        method: "POST",
        headers: {
          "X-Supabase-Auth": session.data.session.access_token + " " + session.data.session.refresh_token,
        },
        body: JSON.stringify({
          user_id: user.user_id,
          active: !subscriber.active,
        }),
      });
      if (response.status === 200) {
        window.location.reload();
      }
    }
  };

  if (loading)
    return (
      <>
        <NavBar />
        <Loader />
      </>
    );
    const HelpIcon = ({ text }) => {
      return (
        <div className="relative inline-block group ml-2">
          <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer">
            <span className="text-sm">i</span>
          </div>
          <div className="absolute left-1/2 bottom-full transform -translate-x-1/2 bg-gray-900 text-white text-base px-4 py-2 rounded opacity-0 pointer-events-none transition-opacity duration-200 group-hover:opacity-100 w-64 text-center">
            {text}
          </div>
        </div>
      );
    };
    return (
      <main className="container mx-auto p-8">
        <section className="text-center mt-2 mb-10">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-white">Preferences</h2>
            {subscriber && user.credits > 0 && (
              <button
                onClick={toggleCampaignStatus}
                className="px-6 py-3 bg-purple-600 text-white text-lg font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-300"
              >
                {subscriber.active ? "Pause Campaign" : "Start Campaign"}
              </button>
            )}
          </div>
        </section>
        <div className="flex flex-wrap gap-8">
        <div className="flex-grow">
  <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
    <div className="flex items-center mb-4">
      <h3 className="text-2xl font-bold text-purple-400 mr-0">Companies</h3>
      <HelpIcon text="Choose the companies to target in your email campaign. Filter by just the state or the city and state" />
      {matchesFound !== null && matchesFound !== undefined && matchesFound !== "" && (
        <p className="font-semibold text-lg ml-auto">{`${matchesFound} leads found`}</p>
      )}
    </div>
            <div className="mb-8 w-full">
  <div className="flex flex-wrap gap-4 justify-between">
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSelectedStates([...selectedStates, stateInput]);
        setStateInput("");
      }}
      className="flex flex-col items-start justify-center w-full sm:w-auto"
    >
      <label className="text-lg font-semibold">State: </label>
      <div className="flex gap-2 justify-start w-full sm:w-auto">
        <input
          onChange={(e) => setStateInput(e.target.value)}
          value={stateInput}
          placeholder="(e.g., California, Florida, New York)"
          className="flex-1 p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button type="submit" className="bg-purple-600 hover:bg-purple-700 rounded-lg px-4 py-2">
          <FaPlus />
        </button>
      </div>
    </form>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSelectedCities([...selectedCities, cityInput]);
        setCityInput({ city: "", state: "" });
      }}
      className="flex flex-col items-start justify-center w-full sm:w-auto sm:ml-4"
    >
      <label className="text-lg font-semibold">City: </label>
      <div className="flex flex-col sm:flex-row gap-2 justify-start w-full sm:w-auto">
        <input
          onChange={(e) => setCityInput({ ...cityInput, city: e.target.value })}
          value={cityInput.city}
          placeholder="City (e.g., Miami)"
          className="w-full sm:w-40 p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          onChange={(e) => setCityInput({ ...cityInput, state: e.target.value })}
          value={cityInput.state}
          placeholder="State (e.g., Florida)"
          className="w-full sm:w-40 p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button type="submit" className="bg-purple-600 hover:bg-purple-700 rounded-lg px-4 py-2">
          <FaPlus />
        </button>
      </div>
    </form>
  </div>
  {selectedStates.length > 0 && (
  <section className="mt-8">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-2xl font-bold text-purple-400">Selected States</h3>

    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {selectedStates.map((state) => (
        <div
          key={state}
          className="flex items-center justify-between bg-gray-700 rounded-lg px-4 py-2 shadow-md"
        >
          <span className="text-lg capitalize">{state}</span>
          <button
            onClick={() => setSelectedStates(selectedStates.filter((selectedState) => selectedState !== state))}
            className="text-red-500 hover:text-red-700 focus:outline-none"
          >
            <FaTrash />
          </button>
        </div>
      ))}
    </div>
  </section>
)}
{selectedCities.length > 0 && (
  <section className="mt-8">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-2xl font-bold text-purple-400">Selected Cities</h3>

    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {selectedCities.map((city) => (
        <div
          key={city.city}
          className="flex items-center justify-between bg-gray-700 rounded-lg px-4 py-2 shadow-md"
        >
          <span className="text-lg capitalize">{city.city + ", " + city.state}</span>
          <button
            onClick={() =>
              setSelectedCities(selectedCities.filter((selectedCity) => selectedCity.city !== city.city))
            }
            className="text-red-500 hover:text-red-700 focus:outline-none"
          >
            <FaTrash />
          </button>
        </div>
      ))}
    </div>
  </section>
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
                {filteredCompanies.map((company, i) => {
                  if (i < 100)
                    return (
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
                    );
                })}
              </div>
            </div>
            </div>
        {selectedCompanies.length > 0 && (
          <section className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
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
  <section className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <div className="flex items-center mb-6">
          <h3 className="text-2xl font-bold text-purple-400">Email Template</h3>
          <HelpIcon text="Customize the subject line and body of your email template. Optionally, attach files like your resume or cover letter." />
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-300 flex items-center ml-auto"
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
            rows={15}
            className="w-full h-48 p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          ></textarea>
        </div>
        <div className="mb-4">
          <div className="flex items-center">
            <label htmlFor="attachments" className="block text-lg font-semibold mb-1">
              Attachments:
            </label>
            
          </div>
  <div className="flex items-center space-x-4">
    <div
      className="flex items-center justify-center w-48 h-48 bg-gray-700 rounded-lg cursor-pointer"
      onClick={() => document.getElementById("attachmentInput").click()}
    >
      <FaPlus className="text-4xl text-purple-500" />
    </div>
    <input
      id="attachmentInput"
      type="file"
      multiple
      onChange={handleAttachmentChange}
      className="hidden"
    />
    {attachments.length > 0 && (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {attachments.map((attachment, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-gray-700 rounded-lg p-2"
          >
            <span className="text-sm truncate">{attachment.name}</span>
            <button
              onClick={() => handleAttachmentRemove(index)}
              className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
  {attachments.length === 0 && (
    <p className="mt-2 text-sm text-gray-400">
      Click the "+" icon to add attachments
    </p>
  )}

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
    {subscriber ||
      (user?.credits > 0 && (
        <button
          onClick={handleSubmit}
          className="ml-auto px-6 py-3 bg-purple-600 text-white text-lg font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-300 flex items-center"
        >
          Save Preferences
        </button>
      ))}
  </main>
);
};
