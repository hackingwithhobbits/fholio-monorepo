import type { Metadata } from "next";
import "./globals.css";
import "../styles/globals.css";
import { SWRProvider } from "@/providers/SWRProvider";

export const metadata: Metadata = {
  title: "Fholio - Music Investment Platform",
  description: "Discover, invest, and support emerging artists",
  keywords: ["music", "investment", "artists", "streaming"],
};

// This could include server-side theme detection, user agent parsing, etc.
async function getServerSideProps() {
  return {
    theme: "dark", // Could be determined server-side
    locale: "en-US",
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const serverProps = await getServerSideProps();

  return (
    <html lang="en" className={serverProps.theme}>
      <head>
        {/* Server-side meta tags, fonts, etc. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>

      <body className="antialiased">
        {/* Any server-side providers or wrappers */}
        <SWRProvider>{children}</SWRProvider>
      </body>
    </html>
  );
}
