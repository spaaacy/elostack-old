"use client";

import { useState } from "react";

export const CreateJob = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({
      title,
      description,
      minimumPay,
      maximumPay,
    });
  };

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [minimumPay, setMinimumPay] = useState("");
  const [maximumPay, setMaximumPay] = useState("");

  return (
    <form className="flex flex-col gap-2 w-[720px] items-start" onSubmit={(e) => handleSubmit(e)}>
      <h1 className="text-4xl font-bold mb-4">Create new job listing</h1>
      <input
        onChange={(e) => setTitle(e.target.value)}
        className="input-box  w-full"
        placeholder="Job Title"
        type="text"
      />
      <textarea
        onChange={(e) => setDescription(e.target.value)}
        className="input-box resize-none w-full"
        placeholder="Job Description"
      />
      <div className="flex gap-4 items-center">
        <input
          onChange={(e) => setMinimumPay(e.target.value)}
          className="input-box"
          placeholder="Minimum Pay"
          type="text"
        />
        <p>-</p>
        <input
          onChange={(e) => setMaximumPay(e.target.value)}
          className="input-box"
          placeholder="Maximum Pay"
          type="text"
        />
      </div>
      {/* TODO: Add dropdown for type of job */}
      <button className="outline-button self-end" type="submit">
        Submit
      </button>
    </form>
  );
};
