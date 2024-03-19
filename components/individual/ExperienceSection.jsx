import React, { useState } from 'react';
import { FaBriefcase, FaTrash, FaEdit } from 'react-icons/fa';
import moment from 'moment';

const ExperienceSection = () => {
  const [experiences, setExperiences] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [newExperience, setNewExperience] = useState({
    title: '',
    company: '',
    employmentType: '',
    startDate: '',
    endDate: '',
    location: '',
    locationType: '',
    description: '',
    skills: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExperience((prevExperience) => ({
      ...prevExperience,
      [name]: value,
    }));
  };

  const handleSaveExperience = () => {
    if (selectedExperience) {
      setExperiences((prevExperiences) =>
        prevExperiences.map((experience) =>
          experience === selectedExperience ? newExperience : experience
        )
      );
      setSelectedExperience(null);
    } else {
      setExperiences((prevExperiences) => [...prevExperiences, newExperience]);
    }
    setNewExperience({
      title: '',
      company: '',
      employmentType: '',
      startDate: '',
      endDate: '',
      location: '',
      locationType: '',
      description: '',
      skills: [],
    });
    setIsModalOpen(false);
  };

  const handleDeleteExperience = (experienceToDelete) => {
    setExperiences((prevExperiences) =>
      prevExperiences.filter((experience) => experience !== experienceToDelete)
    );
  };

  const handleEditExperience = (experienceToEdit) => {
    setSelectedExperience(experienceToEdit);
    setNewExperience(experienceToEdit);
    setIsModalOpen(true);
  };

  const calculateDuration = (startDate, endDate) => {
    const start = moment(startDate);
    const end = moment(endDate);
    const duration = moment.duration(end.diff(start));
    const years = duration.years();
    const months = duration.months();
    return `${years} yr ${months} mos`;
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4 text-white">Experience</h2>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-md mb-4"
      >
        <FaBriefcase className="inline-block mr-2" />
        Add Experience
      </button>
      <div className="space-y-6">
        {experiences.map((experience, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <FaBriefcase className="text-blue-500 mr-2" />
                <h3 className="text-xl font-semibold text-white">{experience.title}</h3>
              </div>
              <div>
                <button
                  onClick={() => handleEditExperience(experience)}
                  className="px-2 py-1 bg-blue-600 text-white rounded-md mr-2"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteExperience(experience)}
                  className="px-2 py-1 bg-red-600 text-white rounded-md"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            <p className="text-white">{experience.company} · {experience.employmentType}</p>
            <p className="text-gray-400">
              {experience.startDate} - {experience.endDate}
            </p>
            <p className="text-gray-400">{calculateDuration(experience.startDate, experience.endDate)}</p>
            <p className="text-gray-400">{experience.location} · {experience.locationType}</p>
            {experience.description.length > 100 ? (
              <div>
                <p className="text-gray-300 mt-2">{experience.description.slice(0, 100)}...</p>
                <button className="text-blue-500">Read More</button>
              </div>
            ) : (
              <p className="text-gray-300 mt-2">{experience.description}</p>
            )}
            <div className="mt-4">
              {experience.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-700 text-white px-2 py-1 rounded-full text-xs font-semibold mr-2"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
{isModalOpen && (
  <div className="fixed z-10 inset-0 overflow-y-auto  ">
    <div className="flex items-center justify-center min-h-screen">
      <div className="fixed inset-0 transition-opacity" onClick={() => setIsModalOpen(false)}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="bg-gray-900 rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-2xl sm:w-full p-6 z-20">
       <h2 className="text-2xl font-bold mb-4 text-white">
                {selectedExperience ? 'Edit Experience' : 'Add Experience'}
              </h2>
              <div className="mb-4">
                <label htmlFor="title" className="block text-white">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newExperience.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="company" className="block text-white">Company</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={newExperience.company}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="employmentType" className="block text-white">Employment Type</label>
                <select
                  id="employmentType"
                  name="employmentType"
                  value={newExperience.employmentType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                >
                  <option value="">Select employment type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Self-employed">Self-employed</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                  <option value="Apprenticeship">Apprenticeship</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="startDate" className="block text-white">Start Date</label>
                <input
                  type="text"
                  id="startDate"
                  name="startDate"
                  value={newExperience.startDate}
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
                  value={newExperience.endDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="duration" className="block text-white">Duration</label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  value={newExperience.duration}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="location" className="block text-white">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={newExperience.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="locationType" className="block text-white">Location Type</label>
                <select
                  id="locationType"
                  name="locationType"
                  value={newExperience.locationType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                >
                  <option value="">Select location type</option>
                  <option value="On-site">On-site</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-white">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={newExperience.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="skills" className="block text-white">Skills</label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  value={newExperience.skills.join(', ')}
                  onChange={(e) =>
                    setNewExperience((prevExperience) => ({
                      ...prevExperience,
                      skills: e.target.value.split(',').map((skill) => skill.trim()),
                    }))
                  }
                  className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleSaveExperience}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
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

export default ExperienceSection;