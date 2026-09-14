import Hero from "@/components/Hero";
import MetalIndexBar from "@/components/MetalIndexBar";
import EnquiryForm from "@/components/EnquiryForm";
import { Section } from "@/components/ui";
import {
  About,
  Approach,
  Capabilities,
  Contact,
  Metals,
  SecondaryMaterials,
  Specimens,
  Statement,
} from "@/components/Sections";

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <MetalIndexBar />

      {/* The company: the post-hero editorial moment, then the fuller story. */}
      <Statement />
      <About />

      {/* The products. */}
      <Metals />
      <Specimens />

      {/* What we do with them. */}
      <Capabilities />
      <SecondaryMaterials />
      <Approach />

      {/* Conversion. */}
      <Section id="enquiry" labelledBy="enquiryTitle">
        <EnquiryForm />
      </Section>
      <Contact />
    </main>
  );
}
