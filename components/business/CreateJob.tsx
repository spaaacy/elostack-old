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
      position,
      remote,
    });
  };

  const handlePosition = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPosition(e.target.value);
  };

  const handleRemote = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRemote(e.target.value);
  };

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [minimumPay, setMinimumPay] = useState("");
  const [maximumPay, setMaximumPay] = useState("");
  const [position, setPosition] = useState("junior");
  const [remote, setRemote] = useState("onsite");
  const [location, setLocation] = useState("");

  return (
    <form className="flex flex-col gap-2 w-[720px] items-start" onSubmit={(e) => handleSubmit(e)}>
      <h1 className="text-4xl font-bold mb-4">Create new job listing</h1>
      <input
        onChange={(e) => setTitle(e.target.value)}
        className="input-box w-full"
        placeholder="Job Title"
        type="text"
      />
      <textarea
        onChange={(e) => setDescription(e.target.value)}
        className="input-box resize-none w-full"
        placeholder="Job Description"
      />
      <div className="flex gap-2 w-full">
        <input
          onChange={(e) => setLocation(e.target.value)}
          className="input-box w-full"
          placeholder="Location"
          type="text"
        />
        <select
          defaultValue={"onsite"}
          className="rounded-xl px-4 py-2 border-2"
          value={remote}
          onChange={handleRemote}
          name="remote"
        >
          <option value={"onsite"}>On-Site</option>
          <option value={"remote"}>Remote</option>
        </select>
      </div>
      <div className="flex items-center w-full gap-2">
        <p className="font-bold">$</p>
        <input
          onChange={(e) => setMinimumPay(e.target.value)}
          className="input-box w-full"
          placeholder="Minimum Pay"
          type="text"
        />
        <p className="font-bold  mx-2">-</p>
        <p className="font-bold">$</p>
        <input
          onChange={(e) => setMaximumPay(e.target.value)}
          className="input-box w-full"
          placeholder="Maximum Pay"
          type="text"
        />
        <select
          defaultValue={"junior"}
          className="rounded-xl px-4 py-2 border-2"
          value={position}
          onChange={handlePosition}
          name="position"
        >
          <option value={"intern"}>Intern</option>
          <option value={"junior"}>Junior</option>
          <option value={"senior"}>Senior</option>
        </select>
      </div>
      <button className="outline-button self-end" type="submit">
        Submit
      </button>
    </form>
  );
};
