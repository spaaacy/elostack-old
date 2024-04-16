"use client";
import GoogleAnalytics from "@/components/common/GoogleAnalytics";
import { UserProvider } from "@/context/UserContext";
import "@/styles/globals.css";
import Script from "next/script";
import { usePathname } from "next/navigation";

const getTitle = (pathname) => {
  if (pathname.startsWith("/emailing")) {
    return "EloStack | Emailing";
  } else if (pathname.startsWith("/plans")) {
    return "EloStack | Plans";
  } else if (pathname.startsWith("/applications")) {
    return "EloStack | Applications";
  } else if (pathname.startsWith("/edit-profile")) {
    return "EloStack | Edit Profile";
  } else if (pathname.startsWith("/signin")) {
    return "EloStack | Sign In";
  } else if (pathname.startsWith("/signup")) {
    return "EloStack | Sign Up";
  } else if (pathname.startsWith("/individual/")) {
    return "EloStack | Profile";
  } else {
    return "EloStack";
  }
};

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const title = getTitle(pathname);

  const metadata = {
    title,
    description: "EloStack helps job seekers land their dream jobs through targeted email campaigns, connecting them directly with top companies and recruiters.",
  };

  return (
    <html lang="en">
      <head>
        <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className="flex flex-col min-h-screen bg-[#0f0f1c]">
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}