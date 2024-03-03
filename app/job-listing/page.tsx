import NavBar from "@/components/common/NavBar";
import JobListing from "@/components/individual/job-listing/JobListing";
import Footer from "@/components/common/Footer";

const Page = async () => {
  return (
    <main className="flex flex-1 flex-col">
      <NavBar />
      <div className="flex flex-1">
        <JobListing />
      </div>
      <Footer />
    </main>
  );
};

export default Page;
