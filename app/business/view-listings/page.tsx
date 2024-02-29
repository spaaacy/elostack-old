import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import Listings from "@/components/business/view-listings/ViewListings";

const Page = async () => {
  return (
    <>
      <NavBar />
      <div>
        <Listings />
      </div>
    </>
  );
};

export default Page;
