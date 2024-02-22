import { JobListing } from "@/types/JobListing";
import Link from "next/link";
import { FC } from "react";

interface JobListingItemProps {
  listing: JobListing;
}

const JobListingItem: FC<JobListingItemProps> = ({ listing }) => {
  return (
    <Link href={`/listings/${listing.id}`}>
      <div className="bg-gray-200 rounded-md p-4">
        <h2 className="font-semibold">{listing.title}</h2>
        <h2>{listing.description}</h2>
        <div className="flex justify-between">
          <h2>{listing.location}</h2>
          <div className="flex">
            <h2>{`$${listing.minimumPay}`}</h2>
            <p>{"-"}</p>
            <h2>{`$${listing.maximumPay}`}</h2>
          </div>
        </div>
        <h2>{listing.remote}</h2>
      </div>
    </Link>
  );
};

export default JobListingItem;
