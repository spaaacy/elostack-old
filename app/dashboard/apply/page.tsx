import NavBar from "@/components/NavBar";
import JobListing from "@/components/Individual/joblisting/JobListing";
import Footer from "@/components/Footer";

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
