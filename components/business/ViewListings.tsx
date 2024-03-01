import { JobListing } from "@/types/JobListing";
import JobListingCard from "./JobListingCard";
import { useContext, useEffect, useState } from "react";
import { UserContext, UserContextType } from "@/context/UserContext";

const ViewListings = () => {
  const [jobListings, setJobListings] = useState();
  const { user } = useContext(UserContext) as UserContextType;

  useEffect(() => {
    if (user) {
      fetchListings();
    }
  }, [user]);

  const fetchListings = async () => {
    const response = await fetch(`/api/job-listing?business_id=${user.user_id}`, {
      method: "GET",
    });
    if (response.status === 200) {
      const results = await response.json();
      setJobListings(results.data);
    }
  };

  return (
    <ul className="flex flex-col gap-4 w-full">
      {jobListings &&
        jobListings.map((listing, i) => {
          return (
            <li key={listing.id}>
              <JobListingCard listing={listing} />
            </li>
          );
        })}
    </ul>
  );
};

export default ViewListings;
