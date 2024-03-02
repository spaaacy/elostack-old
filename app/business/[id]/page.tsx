import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
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
