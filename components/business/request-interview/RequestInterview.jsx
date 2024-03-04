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
    try {
      const request = {
        individual_name: formData.candidateName,
        individual_email: formData.candidateEmail,
        description: formData.description,
        position: formData.position,
        business_id: session.data.session.user.id,
      };
      if (formData.interviewType === "tb") {
        if (formData.technicalLength + formData.behavioralLength > 60)
          throw Error("Total interview length greater exceeds limit!");

        request["technical_length"] = formData.technicalLength;
        request["behavioral_length"] = formData.behavioralLength;
      } else if (formData.interviewType === "t") {
        if (formData.interviewLength > 60) throw Error("Total interview length greater exceeds limit!");

        request["technical_length"] = formData.interviewLength;
      } else if (formData.interviewType === "b") {
        if (formData.interviewLength > 60) throw Error("Total interview length greater exceeds limit!");
        request["behavioral_length"] = formData.interviewLength;
      }
      const response = await fetch("/api/interview-request/create", {
        method: "POST",
        body: JSON.stringify(request),
      });
      if (response.status === 201) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section className="container mx-auto bg-white mt-6 bg-center p-8 rounded-lg shadow-lg w-3/5">
        <h2 className="text-3xl font-bold text-blueprimary">Request Interview</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
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
            value={formData.interviewType}
            name="interviewType"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Interview Type</option>
            <option value="t">Technical</option>
            <option value="b">Behavioral</option>
            <option value="tb">Technical & Behavioral</option>
          </select>

          <label className="font-semibold text-sm text-gray-500 -my-2">* Total interview length must be 1 hour</label>

          {formData.interviewType === "tb" ? (
            <>
              <select
                name="technicalLength"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select Technical Length</option>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">1 hour</option>
              </select>
              <select
                name="behavioralLength"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select Behavioral Length</option>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">1 hour</option>
              </select>
            </>
          ) : (
            <select
              name="interviewLength"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select Length</option>
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="45">45 minutes</option>
              <option value="60">1 hour</option>
            </select>
          )}
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
