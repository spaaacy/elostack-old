"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const RequestInterview: React.FC = () => {
  const [formData, setFormData] = useState({
    position: "",
    company: "",
    interviewType: "",
    length: "",
    description: "",
    candidateName: "",
    candidateEmail: "",
    eloStackProfile: "",
    people: [],
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePeopleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number
  ) => {
    const newPeople = [...formData.people];
    if (e.target.type === "checkbox") {
      newPeople[index][e.target.name] = e.target.checked;
    } else {
      newPeople[index][e.target.name] = e.target.value;
    }
    setFormData({ ...formData, people: newPeople });
  };

  const addPerson = () => {
    setFormData({
      ...formData,
      people: [
        ...formData.people,
        { name: "", role: "", sameInterviewType: false },
      ],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <section className="container mx-auto bg-white mt-6 bg-center p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-blueprimary">
          Request Interview
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={handleChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded"
          />

          <input
            type="text"
            name="position"
            placeholder="Position"
            value={formData.position}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />

          <select
            name="interviewType"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Interview Type</option>
            <option value="technical">Technical</option>
            <option value="behavioral">Behavioral</option>
            <option value="technical&behavioral">Technical & Behavioral</option>
          </select>

          {formData.interviewType === "technical&behavioral" ? (
            <>
              <select
                name="technicalLength"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select Technical Length</option>
                <option value="30 minutes">30 minutes</option>
                <option value="45 minutes">45 minutes</option>
                <option value="1 hour">1 hour</option>
                <option value="1 hour 15 minutes">1 hour 15 minutes</option>
                <option value="1 hour 30 minutes">1 hour 30 minutes</option>
              </select>
              <select
                name="behavioralLength"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select Behavioral Length</option>
                <option value="30 minutes">30 minutes</option>
                <option value="45 minutes">45 minutes</option>
                <option value="1 hour">1 hour</option>
                <option value="1 hour 15 minutes">1 hour 15 minutes</option>
                <option value="1 hour 30 minutes">1 hour 30 minutes</option>
              </select>
            </>
          ) : (
            <select
              name="length"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select Length</option>
              <option value="30 minutes">30 minutes</option>
              <option value="45 minutes">45 minutes</option>
              <option value="1 hour">1 hour</option>
              <option value="1 hour 15 minutes">1 hour 15 minutes</option>
              <option value="1 hour 30 minutes">1 hour 30 minutes</option>
            </select>
          )}
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="candidateName"
            placeholder="Candidate Name"
            value={formData.candidateName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="candidateEmail"
            placeholder="Candidate Email"
            value={formData.candidateEmail}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="eloStackProfile"
            placeholder="EloStack Profile"
            value={formData.eloStackProfile}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {formData.people.map((person, index) => (
            <div key={index} className="flex flex-col space-y-2">
              <hr />
              <h3 className="text-2xl text-blueprimary mt-4">
                Candidate {index + 2}
              </h3>
              {!person.sameInterviewType && (
                <>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={person.name}
                      onChange={(e) => handlePeopleChange(e, index)}
                      className="w-full p-2  border border-gray-300 rounded"
                    />

                    <select
                      name="interviewType"
                      onChange={handleChange}
                      className="w-full p-2 mt-4 border border-gray-300 rounded"
                    >
                      <option value="">Select Interview Type</option>
                      <option value="technical">Technical</option>
                      <option value="behavioral">Behavioral</option>
                      <option value="technical&behavioral">
                        Technical & Behavioral
                      </option>
                    </select>

                    {formData.interviewType === "technical&behavioral" ? (
                      <>
                        <select
                          name="technicalLength"
                          onChange={handleChange}
                          className="w-full p-2 mt-4 border border-gray-300 rounded"
                        >
                          <option value="">Select Technical Length</option>
                          <option value="30 minutes">30 minutes</option>
                          <option value="45 minutes">45 minutes</option>
                          <option value="1 hour">1 hour</option>
                          <option value="1 hour 15 minutes">
                            1 hour 15 minutes
                          </option>
                          <option value="1 hour 30 minutes">
                            1 hour 30 minutes
                          </option>
                        </select>
                        <select
                          name="behavioralLength"
                          onChange={handleChange}
                          className="w-full p-2 mt-4 border border-gray-300 rounded"
                        >
                          <option value="">Select Behavioral Length</option>
                          <option value="30 minutes">30 minutes</option>
                          <option value="45 minutes">45 minutes</option>
                          <option value="1 hour">1 hour</option>
                          <option value="1 hour 15 minutes">
                            1 hour 15 minutes
                          </option>
                          <option value="1 hour 30 minutes">
                            1 hour 30 minutes
                          </option>
                        </select>
                      </>
                    ) : (
                      <select
                        name="length"
                        onChange={handleChange}
                        className="w-full p-2 mt-4 border border-gray-300 rounded"
                      >
                        <option value="">Select Length</option>
                        <option value="30 minutes">30 minutes</option>
                        <option value="45 minutes">45 minutes</option>
                        <option value="1 hour">1 hour</option>
                        <option value="1 hour 15 minutes">
                          1 hour 15 minutes
                        </option>
                        <option value="1 hour 30 minutes">
                          1 hour 30 minutes
                        </option>
                      </select>
                    )}
                    <textarea
                      name="description"
                      placeholder="Description"
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full p-2 mt-4 border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      name="candidateName"
                      placeholder="Candidate Name"
                      value={formData.candidateName}
                      onChange={handleChange}
                      className="w-full p-2 mt-4 border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      name="candidateEmail"
                      placeholder="Candidate Email"
                      value={formData.candidateEmail}
                      onChange={handleChange}
                      className="w-full p-2 mt-4 border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      name="eloStackProfile"
                      placeholder="EloStack Profile"
                      value={formData.eloStackProfile}
                      onChange={handleChange}
                      className="w-full p-2 mt-4 border border-gray-300 rounded"
                    />
                  </form>
                </>
              )}
              <label className="flex items-center space-x-2 mt-2">
                <input
                  type="checkbox"
                  name="sameInterviewType"
                  checked={person.sameInterviewType}
                  onChange={(e) => handlePeopleChange(e, index)}
                  className="w-5 h-5 border border-gray-300 rounded"
                />
                <span>Same interview type as candidate 1</span>
              </label>
            </div>
          ))}
          <button
            type="button"
            onClick={addPerson}
            className="mt-0 mb-2 text-gray-500 px-6 py-3 rounded transition duration-150 ease-in-out"
          >
            <span style={{ fontSize: "20px" }}>+</span> Add another candidate
          </button>
          <button
            type="submit"
            className="inline-block bg-blue-600 text-white px-6 py-3 mb-6 rounded hover:bg-blue-700 transition duration-150 ease-in-out"
          >
            Submit
          </button>
        </form>
      </section>
    </>
  );
};

export default RequestInterview;
