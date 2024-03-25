import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-auto text-center py-2 text-sm text-white font-light ">
      Copyright © 2024 EloStack, Inc. All Rights Reserved.
      <div>
        <Link href="/terms-and-conditions.html" className="hover:underline text-white">
          Terms & Conditions.
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
