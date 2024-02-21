import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="px-10 py-4 flex justify-between items-center">
      <Link
        href={"/"}
        className="text-3xl font-bold font-roboto text-blueprimary"
      >
        EloStack
      </Link>
      <Link
        href={"/auth"}
        className="rounded-lg bg-gray-700 hover:bg-blueprimary text-white px-4 py-2"
      >
        Sign in
      </Link>
    </nav>
  );
};

export default NavBar;
