"use client";

import GoogleAnalytics from "@/components/common/GoogleAnalytics";
import { UserProvider } from "@/context/UserContext";
import "@/styles/globals.css";
import Script from "next/script";

// Removed the export statement for metadata
const metadata = {
  title: "EloStack",
  description: "Connecting business with developers",
};

export default function RootLayout({ children }) {
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
