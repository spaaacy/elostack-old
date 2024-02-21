import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex flex-col flex-1 justify-center">
        <h1 className="mx-auto text-6xl font-bold mt-8">
          Connecting developers with employers.
        </h1>
        <div className="flex justify-center items-center gap-4 mt-6">
          <Link
            href={"/business"}
            className="border border-gray-800 text-lg font-normal rounded-lg py-2 px-4"
          >
            Businesses
          </Link>
          <Link
            href={"/individual"}
            className="border border-gray-800 text-lg font-normal rounded-lg py-2 px-4"
          >
            Individuals
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
