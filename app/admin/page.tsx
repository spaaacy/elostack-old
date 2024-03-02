import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import Admin from "@/components/admin/admin";

const Page = async () => {
  return (
    <>
      <NavBar />
      <div>
        <Admin />
      </div>
    </>
  );
};

export default Page;
