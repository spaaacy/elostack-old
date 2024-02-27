import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import Search from "@/components/business/search/CandidateSearch";

const Page = async () => {
  return (
    <>
      <NavBar />
      <div>
        <Search />
      </div>
    </>
  );
};

export default Page;
