import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex flex-col flex-1 justify-center">
        <h1 className="mx-auto text-6xl font-bold mt-8">
          Connecting developers with employers.
        </h1>
      </div>
      <Footer />
    </main>
  );
}
