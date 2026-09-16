import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, Instrument_Serif } from "next/font/google";
import { COMPANY } from "@/data/company";
import { NOINDEX } from "./robots";
import ScrollReveal from "@/components/ScrollReveal";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-serif",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.meta.url),
  title: {
    default: COMPANY.meta.title,
    template: "%s | BH Overseas",
  },
  description: COMPANY.meta.description,
  applicationName: COMPANY.name,
  keywords: [
    "Platinum Group Metals",
    "PGM",
    "platinum",
    "palladium",
    "iridium",
    "ruthenium",
    "rhodium",
    "osmium",
    "precious metals refining",
    "precious metals trading",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: COMPANY.name,
    title: COMPANY.meta.title,
    description: COMPANY.meta.description,
    url: COMPANY.meta.url,
    locale: COMPANY.meta.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: COMPANY.meta.title,
    description:
      "Sourcing, refining, trading and supply of Platinum, Palladium, Iridium, Ruthenium, Rhodium and Osmium.",
  },
  // robots.txt is only a request; the meta tag is what actually keeps a demo
  // out of the index. Both read the same flag.
  robots: NOINDEX
    ? { index: false, follow: false, nocache: true }
    : { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0B0C0D",
  colorScheme: "dark",
};

/**
 * Organization data. Every field is drawn from the company document — no
 * address, telephone or identifier is asserted, because none was supplied.
 */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: COMPANY.name,
  url: COMPANY.meta.url,
  description: COMPANY.meta.description,
  foundingDate: COMPANY.foundedYear,
  email: COMPANY.email,
  knowsAbout: [
    "Platinum Group Metals",
    "Precious metals refining",
    "Precious metals trading",
    "PGM-bearing secondary materials",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${inter.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <div className="grain" aria-hidden="true" />

        <Nav />
        {children}
        <Footer />

        <ScrollReveal />

        <script
          type="application/ld+json"
          // Static, author-controlled string — no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
