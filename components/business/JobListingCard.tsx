import { JobListing } from "@/types/JobListing";
import Link from "next/link";
import { FC } from "react";

interface JobListingCardProps {
  listing: JobListing;
}

const JobListingCard: FC<JobListingCardProps> = ({ listing }) => {
  const handleDelete = async () => {
    const response = await fetch("/api/job-listing/delete", {
      method: "DELETE",
      body: JSON.stringify({ id: listing.id }),
    });
    if (response.status === 200) {
      window.location.reload();
      console.log("Job listing deleted successfully.");
    }
  };

  return (
    <div>
      <div className="bg-gray-200 rounded-md p-4 flex flex-col">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold">{listing.title}</h2>
          <div className="flex">
            <h2>{`$${listing.starting_pay}`}</h2>
            <p>{"-"}</p>
            <h2>{`$${listing.ending_pay}`}</h2>
          </div>
        </div>
        <h2>{listing.description}</h2>
        <div className="flex justify-between">
          <h2>{listing.location}</h2>
          <div className="flex justify-center items-center gap-4">
            <Link className="text-blue-600 text-sm" href={`job-listing/${listing.id}`}>
              Details
            </Link>
            <button onClick={handleDelete} className="text-sm bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
              Delete
            </button>
          </div>
        </div>
        <h2>{listing.remote}</h2>
      </div>
    </div>
  );
};

export default JobListingCard;
