import { Individual } from "@/types/Individual";
import React, { useContext, useEffect, useState } from "react";
import IndividualCard from "./IndividualCard";
import { UserContext } from "@/context/UserContext";

const SearchCandidates = () => {
  const [individuals, setIndividuals] = useState();
  const { session } = useContext(UserContext);

  useEffect(() => {
    if (session) {
      fetchIndividuals();
    }
  }, [session]);

  const fetchIndividuals = async () => {
    const response = await fetch("/api/individual", { method: "GET" });
    const results = await response.json();
    if (response.status === 200) {
      setIndividuals(results.data);
    } else {
      console.error(results.error);
    }
  };

  return (
    <ul className="flex flex-col gap-4 w-full">
      {individuals &&
        individuals.map((individual, i) => {
          return (
            <li key={individual.user_id}>
              <IndividualCard individual={individual} />
            </li>
          );
        })}
    </ul>
  );
};

export default SearchCandidates;
