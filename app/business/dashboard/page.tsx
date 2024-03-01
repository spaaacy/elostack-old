import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import Dashboard from "@/components/business/dashboard/dashboard";

const Page = async () => {
  return (
    <>
      <NavBar />
      <div>
        <Dashboard />
      </div>
    </>
  );
};

export default Page;
