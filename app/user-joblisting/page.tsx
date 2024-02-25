import NavBar from "@/components/NavBar";
import JobListing from "@/components/Individual/joblisting/JobListing";
import Footer from "@/components/Footer";

const Page = async () => {
  return (
    <>
      <NavBar />
      <div>
        <JobListing />
      </div>
      <Footer />
    </>
  );
};

export default Page;
