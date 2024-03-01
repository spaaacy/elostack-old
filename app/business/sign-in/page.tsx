import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import SignIn from "@/components/business/sign-in/SignIn";

const Page = async () => {
  return (
    <>
      <NavBar />
      <div>
        <SignIn />
      </div>
    </>
  );
};

export default Page;
