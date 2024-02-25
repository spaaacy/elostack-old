import NavBar from "@/components/NavBar";
import Applications from "@/components/individual/applications/TrackApplications";

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
