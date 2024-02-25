import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import Scheduling from "@/components/individual/interview-scheduling/InterviewScheduling";

const Page = async () => {
  return (
    <>
      <NavBar />
      <div>
        <Scheduling />
      </div>
    </>
  );
};

export default Page;
