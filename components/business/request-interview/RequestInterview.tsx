"use client";
import React, { useState } from "react";

const RequestInterview = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    candidateName: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the form submission, e.g., send the data to your backend
    console.log(formData);
  };

  return (
    <section data-aos="fade-up" className="p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-blueprimary mb-6">
        Request an Interview
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="candidateName"
          placeholder="Candidate Name"
          value={formData.candidateName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition duration-150 ease-in-out"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default RequestInterview;
