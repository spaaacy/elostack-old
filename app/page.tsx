import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col flex-1">
      <NavBar />
      <div className="flex flex-col flex-1 justify-center px-4">
        <h1 className="mx-auto text-6xl font-bold mt-8 text-center">
          Connecting developers with employers.
        </h1>
        <div className="flex justify-center items-center gap-4 mt-6">
          <Link href={"/business"} className="outline-button">
            Businesses
          </Link>
          <Link href={"/individual"} className="outline-button">
            Individuals
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
