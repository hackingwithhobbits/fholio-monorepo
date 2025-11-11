import type { Metadata } from "next";
import "./globals.css";
import "../styles/globals.css";
import { SWRProvider } from "@/providers/SWRProvider";
import { ClientLayout } from "@/components/ClientLayout";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Fholio - Fantasy League for Music",
  description: "Discover, play, invest, and support emerging artists",
  keywords: ["music", "dicover", "artists", "streaming"],
};

async function getServerSideProps() {
  return {
    theme: "dark",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>

      <body className="antialiased">
        <SWRProvider>
          <ClientLayout>{children}</ClientLayout>
          <Toaster />
        </SWRProvider>
      </body>
    </html>
  );
}
