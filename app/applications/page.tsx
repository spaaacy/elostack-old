import NavBar from "@/components/NavBar";
import Applications from "@/components/Individual/applications/track-applications";

const Page = async () => {
  return (
    <>
      <NavBar />
      <div>
        <Applications />
      </div>
    </>
  );
};

export default Page;
