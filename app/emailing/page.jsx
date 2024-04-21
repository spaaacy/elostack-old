"use client";
import NavBar from "@/components/common/NavBar";
import Footer from "@/components/common/Footer";
import Head from "next/head";
import { Suspense, useContext, useEffect, useState } from "react";
import { FaTrash, FaEye, FaEyeSlash, FaPlus, FaLinkedin, FaChevronDown } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import { UserContext } from "@/context/UserContext";
import Loader from "@/components/common/Loader";
import toast, { Toaster } from "react-hot-toast";
import React from "react";
import Link from "next/link";
import PopupBox from "@/components/common/PopUp";

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

const Emailing = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const userContext = useContext(UserContext);
  const session = userContext?.session;
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [leadCount, setLeadCount] = useState(0);
  const [template, setTemplate] = useState({
    subject: "",
    body: "",
  });
  const [loaded, setLoaded] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const [delayedCall, setDelayedCall] = useState();
  const [subscriber, setSubscriber] = useState();
  const [user, setUser] = useState();
  const [currentStep, setCurrentStep] = useState(1);

  const [companies, setCompanies] = useState([]);
  const [states, setStates] = useState([]);
  const [seniorities, setSeniorities] = useState([]);

  const [stateInput, setStateInput] = useState("");
  const [companyInput, setCompanyInput] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [attachments, setAttachments] = useState([]);

  const [selectedSeniorities, setSelectedSeniorities] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [selectedStates, setSelectedStates] = useState([]);

  const [companyDropdownVisible, setCompanyDropdownVisible] = useState(false);
  const [showJobTitleDropdown, setShowJobTitleDropdown] = useState(false);
  const [stateDropdownVisible, setStateDropdownVisible] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (session?.data?.session) {
        await fetchMetadata();
        await fetchSubscriber();
        await fetchAttachments();
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
  }, [session, selectedSeniorities, selectedCompanies, selectedStates]);

  const fetchMetadata = async () => {
    const response = await fetch("/api/receiver/metadata", {
      method: "POST",
    });
    if (response.status === 200) {
      const results = await response.json();
      setCompanies(results.companies);
      setStates(results.states);
      setSeniorities(results.seniorities);
    }
  };

  const fetchMatches = () => {
    if (delayedCall) clearTimeout(delayedCall);
    setDelayedCall(
      setTimeout(async () => {
        const response = await fetch("/api/receiver/find-leads", {
          method: "POST",
          body: JSON.stringify({
            companies: selectedCompanies,
            states: selectedStates,
            seniority: selectedSeniorities,
          }),
        });
        if (response.status === 200) {
          const results = await response.json();
          setSelectedPeople(results.leads);
          setLeadCount(results.count);
        }
      }, 1000)
    );
  };

  const handleJobTitleSelect = (jobTitle) => {
    setSelectedSeniorities((prevJobTitles) => {
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
    setCompanyDropdownVisible(false);
    setCompanyInput("");
  };

  const handleStateSelect = (state) => {
    setSelectedStates((prevStates) => {
      if (prevStates.includes(state)) {
        return prevStates.filter((s) => s !== state);
      } else {
        return [...prevStates, state];
      }
    });
    setStateInput("");
    setStateDropdownVisible(false);
  };

  const handleAttachmentChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setAttachments((prevAttachments) => [...prevAttachments, ...selectedFiles]);
  };

  const handleAttachmentRemove = async (attachment, index) => {
    const userId = session.data.session?.user.id;
    if (!(attachment instanceof File) && userId) {
      const loadingToast = toast.loading("Removing attachment...");
      const response = await fetch("/api/attachments/delete", {
        method: "DELETE",
        headers: {
          "X-Supabase-Auth": session.data.session.access_token + " " + session.data.session.refresh_token,
        },
        body: JSON.stringify({ userId, attachment }),
      });
      if (response.status !== 200) {
        toast.error("There was an error deleting the attachment");
      } else {
        toast.success("Attachment removed", { id: loadingToast });
      }
    }
    setAttachments((prevAttachments) => {
      const updatedAttachments = [...prevAttachments];
      updatedAttachments.splice(index, 1);
      return updatedAttachments;
    });
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
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gray-900 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">
              {template.subject.replace(/{{RECEIVER_NAME}}/g, "John Doe").replace(/{{COMPANY}}/g, "Google")}
            </h2>
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
            <span>To: John Doe &lt;johndoe@google.com&gt;</span>
            <span className="border-l border-gray-600 pl-2">From: Your Name &lt;yourname@gmail.com&gt;</span>
          </div>
        </div>
        <div
          className="p-6 text-white whitespace-pre-line"
          dangerouslySetInnerHTML={{
            __html: template.body.replace(/{{RECEIVER_NAME}}/g, "John Doe").replace(/{{COMPANY}}/g, "Google"),
          }}
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
          "X-Supabase-Auth": session.data.session.access_token + " " + session.data.session.refresh_token,
        },
      });
      if (response.status === 200) {
        const results = await response.json();
        setSubscriber(results.subscriber);
        console.log(results.subscriber);
        setSelectedCompanies(results.subscriber.options.companies);
        setSelectedStates(results.subscriber.options.states);
        setSelectedSeniorities(results.subscriber.options.seniorities);
        setTemplate({
          body: results.subscriber.email_body,
          subject: results.subscriber.email_subject,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAttachments = async () => {
    const userId = session.data.session?.user.id;
    if (!userId) return;
    try {
      const response = await fetch(`/api/attachments/${userId}`, {
        method: "GET",
        headers: {
          "X-Supabase-Auth": session.data.session.access_token + " " + session.data.session.refresh_token,
        },
      });
      if (response.status === 200) {
        const results = await response.json();
        setAttachments((prevAttachments) => [...prevAttachments, ...results.attachments]);
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
        headers: {
          "X-Supabase-Auth": session.data.session.access_token + " " + session.data.session.refresh_token,
        },
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
      setLoading(true);
      const formData = new FormData();

      attachments.forEach((attachment) => {
        if (attachment instanceof File) formData.append(attachment.name, attachment);
      });

      formData.append(
        "subscriber",
        JSON.stringify({
          user_id: userId,
          email_body: template.body,
          email_subject: template.subject,
          active: true,
          options: {
            companies: selectedCompanies.length > 0 ? selectedCompanies : [],
            states: selectedStates.length > 0 ? selectedStates : [],
            seniorities: selectedSeniorities.length > 0 ? selectedSeniorities : [],
          },
        })
      );

      const response = await fetch(`/api/subscriber/${subscriber ? "update" : "create"}`, {
        method: "POST",
        headers: {
          "X-Supabase-Auth": session.data.session.access_token + " " + session.data.session.refresh_token,
        },
        body: formData,
      });
      if (response.status === 201 || response.status === 200) {
        if (!subscriber || !subscriber.refresh_token) {
          // requestEmailPermissions();
        }
        // setShowPopup(true); // Show the pop-up box
      } else {
        toast.error("Something went wrong...");
      }
      setLoading(false);
    } else {
      toast.error("Subject/body cannot be left blank!");
    }
  };

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
    <main className="container mx-auto py-8 px-4 sm:px-8">
      <section className="text-center mt-2 mb-10">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <h2 className="text-3xl font-bold text-white mb-4 sm:mb-0">Preferences</h2>
        </div>
      </section>
      {currentStep === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full">
              <h3 className="text-xl font-bold text-purple-400 mb-6">Filters</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="jobTitle" className="block font-semibold mb-2">
                    Seniority
                  </label>
                  <div className="relative">
                    <button
                      id="jobTitle"
                      type="button"
                      className="w-full p-2  bg-gray-700 text-sm text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 flex justify-between items-center"
                      onClick={() => setShowJobTitleDropdown(!showJobTitleDropdown)}
                      aria-haspopup="true"
                      aria-expanded={showJobTitleDropdown}
                    >
                      <span className="capitalize">
                        {selectedSeniorities.length > 0 ? selectedSeniorities.join(", ") : "Select job titles"}
                      </span>
                      <FaChevronDown className="ml-2" />
                    </button>
                    {showJobTitleDropdown && (
                      <div
                        className="absolute mt-2 w-full bg-gray-700 rounded-lg shadow-lg z-10"
                        role="menu"
                        aria-labelledby="jobTitle"
                      >
                        {seniorities.map((seniority) => (
                          <label className="capitalize flex items-center px-4 py-2 text-sm hover:bg-gray-600">
                            <input
                              type="checkbox"
                              checked={selectedSeniorities.includes(seniority.seniority.toLowerCase())}
                              onChange={() => handleJobTitleSelect(seniority.seniority)}
                              className="mr-2"
                            />
                            <span>{seniority.seniority}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label htmlFor="company" className="block font-semibold mb-2">
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
                      className="w-full p-2 text-sm bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    {companyDropdownVisible && (
                      <div className="absolute mt-2 w-full bg-gray-700 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                        {companies
                          .filter((company) =>
                            company.organization_name.toLowerCase().includes(companyInput.toLowerCase())
                          )
                          .map((company) => (
                            <div
                              key={company.organization_name}
                              className={`capitalize px-4 py-2 text-sm cursor-pointer ${
                                selectedCompanies.includes(company.organization_name)
                                  ? "bg-purple-600"
                                  : "hover:bg-gray-600"
                              }`}
                              onClick={() => handleCompanySelect(company.organization_name)}
                            >
                              {company.organization_name}
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedCompanies.map((company) => (
                      <div
                        key={company}
                        className="capitalize flex items-center mb-1 bg-purple-600 text-white px-2 py-1 rounded-lg text-sm"
                      >
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
                  <label htmlFor="state" className="block font-semibold mb-2">
                    State
                  </label>
                  <div className="relative">
                    <input
                      id="state"
                      type="text"
                      placeholder="Search states..."
                      value={stateInput}
                      onChange={(e) => {
                        setStateInput(e.target.value);
                        setStateDropdownVisible(e.target.value !== "");
                      }}
                      className="w-full p-2 text-sm bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    {stateDropdownVisible && (
                      <div className="absolute mt-2 w-full bg-gray-700 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                        {states &&
                          states
                            .filter((state) => state.state.toLowerCase().includes(stateInput.toLowerCase()))
                            .map((state) => (
                              <div
                                key={state.state}
                                className={`capitalize px-4 py-2 text-sm cursor-pointer ${
                                  selectedStates.includes(state.state) ? "bg-purple-600" : "hover:bg-gray-600"
                                }`}
                                onClick={() => handleStateSelect(state.state)}
                              >
                                {state.state}
                              </div>
                            ))}
                      </div>
                    )}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedStates.map((state) => (
                      <div
                        key={state}
                        className="capitalize flex items-center mb-1 bg-purple-600 text-white px-2 py-1 rounded-lg text-sm"
                      >
                        <span>{state}</span>
                        <button
                          className="ml-2 text-white hover:text-red-500 focus:outline-none"
                          onClick={() => handleStateSelect(state)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {(subscriber || user?.credits > 0) && (
              <button
                onClick={toggleCampaignStatus}
                className="mt-4 py-2 px-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-300"
              >
                {subscriber.active ? "Pause Campaign" : "Resume Campaign"}
              </button>
            )}
          </div>
          <div className="lg:col-span-3">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-purple-400">Selected Leads</h3>
                {leadCount > 0 && <p className="font-semibold">{`${leadCount} leads found`}</p>}
              </div>
              <div className={`overflow-x-auto ${leadCount > 12 ? "max-h-[70vh] overflow-y-auto" : ""}`}>
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left border-b border-gray-600 text-lg">Name</th>
                      <th className="px-4 py-2 text-left border-b border-gray-600 text-lg">Company</th>
                      <th className="px-4 py-2 text-left border-b border-gray-600 text-lg">Location</th>
                      <th className="px-4 py-2 text-left border-b border-gray-600 text-lg">LinkedIn</th>
                      <th className="px-4 py-2 text-left border-b border-gray-600 text-lg">Seniority</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leadCount === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-4 py-2 text-center text-sm">
                          No matches found.
                        </td>
                      </tr>
                    ) : (
                      selectedPeople.map((lead, i) => {
                        if (i < 100)
                          return (
                            <tr key={lead.id}>
                              <td className="px-4 py-2 border-b border-gray-600 text-sm">{lead.name}</td>
                              <td className="px-4 py-2 border-b border-gray-600 text-sm">{lead.organization_name}</td>
                              <td className="px-4 py-2 border-b border-gray-600 text-sm">
                                {lead.city && lead.state ? lead.city + ", " + lead.state : "N/A"}
                              </td>
                              <td className="px-4 py-2 border-b border-gray-600 text-sm">
                                <a
                                  href={lead.linkedin_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-purple-400 hover:text-purple-500 transition-colors duration-300"
                                >
                                  <FaLinkedin size={24} />
                                </a>
                              </td>
                              <td className="px-4 py-2 border-b border-gray-600 text-sm capitalize">
                                {lead.seniority}
                              </td>
                            </tr>
                          );
                      })
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
            className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-300"
          >
            Next
          </button>
        </div>
      )}
      {currentStep === 2 && (
        <section className="bg-gray-800 p-8 rounded-lg shadow-lg mb-8 mx-28">
          <div className="flex flex-col sm:flex-row items-center mb-6">
            <h3 className="text-2xl font-bold text-purple-400 mb-4 sm:mb-0 sm:mr-4">Email Template</h3>
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
          <p className="mb-2 text-xs text-gray-400">{`* Hint: User {{RECEIVER_NAME}} and {{COMPANY}} as placeholders for subject/body`}</p>
          <div className="mb-4">
            <label htmlFor="templateSubject" className="block text-lg font-semibold mb-1">
              Subject:
            </label>
            <input
              id="templateSubject"
              value={template.subject}
              onChange={(e) => handleTemplateChange(e, "subject")}
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              type="text"
              placeholder="Request for opportunity to work at {{COMPANY}}"
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
              rows={12}
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder={`Dear {{RECEIVER_NAME}},\n\nI am a highly skilled software developer with 5 years of experience in Web Development. I am interested in exploring opportunities with at {{COMPANY}}. Please find my resume attached.\n\nRegards,\nYour Name`}
            ></textarea>
          </div>
          <div className="mb-4">
            <div className="flex items-center">
              <label htmlFor="attachments" className="block text-lg font-semibold mb-1">
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
              <input id="attachmentInput" type="file" multiple onChange={handleAttachmentChange} className="hidden" />
              {attachments.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-700 rounded-lg p-4">
                      <span className="truncate">{attachment.name}</span>
                      <button
                        onClick={() => handleAttachmentRemove(attachment, index)}
                        className="ml-4 text-red-500 hover:text-red-700 focus:outline-none"
                      >
                        <FaTrash size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {attachments.length === 0 && (
              <p className="mt-2 text-sm text-gray-400">Click the "+" icon to add attachments</p>
            )}
          </div>
          {showPreview && (
            <div className="mt-8">
              <h4 className="text-2xl font-semibold mb-4 text-purple-400">Preview:</h4>
              {renderEmailPreview()}
            </div>
          )}
        </section>
      )}
      {currentStep === 2 && (
        <div className="flex justify-between mt-8">
          <button
            onClick={() => setCurrentStep(1)}
            className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors duration-300"
          >
            Back
          </button>
          <button
            onClick={() => setCurrentStep(3)}
            className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-300"
          >
            Review
          </button>
        </div>
      )}
      {currentStep === 3 && (
        <section className="bg-gray-800 p-8 rounded-lg shadow-lg mb-8 mx-28">
          <h3 className="text-2xl font-bold text-purple-400 mb-6">Review Campaign</h3>
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg mb-6">
            <p className="text-white">
              <span className="font-semibold text-purple-400">Total Leads Found:</span> {leadCount}
            </p>
            <p className="text-white">
              <span className="font-semibold text-purple-400">Credits Available:</span> {user?.credits || 0}
            </p>
            <p className="font-semibold text-purple-400">
              Selected Seniorities:{" "}
              <span className="capitalize text-white font-normal">
                {selectedSeniorities.length > 0
                  ? selectedSeniorities.map((seniority, index) => (index === 0 ? seniority : `, ${seniority}`))
                  : "All"}
              </span>
            </p>
            <p className="font-semibold text-purple-400">
              Selected Companies:{" "}
              <span className="capitalize text-white font-normal">
                {selectedCompanies.length > 0
                  ? selectedCompanies.map((company, index) => (index === 0 ? company : `, ${company}`))
                  : "All"}
              </span>
            </p>
            <p className="font-semibold text-purple-400">
              Selected States:{" "}
              <span className="capitalize text-white font-normal">
                {selectedStates.length > 0
                  ? selectedStates.map((state, index) => (index === 0 ? state : `, ${state}`))
                  : "All"}
              </span>
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-6 text-purple-400">Email Template:</h4>
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <p className="text-white">
                {template.subject.replace(/{{RECEIVER_NAME}}/g, "John Doe").replace(/{{COMPANY}}/g, "Google")}
              </p>
              <hr className="mt-4 text-black" />
              <p className="text-white mt-4 whitespace-pre-line">
                {template.body.replace(/{{RECEIVER_NAME}}/g, "John Doe").replace(/{{COMPANY}}/g, "Google")}
              </p>
            </div>
          </div>
        </section>
      )}
      {currentStep === 3 && (
        <div className="flex justify-between items-center">
          <button
            onClick={() => setCurrentStep(2)}
            className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors duration-300"
          >
            Back
          </button>
          {subscriber || user?.credits > 0 ? (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-300"
            >
              {subscriber ? "Save Preferences" : "Launch Campaign"}
            </button>
          ) : (
            <Link
              href={"/plans"}
              className="px-6 py-3 mr-28 bg-purple-600 text-white text-xl font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-300"
            >
              Launch Campaign
            </Link>
          )}
        </div>
      )}
      {showPopup && <PopupBox setIsOpen={setShowPopup} />}
    </main>
  );
};
