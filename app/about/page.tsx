import type { Metadata } from "next";
import { About, Approach, Contact, Statement } from "@/components/Sections";

export const metadata: Metadata = {
  title: "About",
  description:
    "BH Overseas has been engaged in Platinum Group Metals and other specialized precious metals since 2015, and was incorporated as a Private Limited Company in 2026.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main id="main" style={{ paddingTop: "var(--nav-h)" }}>
      <Statement />
      <About />
      <Approach />
      <Contact enquiryHref="/contact" />
    </main>
  );
}
