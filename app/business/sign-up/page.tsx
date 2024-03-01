import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import SignUp from "@/components/business/sign-up/SignUp";

const Page = async () => {
  return (
    <>
      <NavBar />
      <div>
        <SignUp />
      </div>
    </>
  );
};

export default Page;
