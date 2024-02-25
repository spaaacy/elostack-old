import NavBar from "@/components/NavBar";
import JobListing from "@/components/Individual/joblisting/JobListing";

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
