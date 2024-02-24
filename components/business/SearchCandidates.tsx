import { Individual } from "@/types/Individual";
import React from "react";
import IndividualCard from "./IndividualCard";

const SearchCandidates = () => {
  const individuals: Individual[] = [
    { id: 1, firstName: "John", lastName: "Doe", prospectivePosition: "Intern", age: 20, experience: 0 },
    { id: 2, firstName: "Jane", lastName: "Smith", prospectivePosition: "Intern", age: 21, experience: 0 },
    { id: 3, firstName: "Alice", lastName: "Johnson", prospectivePosition: "Intern", age: 19, experience: 0 },
    { id: 4, firstName: "Bob", lastName: "Williams", prospectivePosition: "Intern", age: 22, experience: 1 },
    { id: 5, firstName: "Eva", lastName: "Brown", prospectivePosition: "Intern", age: 20, experience: 0 },
    { id: 6, firstName: "Michael", lastName: "Jones", prospectivePosition: "Intern", age: 23, experience: 2 },
    { id: 7, firstName: "Sophia", lastName: "Miller", prospectivePosition: "Intern", age: 19, experience: 0 },
    { id: 8, firstName: "William", lastName: "Wilson", prospectivePosition: "Intern", age: 20, experience: 0 },
    { id: 9, firstName: "Olivia", lastName: "Taylor", prospectivePosition: "Intern", age: 21, experience: 1 },
    { id: 10, firstName: "Daniel", lastName: "Anderson", prospectivePosition: "Intern", age: 24, experience: 1 },
    { id: 11, firstName: "Emma", lastName: "Moore", prospectivePosition: "Intern", age: 20, experience: 0 },
    { id: 12, firstName: "James", lastName: "Martin", prospectivePosition: "Intern", age: 22, experience: 0 },
    { id: 13, firstName: "Lily", lastName: "White", prospectivePosition: "Intern", age: 21, experience: 0 },
    { id: 14, firstName: "Aiden", lastName: "Harris", prospectivePosition: "Intern", age: 20, experience: 1 },
    { id: 15, firstName: "Isabella", lastName: "Clark", prospectivePosition: "Intern", age: 23, experience: 2 },
    { id: 16, firstName: "Logan", lastName: "Evans", prospectivePosition: "Intern", age: 21, experience: 0 },
    { id: 17, firstName: "Mia", lastName: "Turner", prospectivePosition: "Intern", age: 20, experience: 0 },
    { id: 18, firstName: "David", lastName: "Wright", prospectivePosition: "Intern", age: 22, experience: 0 },
    { id: 19, firstName: "Sophie", lastName: "Baker", prospectivePosition: "Intern", age: 20, experience: 0 },
    { id: 20, firstName: "Jackson", lastName: "Young", prospectivePosition: "Intern", age: 21, experience: 1 },
  ];

  return (
    <ul className="flex flex-col gap-4 w-full">
      {individuals.map((individual, i) => {
        return (
          <li key={individual.id}>
            <IndividualCard individual={individual} />
          </li>
        );
      })}
    </ul>
  );
};

export default SearchCandidates;
