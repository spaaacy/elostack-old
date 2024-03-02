import Footer from "@/components/common/Footer";
import NavBar from "@/components/common/NavBar";
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
