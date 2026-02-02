import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Trump-Hollow Builders | Structure, Durability, and Development",
    template: "%s | Trump-Hollow Builders"
  },
  description: "Full-service custom remodel contractor specializing in kitchens, baths, and high-end architectural woodworking. 100+ years combined experience. Structure, durability, and development.",
  keywords: [
    "custom remodel contractor",
    "kitchen remodeling",
    "bathroom renovation",
    "custom cabinetry",
    "architectural woodworking",
    "home additions",
    "built-ins",
    "custom stairways",
    "heirloom furniture"
  ],
  authors: [{ name: "Trump-Hollow Builders LLC" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Trump-Hollow Builders",
    title: "Trump-Hollow Builders | Structure, Durability, and Development",
    description: "Full-service custom remodel contractor. Structure, durability, and development.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        <Header />
        <main className="pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
