import NavBar from "@/components/NavBar";
import Dashboard from "@/components/individual/dashboard/Dashboard";
const Page = async () => {
  return (
    <main className="flex flex-1 flex-col">
      <NavBar />
      <div className="flex flex-1">
        <Dashboard />
      </div>
    </main>
  );
};

export default Page;
