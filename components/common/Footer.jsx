import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-auto text-center py-2 text-sm text-white font-light ">
      Copyright © 2024 EloStack, Inc. All Rights Reserved.
      <div className="flex justify-center items-center gap-2">
        <Link href="/terms-and-conditions.html" className="hover:underline text-white">
          Terms & Conditions.
        </Link>
        <Link href="/privacy-notice.html" className="hover:underline text-white">
          Privacy Notice.
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
