import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { METALS } from "@/data/metals";
import { COMPANY } from "@/data/company";
import { DisplayLines, Eyebrow, Section } from "@/components/ui";
import MetalExplorer from "@/components/MetalExplorer";
import EnquiryForm from "@/components/EnquiryForm";

export const metadata: Metadata = {
  title: "Metals",
  description:
    "Platinum, Palladium, Iridium, Ruthenium, Rhodium and Osmium — forms, applications and specifications supplied by BH Overseas.",
  alternates: { canonical: "/metals" },
};

/**
 * Deep content for each metal in one crawlable document. The explorer is the
 * experience; this reference table is what a search engine and a procurement
 * engineer both want — every form and application on one page.
 */
export default function MetalsPage() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Platinum Group Metals supplied by BH Overseas",
    itemListElement: METALS.map((metal, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: metal.name,
        description: metal.description,
        category: "Platinum Group Metals",
        material: metal.forms.join(", "),
        brand: { "@type": "Organization", name: COMPANY.name },
      },
    })),
  };

  return (
    <main id="main">
      <Section className="explorer" style={{ paddingTop: "calc(var(--nav-h) + 4rem)" }}>
        <div className="explorer__head">
          <div>
            <Eyebrow style={{ marginBottom: "1.75rem" }}>Our products</Eyebrow>
            <DisplayLines as="h1" lines={["The Platinum Group"]} />
          </div>
          <p className="body-copy" data-reveal style={{ maxWidth: "34ch" }}>
            BH Overseas focuses on the sourcing, refining and supply of Platinum
            Group Metals and selected specialty precious metals.
          </p>
        </div>

        <MetalExplorer />
      </Section>

      <Section light labelledBy="referenceTitle">
        <Eyebrow style={{ marginBottom: "1.75rem" }}>Reference</Eyebrow>
        <DisplayLines
          id="referenceTitle"
          size="md"
          lines={["Forms and applications", "in full."]}
        />

        <div className="caps" style={{ marginTop: "3rem" }}>
          {METALS.map((metal, i) => (
            <article className="cap" key={metal.id} data-reveal style={{ "--reveal-delay": `${i * 80}ms` } as CSSProperties}>
              <span className="cap__idx">{metal.number}</span>
              <h2 className="cap__name">
                {metal.name}{" "}
                <span style={{ fontSize: "0.5em", opacity: 0.55 }}>{metal.symbol}</span>
              </h2>
              <div>
                <p className="cap__copy">{metal.description}</p>
                <p className="spec__inline" style={{ marginTop: "1rem" }}>
                  <b>Forms</b> — {metal.forms.join(", ").toLowerCase()}
                  {metal.formsNote ? `, ${metal.formsNote}` : ""}.
                </p>
                <p className="spec__inline">
                  <b>Applications</b> — {metal.applications.join(", ").toLowerCase()}.
                </p>
              </div>
            </article>
          ))}
        </div>

        <p className="caveat" style={{ marginTop: "2.5rem" }}>
          The availability of individual metals, purities and forms may vary
          depending on market conditions and sourcing. For specific requirements,
          please provide the metal, purity, form and quantity required.
        </p>
      </Section>

      <Section id="enquiry" labelledBy="enquiryTitle">
        <EnquiryForm />
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
    </main>
  );
}
