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
  } else if (pathname.startsWith("/signin")) {
    return "EloStack | Sign In";
  } else if (pathname.startsWith("/signup")) {
    return "EloStack | Sign Up";
  } else {
    return "EloStack";
  }
};

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const title = getTitle(pathname);

  const metadata = {
    title,
    description:
      "EloStack helps job seekers land their dream jobs through targeted email campaigns, connecting them directly with top companies and recruiters.",
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

        <script type="text/javascript">
          _linkedin_partner_id = "7061681"; window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
          window._linkedin_data_partner_ids.push(_linkedin_partner_id);
        </script>
        <script type="text/javascript">
          {function (l) {
            if (!l) {
              window.lintrk = function (a, b) {
                window.lintrk.q.push([a, b]);
              };
              window.lintrk.q = [];
            }
            var s = document.getElementsByTagName("script")[0];
            var b = document.createElement("script");
            b.type = "text/javascript";
            b.async = true;
            b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
            s.parentNode.insertBefore(b, s);
          }}
          (window.lintrk);
        </script>
        <noscript>
          <img
            height="1"
            width="1"
            style="display:none;"
            alt=""
            src="https://px.ads.linkedin.com/collect/?pid=7061681&fmt=gif"
          />
        </noscript>
      </body>
    </html>
  );
}
