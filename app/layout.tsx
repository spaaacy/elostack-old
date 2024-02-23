"use client";
import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";

// Removed the export statement for metadata
const metadata = {
  title: "EloStack",
  description: "Connecting business with developers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Metadata usage remains unchanged */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className="flex flex-col min-h-screen">
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
