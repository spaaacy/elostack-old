"use client";
import NavBar from "@/components/common/NavBar";
import Footer from "@/components/common/Footer";
import Head from "next/head";
import { Suspense, useContext, useEffect, useState } from "react";
import {
  FaSearch,
  FaFilter,
  FaPaperPlane,
  FaTrash,
  FaEye,
  FaEyeSlash,
  FaPlus,
  FaQuestionCircle,
  FaLinkedin,
  FaChevronDown,
} from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import { UserContext } from "@/context/UserContext";
import Loader from "@/components/common/Loader";
import toast, { Toaster } from "react-hot-toast";
import React from "react";
import Link from "next/link";

const Page = () => {
  return (
    <div className="flex flex-col min-h-screen text-white w-full">
      <Head>
        <title>Email Service</title>
      </Head>
      <NavBar />
      <Suspense>
        <Emailing />
      </Suspense>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Page;

const commonIndustries = [
  "Technology",
  "E-commerce",
  "Finance",
  "Healthcare",
  "Manufacturing",
  "Retail",
  "Education",
  "Media",
  "Real Estate",
  "Hospitality",
];

const Emailing = () => {
  const searchParams = useSearchParams();
  const [matchesFound, setMatchesFound] = useState();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const userContext = useContext(UserContext);
  const session = userContext?.session;
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [template, setTemplate] = useState({
    subject: "",
    body: "",
  });
  const [loaded, setLoaded] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [jobTitleInput, setJobTitleInput] = useState("");
  const [companyInput, setCompanyInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [industryInput, setIndustryInput] = useState("");
  const [delayedCall, setDelayedCall] = useState();
  const [subscriber, setSubscriber] = useState();
  const [user, setUser] = useState();
  const [attachments, setAttachments] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [allPeople, setAllPeople] = useState([]);
  const [selectedJobTitles, setSelectedJobTitles] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [showJobTitleDropdown, setShowJobTitleDropdown] = useState(false);
  const [showIndustryDropdown, setShowIndustryDropdown] = useState(false);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [allSelected, setAllSelected] = useState(true);
  const [companyDropdownVisible, setCompanyDropdownVisible] = useState(false);
  const [locationDropdownVisible, setLocationDropdownVisible] = useState(false);

  const fillerPeople = [
    {
      id: 1,
      name: "John Doe",
      position: "Manager",
      company: "Google",
      location: "San Francisco, CA",
      industry: "Technology",
      linkedin: "https://www.linkedin.com/in/johndoe",
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Director",
      company: "Amazon",
      location: "Seattle, WA",
      industry: "E-commerce",
      linkedin: "https://www.linkedin.com/in/janesmith",
    },
    {
      id: 1,
      name: "John Doe",
      position: "Manager",
      company: "Google",
      location: "San Francisco, CA",
      industry: "Technology",
      linkedin: "https://www.linkedin.com/in/johndoe",
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Director",
      company: "Amazon",
      location: "Seattle, WA",
      industry: "E-commerce",
      linkedin: "https://www.linkedin.com/in/janesmith",
    },
    {
      id: 1,
      name: "John Doe",
      position: "Manager",
      company: "Google",
      location: "San Francisco, CA",
      industry: "Technology",
      linkedin: "https://www.linkedin.com/in/johndoe",
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Director",
      company: "Amazon",
      location: "Seattle, WA",
      industry: "E-commerce",
      linkedin: "https://www.linkedin.com/in/janesmith",
    },
    {
      id: 1,
      name: "John Doe",
      position: "Manager",
      company: "Google",
      location: "San Francisco, CA",
      industry: "Technology",
      linkedin: "https://www.linkedin.com/in/johndoe",
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Director",
      company: "Amazon",
      location: "Seattle, WA",
      industry: "E-commerce",
      linkedin: "https://www.linkedin.com/in/janesmith",
    },
    {
      id: 1,
      name: "John Doe",
      position: "Manager",
      company: "Google",
      location: "San Francisco, CA",
      industry: "Technology",
      linkedin: "https://www.linkedin.com/in/johndoe",
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Director",
      company: "Amazon",
      location: "Seattle, WA",
      industry: "E-commerce",
      linkedin: "https://www.linkedin.com/in/janesmith",
    },
    {
      id: 1,
      name: "John Doe",
      position: "Manager",
      company: "Google",
      location: "San Francisco, CA",
      industry: "Technology",
      linkedin: "https://www.linkedin.com/in/johndoe",
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Director",
      company: "Amazon",
      location: "Seattle, WA",
      industry: "E-commerce",
      linkedin: "https://www.linkedin.com/in/janesmith",
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Director",
      company: "Amazon",
      location: "Seattle, WA",
      industry: "E-commerce",
      linkedin: "https://www.linkedin.com/in/janesmith",
    },
  ];

  useEffect(() => {
    const loadData = async () => {
      if (session?.data?.session) {
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
      filterPeople();
    }
  }, [session, selectedJobTitles, selectedCompanies, selectedLocations, selectedIndustries]);

  const filterPeople = () => {
    let filteredPeople = [];
    if (selectedJobTitles.length > 0) {
      filteredPeople = fillerPeople.filter((person) =>
        selectedJobTitles.includes(person.position)
      );
    }
    if (selectedCompanies.length > 0) {
      filteredPeople = (selectedJobTitles.length > 0 ? filteredPeople : fillerPeople).filter((person) =>
        selectedCompanies.includes(person.company)
      );
    }
    if (selectedLocations.length > 0) {
      filteredPeople = (selectedJobTitles.length > 0 || selectedCompanies.length > 0 ? filteredPeople : fillerPeople).filter((person) =>
        selectedLocations.includes(person.location)
      );
    }
    if (selectedIndustries.length > 0) {
      filteredPeople = (selectedJobTitles.length > 0 || selectedCompanies.length > 0 || selectedLocations.length > 0 ? filteredPeople : fillerPeople).filter((person) =>
        selectedIndustries.includes(person.industry)
      );
    }
    setSelectedPeople(filteredPeople);
    setMatchesFound(filteredPeople.length);
  };

  const handleJobTitleSelect = (jobTitle) => {
    setSelectedJobTitles((prevJobTitles) => {
      if (prevJobTitles.includes(jobTitle)) {
        return prevJobTitles.filter((title) => title !== jobTitle);
      } else {
        return [...prevJobTitles, jobTitle];
      }
    });
  };

  const handleCompanySelect = (company) => {
    setSelectedCompanies((prevCompanies) => {
      if (prevCompanies.includes(company)) {
        return prevCompanies.filter((c) => c !== company);
      } else {
        return [...prevCompanies, company];
      }
    });
  };

  const handleLocationSelect = (location) => {
    setSelectedLocations((prevLocations) => {
      if (prevLocations.includes(location)) {
        return prevLocations.filter((l) => l !== location);
      } else {
        return [...prevLocations, location];
      }
    });
  };

  const handleIndustrySelect = (industry) => {
    setSelectedIndustries((prevIndustries) => {
      if (prevIndustries.includes(industry)) {
        return prevIndustries.filter((i) => i !== industry);
      } else {
        return [...prevIndustries, industry];
      }
    });
  };

  const handleAttachmentChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setAttachments((prevAttachments) => [...prevAttachments, ...selectedFiles]);
  };

  const handleAttachmentRemove = (index) => {
    setAttachments((prevAttachments) => {
      const updatedAttachments = [...prevAttachments];
      updatedAttachments.splice(index, 1);
      return updatedAttachments;
    });
  };

  const fetchMatches = () => {
    if (delayedCall) clearTimeout(delayedCall);
    setDelayedCall(
      setTimeout(async () => {
        console.log("Now fetching");
        const response = await fetch("/api/receiver/count-match", {
          method: "POST",
          body: JSON.stringify({
            jobTitle: jobTitleInput,
            company: companyInput,
            location: locationInput,
            industry: industryInput,
          }),
        });
        if (response.status === 200) {
          const results = await response.json();
          setMatchesFound(results.count);

          // Fetch selected people based on filters
          const peopleResponse = await fetch("/api/receiver/list-people", {
            method: "POST",
            body: JSON.stringify({
              jobTitle: jobTitleInput,
              company: companyInput,
              location: locationInput,
              industry: industryInput,
            }),
          });
          if (peopleResponse.status === 200) {
            const peopleResults = await peopleResponse.json();
            setSelectedPeople(peopleResults.people);
          }
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
        "X-Supabase-Auth":
          session.data.session.access_token +
          " " +
          session.data.session.refresh_token,
      },
    });
    if (response.status === 200) {
      const { url } = await response.json();
      router.push(url);
    }
  };

  useEffect(() => {
    setSelectedPeople(fillerPeople);
  }, []);

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedPeople([]);
    } else {
      setSelectedPeople(fillerPeople);
    }
    setAllSelected(!allSelected);
  };

  const handleSelectPerson = (person) => {
    if (selectedPeople.some((p) => p.id === person.id)) {
      setSelectedPeople(selectedPeople.filter((p) => p.id !== person.id));
    } else {
      setSelectedPeople([...selectedPeople, person]);
    }
  };

  const handleLocationInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (locationInput.trim() !== "") {
        setSelectedLocations([...selectedLocations, locationInput.trim()]);
        setLocationInput("");
      }
    }
  };

  const renderEmailPreview = () => {
    return (
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gray-900 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">{template.subject}</h2>
            <div className="flex items-center space-x-4">
              <button className="bg-purple-600 hover:bg-purple-700 text-white rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                Reply
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 text-white rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                Forward
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <span>To: Recipient &lt;recipient@example.com&gt;</span>
            <span className="border-l border-gray-600 pl-2">
              From: Sender &lt;sender@example.com&gt;
            </span>
          </div>
        </div>
        <div
          className="p-6 text-white"
          dangerouslySetInnerHTML={{ __html: template.body }}
        ></div>
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
          "X-Supabase-Auth":
            session.data.session.access_token +
            " " +
            session.data.session.refresh_token,
        },
      });
      if (response.status === 200) { const results = await response.json();
        setSubscriber(results.subscriber);
        setTemplate({
          body: results.subscriber.email_body,
          subject: results.subscriber.email_subject,
        });
      }
    } catch (error) {
      console.error(error);
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
      const response = await fetch(
        `/api/subscriber/${subscriber ? "update" : "create"}`,
        {
          method: "POST",
          headers: {
            "X-Supabase-Auth":
              session.data.session.access_token +
              " " +
              session.data.session.refresh_token,
          },
          body: JSON.stringify({
            user_id: userId,
            email_body: template.body,
            email_subject: template.subject,
            active: false,
            options: {
              jobTitle: jobTitleInput,
              company: companyInput,
              location: locationInput,
              industry: industryInput,
            },
          }),
        }
      );
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

  const toggleCampaignStatus = async () => {
    if (
      subscriber &&
      !subscriber.active &&
      (!subscriber.access_token || !subscriber.refresh_token)
    ) {
      requestEmailPermissions();
    } else if (user && user.credits > 0 && subscriber) {
      const response = await fetch(`/api/subscriber/toggle-active`, {
        method: "POST",
        headers: {
          "X-Supabase-Auth":
            session.data.session.access_token +
            " " +
            session.data.session.refresh_token,
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
    <main className="container mx-auto py-8 px-4 sm:px-8">
      <section className="text-center mt-2 mb-10">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <h2 className="text-4xl font-bold text-white mb-4 sm:mb-0">
            Preferences
          </h2>
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
      {currentStep === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg mb-8 w-full">
              <h3 className="text-3xl font-bold text-purple-400 mb-6">Filters</h3>
              <div className="space-y-8">
                <div>
                  <label htmlFor="jobTitle" className="block text-lg font-semibold mb-2">
                    Job Title
                  </label>
                  <div className="relative">
                    <button
                      id="jobTitle"
                      type="button"
                      className="w-full p-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 flex justify-between items-center"
                      onClick={() => setShowJobTitleDropdown(!showJobTitleDropdown)}
                      aria-haspopup="true"
                      aria-expanded={showJobTitleDropdown}
                    >
                      <span>{selectedJobTitles.length > 0 ? selectedJobTitles.join(", ") : "Select job titles"}</span>
                      <FaChevronDown className="ml-2" />
                    </button>
                    {showJobTitleDropdown && (
                      <div
                        className="absolute mt-2 w-full bg-gray-700 rounded-lg shadow-lg z-10"
                        role="menu"
                        aria-labelledby="jobTitle"
                      >
                        <label className="flex items-center px-4 py-2 hover:bg-gray-600">
                          <input
                            type="checkbox"
                            checked={selectedJobTitles.includes("Entry")}
                            onChange={() => handleJobTitleSelect("Entry")}
                            className="mr-2"
                          />
                          <span>Entry</span>
                        </label>
                        <label className="flex items-center px-4 py-2 hover:bg-gray-600">
                          <input
                            type="checkbox"
                            checked={selectedJobTitles.includes("Senior")}
                            onChange={() => handleJobTitleSelect("Senior")}
                            className="mr-2"
                          />
                          <span>Senior</span>
                        </label>
                        <label className="flex items-center px-4 py-2 hover:bg-gray-600">
                          <input
                            type="checkbox"
                            checked={selectedJobTitles.includes("Manager")}
                            onChange={() => handleJobTitleSelect("Manager")}
                            className="mr-2"
                          />
                          <span>Manager</span>
                        </label>
                        <label className="flex items-center px-4 py-2 hover:bg-gray-600">
                          <input
                            type="checkbox"
                            checked={selectedJobTitles.includes("Director")}
                            onChange={() => handleJobTitleSelect("Director")}
                            className="mr-2"
                          />
                          <span>Director</span>
                        </label>
                        <label className="flex items-center px-4 py-2 hover:bg-gray-600">
                          <input
                            type="checkbox"
                            checked={selectedJobTitles.includes("Head")}
                            onChange={() => handleJobTitleSelect("Head")}
                            className="mr-2"
                          />
                          <span>Head</span>
                        </label>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label htmlFor="company" className="block text-xl font-semibold mb-2">
                    Company
                  </label>
                  <div className="relative">
                    <input
                      id="company"
                      type="text"
                      placeholder="Search companies..."
                      value={companyInput}
                      onChange={(e) => {
                        setCompanyInput(e.target.value);
                        setCompanyDropdownVisible(e.target.value !== "");
                      }}
                      className="w-full p-4 text-lg bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    {companyDropdownVisible && (
                      <div className="absolute mt-2 w-full bg-gray-700 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                        {fillerPeople
                          .map((person) => person.company)
                          .filter((company, index, self) => self.indexOf(company) === index)
                          .filter((company) => company.toLowerCase().includes(companyInput.toLowerCase()))
                          .map((company) => (
                            <div
                              key={company}
                              className={`px-4 py-2 text-lg cursor-pointer ${
                                selectedCompanies.includes(company) ? "bg-purple-600" : "hover:bg-gray-600"
                              }`}
                              onClick={() => handleCompanySelect(company)}
                            >
                              {company}
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedCompanies.map((company) => (
                      <div key={company} className="flex items-center mb-1 bg-purple-600 text-white px-2 py-1 rounded-lg text-lg">
                        <span>{company}</span>
                        <button
                          className="ml-2 text-white hover:text-red-500 focus:outline-none"
                          onClick={() => handleCompanySelect(company)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label htmlFor="location" className="block text-xl font-semibold mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <input
                      id="location"
                      type="text"
                      placeholder="Search locations..."
                      value={locationInput}
                      onChange={(e) => {
                        setLocationInput(e.target.value);
                        setLocationDropdownVisible(e.target.value !== "");
                      }}
                      className="w-full p-4 text-lg bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    {locationDropdownVisible && (
                      <div className="absolute mt-2 w-full bg-gray-700 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                        {fillerPeople
                          .map((person) => person.location)
                          .filter((location, index, self) => self.indexOf(location) === index)
                          .filter((location) => location.toLowerCase().includes(locationInput.toLowerCase()))
                          .map((location) => (
                            <div
                              key={location}
                              className={`px-4 py-2 text-lg cursor-pointer ${
                                selectedLocations.includes(location) ? "bg-purple-600" : "hover:bg-gray-600"
                              }`}
                              onClick={() => handleLocationSelect(location)}
                            >
                              {location}
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedLocations.map((location) => (
                      <div key={location} className="flex items-center mb-1 bg-purple-600 text-white px-2 py-1 rounded-lg text-lg">
                        <span>{location}</span>
                        <button
                          className="ml-2 text-white hover:text-red-500 focus:outline-none"
                          onClick={() => handleLocationSelect(location)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label htmlFor="industry" className="block text-lg font-semibold mb-2">
                    Industry
                  </label>
                  <div className="relative">
                    <button
                      id="industry"
                      type="button"
                      className="w-full p-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 flex justify-between items-center"
                      onClick={() => setShowIndustryDropdown(!showIndustryDropdown)}
                      aria-haspopup="true"
                      aria-expanded={showIndustryDropdown}
                    >
                      <span>{selectedIndustries.length > 0 ? selectedIndustries.join(", ") : "Select industries"}</span>
                      <FaChevronDown className="ml-2" />
                    </button>
                    {showIndustryDropdown && (
                      <div
                        className="absolute mt-2 w-full bg-gray-700 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto"
                        role="menu"
                        aria-labelledby="industry"
                      >
                        {commonIndustries.map((industry) => (
                          <label key={industry} className="flex items-center px-4 py-2 hover:bg-gray-600">
                            <input
                              type="checkbox"
                              checked={selectedIndustries.includes(industry)}
                              onChange={() => handleIndustrySelect(industry)}
                              className="mr-2"
                            />
                            <span>{industry}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedIndustries.map((industry) => (
                      <div key={industry} className="flex items-center mb-1 bg-purple-600 text-white px-2 py-1 rounded-lg">
                        <span>{industry}</span>
                        <button
                          className="ml-2 text-white hover:text-red-500 focus:outline-none"
                          onClick={() => handleIndustrySelect(industry)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-bold text-purple-400">Selected People</h3>
                {matchesFound !== null && matchesFound !== undefined && matchesFound !== "" && (
                  <p className="font-semibold text-xl">{`${matchesFound} leads found`}</p>
                )}
              </div>
              <div className={`overflow-x-auto ${selectedPeople.length > 12 ? "max-h-[70vh] overflow-y-auto" : ""}`}>
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left border-b border-gray-600 text-lg">Name</th>
                      <th className="px-4 py-2 text-left border-b border-gray-600 text-lg">Company</th>
                      <th className="px-4 py-2 text-left border-b border-gray-600 text-lg">Location</th>
                      <th className="px-4 py-2 text-left border-b border-gray-600 text-lg">LinkedIn</th>
                      <th className="px-4 py-2 text-left border-b border-gray-600 text-lg">Job Title</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedPeople.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-4 py-2 text-center text-lg">
                          No filters applied. Showing all people.
                        </td>
                      </tr>
                    ) : (
                      selectedPeople.map((person) => (
                        <tr key={person.id}>
                          <td className="px-4 py-2 border-b border-gray-600 text-lg">{person.name}</td>
                          <td className="px-4 py-2 border-b border-gray-600 text-lg">{person.company}</td>
                          <td className="px-4 py-2 border-b border-gray-600 text-lg">{person.location}</td>
                          <td className="px-4 py-2 border-b border-gray-600 text-lg">
                            <a
                              href={person.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-purple-400 hover:text-purple-500 transition-colors duration-300"
                            >
                              <FaLinkedin size={24} />
                            </a>
                          </td>
                          <td className="px-4 py-2 border-b border-gray-600 text-lg">{person.position}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
{currentStep === 1 && (
<div className="flex justify-end mt-8">
<button
onClick={() => setCurrentStep(2)}
className="px-6 py-3 bg-purple-600 text-white text-lg font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-300"
>
Next
</button>
</div>
)}
{currentStep === 2 && (
<section className="bg-gray-800 p-8 rounded-lg shadow-lg mb-8">
<div className="flex flex-col sm:flex-row items-center mb-6">
<h3 className="text-3xl font-bold text-purple-400 mb-4 sm:mb-0 sm:mr-4">
Email Template
</h3>
<HelpIcon text="Customize the subject line and body of your email template. Optionally, attach files like your resume or cover letter." />
<button
onClick={() => setShowPreview(!showPreview)}
className="ml-auto px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-300 flex items-center"
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
<label
           htmlFor="templateSubject"
           className="block text-lg font-semibold mb-1"
         >
Subject:
</label>
<input
id="templateSubject"
value={template.subject}
onChange={(e) => handleTemplateChange(e, "subject")}
className="w-full p-3 bg-gray-700 text-white text-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
type="text"
/>
</div>
<div className="mb-4">
<label
           htmlFor="templateBody"
           className="block text-lg font-semibold mb-1"
         >
Body:
</label>
<textarea
id="templateBody"
value={template.body}
onChange={(e) => handleTemplateChange(e, "body")}
rows={12}
className="w-full p-3 bg-gray-700 text-white text-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
></textarea>
</div>
<div className="mb-4">
<div className="flex items-center">
<label
             htmlFor="attachments"
             className="block text-lg font-semibold mb-1"
           >
Attachments:
</label>
</div>
<div className="flex flex-wrap items-center gap-4">
<div
className="flex items-center justify-center w-32 h-32 bg-gray-700 rounded-lg cursor-pointer"
onClick={() => document.getElementById("attachmentInput").click()}
>
<FaPlus className="text-3xl text-purple-500" />
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
                   className="flex items-center justify-between bg-gray-700 rounded-lg p-4"
                 >
<span className="text-lg truncate">
{attachment.name}
</span>
<button
onClick={() => handleAttachmentRemove(index)}
className="ml-4 text-red-500 hover:text-red-700 focus:outline-none"
>
<FaTrash size={20} />
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
<h4 className="text-2xl font-semibold mb-4 text-purple-400">
Preview:
</h4>
{renderEmailPreview()}
</div>
)}
</section>
)}
{currentStep === 2 && (
<div className="flex justify-between mt-8">
<button
onClick={() => setCurrentStep(1)}
className="px-6 py-3 bg-gray-600 text-white text-lg font-semibold rounded-lg hover:bg-gray-700 transition-colors duration-300"
>
Back
</button>
<button
onClick={() => setCurrentStep(3)}
className="px-6 py-3 bg-purple-600 text-white text-lg font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-300"
>
Review
</button>
</div>
)}
{currentStep === 3 && (
<section className="bg-gray-800 p-8 rounded-lg shadow-lg mb-8">
<h3 className="text-4xl font-bold text-purple-400 mb-8">Review Campaign</h3>
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
  <div>
    <h4 className="text-3xl font-semibold mb-6 text-purple-400">Selected People:</h4>
    <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
      <ul className="list-disc list-inside text-xl text-white space-y-4">
        {selectedPeople.map((person) => (
          <li key={person.id}>
            <span className="font-semibold">{person.name}</span>
            <span className="text-gray-300 ml-2">{person.position} at {person.company}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
  <div>
    <h4 className="text-3xl font-semibold mb-6 text-purple-400">Email Template:</h4>
    <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
      <p className="text-xl mb-4 text-white">
        <span className="font-semibold">Subject:</span> {template.subject}
      </p>
      <p className="text-xl text-white">
        <span className="font-semibold">Body:</span> {template.body}
      </p>
    </div>
  </div>
</div>
<div className="mt-12">
  <div className="bg-gray-700 p-6 rounded-lg shadow-lg border-2 border-purple-500">
    <p className="text-2xl mb-4 text-white">
      <span className="font-semibold text-purple-400">Total Leads:</span> {selectedPeople.length}
    </p>
    <p className="text-2xl mb-4 text-white">
      <span className="font-semibold text-purple-400">Credits Required:</span> {selectedPeople.length}
    </p>
    <p className="text-2xl text-white">
      <span className="font-semibold text-purple-400">Credits Available:</span> {user?.credits || 0}
    </p>
  </div>
</div>
</section>
)}
{currentStep === 3 && (
  <div className="flex justify-between mt-8">
  <button
    onClick={() => setCurrentStep(2)}
    className="px-6 py-3 bg-gray-600 text-white text-xl font-semibold rounded-lg hover:bg-gray-700 transition-colors duration-300"
  >
    Back
  </button>
  {subscriber || (user?.credits > 0 && (
    <button
      onClick={handleSubmit}
      className="px-6 py-3 bg-purple-600 text-white text-xl font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-300"
    >
      Launch Campaign
    </button>
  ))}
</div>
)}
</main>
);
}