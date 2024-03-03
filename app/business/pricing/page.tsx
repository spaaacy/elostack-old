import NavBar from "@/components/NavBar";
import Pricing from "@/components/business/pricing/Pricing";
const Accounts = () => (
  <main>
    <NavBar />
    <div className="flex h-screen">
      <Pricing />
    </div>
  </main>
);

export default Accounts;
