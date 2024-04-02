"use client";

import NavBar from "@/components/common/NavBar";
import Footer from "@/components/common/Footer";
import Head from "next/head";
import { useEffect, useState } from "react";
import { FaEdit, FaEye, FaEyeSlash, FaTrash } from "react-icons/fa";

const mockCompanies = [
  { id: 1, name: "Company 1", location: "Location 1", logo: "/logo.png" },
  { id: 2, name: "Company 2", location: "Location 2", logo: "/logo.png" },
  { id: 3, name: "Company 3", location: "Location 3", logo: "/logo.png" },
  // Add more mock companies as needed
];

const mockLocations = ["Location 1", "Location 2", "Location 3"];

const defaultTemplate = {
  name: "Default Template",
  subject: "[Your Subject]",
  content: `Dear [Hiring Manager],

[Introduction]

[Body Paragraph 1]

[Body Paragraph 2]

[Closing]

Best regards,
[Your Name]`,
};

const Page = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [emailCount, setEmailCount] = useState(1);
  const [templates, setTemplates] = useState([defaultTemplate]);
  const [showAddTemplateModal, setShowAddTemplateModal] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [newTemplateName, setNewTemplateName] = useState("");
  const [newTemplateSubject, setNewTemplateSubject] = useState("");
  const [newTemplateContent, setNewTemplateContent] = useState("");
  const [companyTemplates, setCompanyTemplates] = useState({});
  const [expandedTemplates, setExpandedTemplates] = useState([]);
  const [filters, setFilters] = useState({
    location: "",
    company: "",
  });

  useEffect(() => {
    setCompanies(mockCompanies);
  }, []);

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

  const handleTemplateChange = (companyId, templateName) => {
    setCompanyTemplates({ ...companyTemplates, [companyId]: templateName });
  };

  const handleAddTemplate = () => {
    if (newTemplateName && newTemplateSubject && newTemplateContent) {
      setTemplates([
        ...templates,
        { name: newTemplateName, subject: newTemplateSubject, content: newTemplateContent },
      ]);
      setNewTemplateName("");
      setNewTemplateSubject("");
      setNewTemplateContent("");
      setShowAddTemplateModal(false);
    }
  };

  const handleDeleteTemplate = (templateName) => {
    setTemplates(templates.filter((template) => template.name !== templateName));
  };

  const handleEditTemplate = (template) => {
    setEditingTemplate(template);
    setNewTemplateName(template.name);
    setNewTemplateSubject(template.subject);
    setNewTemplateContent(template.content);
  };

  const handleSaveTemplate = () => {
    if (editingTemplate) {
      setTemplates(
        templates.map((template) =>
          template.name === editingTemplate.name
            ? { ...template, name: newTemplateName, subject: newTemplateSubject, content: newTemplateContent }
            : template
        )
      );
      setEditingTemplate(null);
      setNewTemplateName("");
      setNewTemplateSubject("");
      setNewTemplateContent("");
    }
  };

  const handleSubmit = () => {
    // Simulate sending emails
    console.log("Selected Companies:", selectedCompanies);
    console.log("Email Count:", emailCount);
    console.log("Company Templates:", companyTemplates);
    alert("Emails sent successfully!");
  };

  const toggleTemplateExpansion = (templateName) => {
    if (expandedTemplates.includes(templateName)) {
      setExpandedTemplates(expandedTemplates.filter((name) => name !== templateName));
    } else {
      setExpandedTemplates([...expandedTemplates, templateName]);
    }
  };

  let filteredCompanies = [];
  if (companies) {
    filteredCompanies = companies.filter(
      (company) =>
        (filters.location ? company.location === filters.location : true) &&
        (filters.company ? company.name.toLowerCase().includes(filters.company.toLowerCase()) : true)
    );
  }

  return (
    <main className="flex flex-col min-h-screen text-white w-full bg-gradient-to-b from-[#0f0f1c] via-[#1b1b29] to-[#251b30]">
      <NavBar />
      <Head>
        <title>Email Service</title>
      </Head>
      <main className="container mx-auto p-4 bg-[#1b1b29] rounded-lg shadow mt-16">
        <section className="p-5 border-b border-gray-700">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white">Email Service</h2>
          </div>
        </section>
        <div className="flex justify-center items-center bg-[#1b1b29] text-black p-4 rounded-lg">
          <div className="flex space-x-4">
            {/* Location Filter */}
            <div className="flex items-center space-x-2">
              <label htmlFor="location" className="text-white">Location:</label>
              <select
                id="location"
                value={filters.location}
                onChange={(e) => handleFilterChange(e, "location")}
                className="p-2 border rounded-lg bg-gray-600 text-white"
              >
                <option value="">All Locations</option>
                {mockLocations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* Company Filter */}
            <div className="flex items-center space-x-2">
              <label htmlFor="company" className="text-white">Company:</label>
              <input
                id="company"
                value={filters.company}
                onChange={(e) => handleFilterChange(e, "company")}
                className="p-2 border rounded-lg bg-gray-600 text-white"
                type="text"
              />
            </div>
          </div>
        </div>
        <section className="p-8 rounded-lg shadow-lg bg-[#1b1b29] mt-8">
          <div className="grid grid-cols-3 gap-8">
            {filteredCompanies.map((company) => (
              <label
                key={company.id}
                className="flex items-center space-x-4 bg-gray-600 p-4 rounded-lg hover:shadow-lg transition-shadow duration-300"
              >
                <input
                  type="checkbox"
                  checked={selectedCompanies.includes(company.id)}
                  onChange={() => handleCompanySelect(company.id)}
                  className="form-checkbox h-5 w-5 text-purple-600"
                />
                <img src={company.logo} alt={company.name} className="h-8 w-8 rounded-full" />
                <div>
                  <h3 className="font-semibold text-lg text-white">{company.name}</h3>
                  <p className="text-sm text-gray-400">{company.location}</p>
                </div>
              </label>
            ))}
          </div>
        </section>
        {selectedCompanies.length > 0 && (
          <section className="p-8 rounded-lg shadow-lg bg-[#1b1b29] mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg text-white">Selected Companies</h3>
              <div className="flex items-center space-x-4">
                <span className="text-white">Emails per Company:</span>
                <input
                  type="number"
                  value={emailCount}
                  onChange={(e) => setEmailCount(parseInt(e.target.value))}
                  className="p-2 border rounded-lg bg-gray-600 text-white w-20"
                  min={1}
                />
                <span className="text-white">
                  Total Emails: {emailCount * selectedCompanies.length}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-8">
              {selectedCompanies.map((companyId) => {
                const company = companies.find((c) => c.id === companyId);
                return (
                  <div key={companyId} className="flex flex-col items-start space-y-2">
                    <div className="flex items-center space-x-2">
                      <img src={company.logo} alt={company.name} className="h-8 w-8 rounded-full" />
                      <span className="text-white">{company.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <label htmlFor={`template-${companyId}`} className="text-white">Template:</label>
                      <select
                        id={`template-${companyId}`}
                        value={companyTemplates[companyId] || "Default Template"}
                        onChange={(e) => handleTemplateChange(companyId, e.target.value)}
                        className="p-2 border rounded-lg bg-gray-600 text-white"
                      >
                        {templates.map((template) => (
                          <option key={template.name} value={template.name}>
                            {template.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
        <section className="p-8 rounded-lg shadow-lg bg-[#1b1b29] mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg text-white">Email Templates</h3>
            <button
              onClick={() => setShowAddTemplateModal(true)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center space-x-2"
            >
              <span>Add Template</span>
            </button>
          </div>
          <div className="space-y-4">
            {templates.map((template) => (
              <div key={template.name} className="bg-gray-600 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-lg text-white">{template.name}</h4>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => toggleTemplateExpansion(template.name)}
                      className="text-white hover:text-purple-400 text-xl p-1"
                    >
                      {expandedTemplates.includes(template.name) ? <FaEyeSlash /> : <FaEye />}
                    </button>
                    <button
  onClick={() => handleEditTemplate(template)}
  className="text-white hover:text-purple-400 text-xl p-1"
>
  <FaEdit />
</button>
                    {template.name !== "Default Template" && (
                      <button
                        onClick={() => handleDeleteTemplate(template.name)}
                        className="text-white hover:text-red-500 text-xl p-1"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                </div>
                {expandedTemplates.includes(template.name) && (
                  <div>
                    <p className="text-white">Subject: {template.subject}</p>
                    <p className="text-white whitespace-pre-wrap mt-2">{template.content}</p>
                  </div>
                )}
                {editingTemplate && editingTemplate.name === template.name && (
                  <div>
                    <div className="mb-2">
                      <label htmlFor={`templateName-${template.name}`} className="text-white">
                        Template Name:
                      </label>
                      <input
                        id={`templateName-${template.name}`}
                        value={newTemplateName}
                        onChange={(e) => setNewTemplateName(e.target.value)}
                        className="p-2 border rounded-lg bg-gray-600 text-white w-full mt-1"
                        type="text"
                      />
                    </div>
                    <div className="mb-2">
                      <label htmlFor={`templateSubject-${template.name}`} className="text-white">
                        Template Subject:
                      </label>
                      <input
                        id={`templateSubject-${template.name}`}
                        value={newTemplateSubject}
                        onChange={(e) => setNewTemplateSubject(e.target.value)}
                        className="p-2 border rounded-lg bg-gray-600 text-white w-full mt-1"
                        type="text"
                      />
                    </div>
                    <div className="mb-2">
                      <label htmlFor={`templateContent-${template.name}`} className="text-white">
                        Template Content:
                      </label>
                      <textarea
                        id={`templateContent-${template.name}`}
                        value={newTemplateContent}
                        onChange={(e) => setNewTemplateContent(e.target.value)}
                        className="w-full h-40 p-4 border rounded-lg bg-gray-600 text-white mt-1"
                      ></textarea>
                    </div>
                    <div className="flex justify-end">
                      <button
                        onClick={handleSaveTemplate}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
        <div className="flex justify-end mt-8">
          <button
            onClick={handleSubmit}
            className="ml-auto px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Send Emails
          </button>
        </div>
      </main>
      <Footer />

      {/* Add Template Modal */}
      {showAddTemplateModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#1b1b29] p-8 rounded-lg shadow-lg w-1/2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-white">Add Template</h3>
            </div>
            <div className="mb-2">
              <label htmlFor="templateName" className="text-white">Template Name:</label>
              <input
                id ="templateName"
                value={newTemplateName}
                onChange={(e) => setNewTemplateName(e.target.value)}
                className="p-2 border rounded-lg bg-gray-600 text-white w-full mt-1"
                type="text"
                />
                </div>
                <div className="mb-2">
                <label htmlFor="templateSubject" className="text-white">Template Subject:</label>
                <input
                id="templateSubject"
                value={newTemplateSubject}
                onChange={(e) => setNewTemplateSubject(e.target.value)}
                className="p-2 border rounded-lg bg-gray-600 text-white w-full mt-1"
                type="text"
                />
                </div>
                <div className="mb-2">
                <label htmlFor="templateContent" className="text-white">Template Content:</label>
                <textarea
                id="templateContent"
                value={newTemplateContent}
                onChange={(e) => setNewTemplateContent(e.target.value)}
                className="w-full h-40 p-4 border rounded-lg bg-gray-600 text-white mt-1"
                ></textarea>
                </div>
                <div className="flex justify-between">
                <button
                onClick={() => setShowAddTemplateModal(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                Close
                </button>
                <button
                             onClick={handleAddTemplate}
                             className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                           >
                Add Template
                </button>
                </div>
                </div>
                </div>
                )}
                </main>
                );
                };
                
                export default Page;