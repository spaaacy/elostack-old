import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import RequestInterview from "@/components/business/request-interview/RequestInterview";

const Page = async () => {
  return (
    <>
      <NavBar />
      <div>
        <RequestInterview />
      </div>
    </>
  );
};

export default Page;
