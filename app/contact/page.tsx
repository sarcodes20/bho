import type { Metadata } from "next";
import EnquiryForm from "@/components/EnquiryForm";
import { Contact } from "@/components/Sections";
import { Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us your requirements. BH Overseas responds to enquiries by email.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main id="main" style={{ paddingTop: "var(--nav-h)" }}>
      <Section id="enquiry" labelledBy="enquiryTitle">
        <EnquiryForm />
      </Section>
      <Contact />
    </main>
  );
}
