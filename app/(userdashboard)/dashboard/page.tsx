import NavBar from "@/components/NavBar";
import Dashboard from "@/components/individual/dashboard/Dashboard";
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
