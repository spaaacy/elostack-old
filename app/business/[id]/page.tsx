import Footer from "@/components/common/Footer";
import NavBar from "@/components/common/NavBar";
import Profile from "@/components/business/profile/profile";

const Page = async () => {
  return (
    <>
      <NavBar />
      <div>
        <Profile />
      </div>
    </>
  );
};

export default Page;
