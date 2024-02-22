import NavBar from "@/components/NavBar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const Page = async () => {
  const session = await getServerSession(authOptions);

  return (
    <>
      <NavBar />
      <div>Welcome to admin</div>
    </>
  );
};

export default Page;
