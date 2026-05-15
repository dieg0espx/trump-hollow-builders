import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SITE_URL } from "@/lib/site";
import { faqJsonLd, localBusinessJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
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
    url: SITE_URL,
    siteName: "Trump-Hollow Builders",
    title: "Trump-Hollow Builders | Structure, Durability, and Development",
    description: "Full-service custom remodel contractor. Structure, durability, and development.",
    images: [
      {
        url: "/dropbox/Large%20Flat001.jpg",
        width: 1200,
        height: 630,
        alt: "Trump-Hollow Builders custom remodel work",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trump-Hollow Builders | Structure, Durability, and Development",
    description: "Full-service custom remodel contractor. Structure, durability, and development.",
    images: ["/dropbox/Large%20Flat001.jpg"],
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
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <Header />
        <main className="pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
