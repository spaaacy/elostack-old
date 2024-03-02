import EditProfile from "@/components/business/profile/EditProfile";
import NavBar from "@/components/NavBar";
const Accounts = () => (
  <main>
    <NavBar />
    <div className="flex h-screen">
      <EditProfile />
    </div>
  </main>
);

export default Accounts;
