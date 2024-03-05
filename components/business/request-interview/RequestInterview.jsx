"use client";
import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";

const RequestInterview = () => {
  const { session } = useContext(UserContext);
  const router = useRouter();

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const request = {
      ...formData,
      business_id: session.data.session.user.id,
    };
    const response = await fetch("/api/interview-request/create", {
      method: "POST",
      body: JSON.stringify(request),
    });
    if (response.status === 201) {
      router.push("/dashboard");
    }
  };

  return (
    <>
      <section className="container mx-auto bg-white mt-6 bg-center p-8 rounded-lg shadow-lg w-3/5">
        <h2 className="text-3xl font-bold text-blueprimary">Request Interview</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <input
            type="text"
            name="individual_name"
            placeholder="Candidate Name"
            value={formData.individual_name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="individual_email"
            placeholder="Candidate Email"
            value={formData.individual_email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <select
            defaultValue="intern"
            value={formData.position}
            name="position"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Position</option>
            <option value="intern">Intern</option>
            <option value="junior">Junior</option>
          </select>

          <select
            value={formData.type}
            name="type"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Interview Type</option>
            <option value="technical">Technical</option>
            <option value="behavioral">Behavioral</option>
          </select>

          <label className="font-semibold text-sm text-gray-500 -my-2">* Interview will be 1 hour long</label>
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            className="w-full p-2 border border-gray-300 rounded resize-none"
          />

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-block bg-blue-600 text-white px-6 py-3 mb-6 rounded hover:bg-blue-700 transition duration-150 ease-in-out mauto"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default RequestInterview;
