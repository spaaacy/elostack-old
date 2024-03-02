import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import JobListing from "@/components/business/job-listing/EditJobListing";

const Page = async () => {
  return (
    <>
      <NavBar />
      <div>
        <JobListing />
      </div>
    </>
  );
};

export default Page;
