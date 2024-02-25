import NavBar from "@/components/NavBar";
import Scheduling from "@/components/Individual/interview-scheduling/interview-scheduling";

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
