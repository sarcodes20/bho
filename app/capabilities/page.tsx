import type { Metadata } from "next";
import {
  Capabilities,
  SecondaryMaterials,
  MaterialBand,
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
      <MaterialBand />
      <SecondaryMaterials />
      <Contact />
    </main>
  );
}
