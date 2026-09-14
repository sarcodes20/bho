import type { Metadata } from "next";
import {
  Capabilities,
  SecondaryMaterials,
  Specimens,
  Contact,
} from "@/components/Sections";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "Sourcing, refining, trading and secondary materials — how BH Overseas moves Platinum Group Metals from source to specification.",
  alternates: { canonical: "/capabilities" },
};

export default function CapabilitiesPage() {
  return (
    <main id="main" style={{ paddingTop: "var(--nav-h)" }}>
      <Capabilities />
      <Specimens />
      <SecondaryMaterials />
      <Contact enquiryHref="/contact" />
    </main>
  );
}
