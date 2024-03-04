"use client";

import { UserProvider } from "@/context/UserContext";
import "@/styles/globals.css";

// Removed the export statement for metadata
const metadata = {
  title: "EloStack",
  description: "Connecting business with developers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Metadata usage remains unchanged */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className="flex flex-col min-h-screen">
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
