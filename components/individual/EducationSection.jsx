"use client"
import React, { useState } from 'react';
import { FaGraduationCap, FaTrash, FaEdit } from 'react-icons/fa';
import moment from 'moment';
import { formatDate } from "@/utils/formatDate";

const EducationSection = () => {
  const [educations, setEducations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState(null);
  const [expandedEducation, setExpandedEducation] = useState(null);
  const [newEducation, setNewEducation] = useState({
    school: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    grade: '',
    description: '',
    activities: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEducation((prevEducation) => ({
      ...prevEducation,
      [name]: value,
    }));
  };

  const handleSaveEducation = () => {
    if (selectedEducation) {
      setEducations((prevEducations) =>
        prevEducations.map((education) =>
          education === selectedEducation ? newEducation : education
        )
      );
      setSelectedEducation(null);
    } else {
      setEducations((prevEducations) => [...prevEducations, newEducation]);
    }
    setNewEducation({
      school: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      grade: '',
      description: '',
      activities: [],
    });
    setIsModalOpen(false);
  };

  const handleDeleteEducation = (educationToDelete) => {
    setEducations((prevEducations) =>
      prevEducations.filter((education) => education !== educationToDelete)
    );
  };

  const handleEditEducation = (educationToEdit) => {
    setSelectedEducation(educationToEdit);
    setNewEducation(educationToEdit);
    setIsModalOpen(true);
  };

  const calculateDuration = (startDate, endDate) => {
    const start = moment(startDate);
    const end = endDate ? moment(endDate) : moment(); // Use current date if endDate is not provided
    const duration = moment.duration(end.diff(start));
    const years = duration.years();
    const months = duration.months();
    return `${years} yr ${months} mos`;
  };

  const toggleExpandEducation = (educationId) => {
    if (expandedEducation === educationId) {
      setExpandedEducation(null);
    } else {
      setExpandedEducation(educationId);
    }
  };

  const isDescriptionExpanded = (educationId) => {
    return expandedEducation === educationId;
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4 text-white">Education</h2>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-md mb-4"
      >
        <FaGraduationCap className="inline-block mr-2" />
        Add Education
      </button>
      <div className="space-y-6">
        {educations.map((education, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <FaGraduationCap className="text-blue-500 mr-2" />
                <h3 className="text-xl font-semibold text-white">{education.school}</h3>
              </div>
              <div>
                <button
                  onClick={() => handleEditEducation(education)}
                  className="px-2 py-1 bg-purple-500 hover:bg-purple-600 text-white rounded-md mr-2"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteEducation(education)}
                  className="px-2 py-1 bg-red-600 text-white rounded-md"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            <p className="text-white">{education.degree} in {education.fieldOfStudy}</p>
            <p className="text-gray-400">
              {formatDate(education.startDate)} - {education.endDate ? formatDate(education.endDate) : 'Present'}
            </p>
            <p className="text-gray-400">{calculateDuration(education.startDate, education.endDate)}</p>
            <p className="text-gray-400">Grade: {education.grade}</p>
            <div className="text-gray-300 mt-2">
              <p
                className={`whitespace-pre-wrap ${
                  !isDescriptionExpanded(education.id) ? "line-clamp-1" : ""
                }`}
              >
                {education.description}
              </p>
              {education.description.split("\n").length > 1 && (
                <button
                  className="text-purple-500"
                  onClick={() => toggleExpandEducation(education.id)}
                >
                  {isDescriptionExpanded(education.id) ? "Show Less" : "Read More"}
                </button>
              )}
            </div>
            <div className="mt-4">
              {education.activities.map((activity, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-700 text-white px-2 py-1 rounded-full text-xs font-semibold mr-2"
                >
                  {activity}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto mt-12">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 transition-opacity" onClick={() => setIsModalOpen(false)}>
              <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>
            <div className="bg-gray-900 rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-2xl sm:w-full p-6 z-20">
              <h2 className="text-2xl font-bold mb-4 text-white">
                {selectedEducation ? 'Edit Education' : 'Add Education'}
              </h2>
              <div className="mb-4">
                <label htmlFor="school" className="block text-white">School</label>
                <input
                  type="text"
                  id="school"
                  name="school"
                  value={newEducation.school}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="degree" className="block text-white">Degree</label>
                <input
                  type="text"
                  id="degree"
                  name="degree"
                  value={newEducation.degree}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="fieldOfStudy" className="block text-white">Field of Study</label>
                <input
                  type="text"
                  id="fieldOfStudy"
                  name="fieldOfStudy"
                  value={newEducation.fieldOfStudy}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="startDate" className="block text-white">Start Date</label>
                <input
                  type="text"
                  id="startDate"
                  name="startDate"
                  value={newEducation.startDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="endDate" className="block text-white">End Date</label>
                <input
                  type="text"
                  id="endDate"
                  name="endDate"
                  value={newEducation.endDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="grade" className="block text-white">Grade</label>
                <input
                  type="text"
                  id="grade"
                  name="grade"
                  value={newEducation.grade}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-white">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={newEducation.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="activities" className="block text-white">Activities</label>
                <input
                  type="text"
                  id="activities"
                  name="activities"
                  value={newEducation.activities.join(', ')}
                  onChange={(e) =>
                    setNewEducation((prevEducation) => ({
                      ...prevEducation,
                      activities: e.target.value.split(',').map((activity) => activity.trim()),
                    }))
                  }
                  className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2"
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleSaveEducation}
                  className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationSection;