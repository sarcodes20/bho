import type { CSSProperties } from "react";
import { COMPANY } from "@/data/company";
import { Arrow, DisplayLines, Eyebrow, Section } from "@/components/ui";
import MetalExplorer from "@/components/MetalExplorer";

const delay = (ms: number) =>
  ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

/* ======================================================== STATEMENT ===== */
export function Statement() {
  return (
    <Section id="about" tight labelledBy="statementTitle">
      <div className="statement__grid">
        <div>
          <Eyebrow style={{ marginBottom: "2rem" }}>
            {COMPANY.statement.eyebrow}
          </Eyebrow>
          <DisplayLines
            id="statementTitle"
            className="statement__title"
            lines={COMPANY.statement.title}
          />
        </div>

        <div className="statement__aside">
          <div data-reveal style={delay(160)}>
            {COMPANY.statement.copy.map((p) => (
              <p className="body-copy" key={p}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ========================================================== COMPANY ===== */
export function About() {
  return (
    <Section light tight labelledBy="companyTitle">
      <div className="about__grid">
        <div>
          <Eyebrow style={{ marginBottom: "2rem" }}>{COMPANY.about.eyebrow}</Eyebrow>
          <DisplayLines
            id="companyTitle"
            size="md"
            lines={COMPANY.about.title}
            className="mb-8"
          />
          <div data-reveal style={delay(140)}>
            {COMPANY.about.copy.map((p) => (
              <p className="body-copy" key={p.slice(0, 40)}>
                {p}
              </p>
            ))}
          </div>

          <ul className="milestones milestones--about" data-reveal style={delay(200)}>
            {COMPANY.milestones.map((m) => (
              <li className="milestone" key={m.year}>
                <span className="milestone__year">{m.year}</span>
                <span className="milestone__label">{m.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal style={delay(220)}>
          <dl className="facts facts--top">
            {COMPANY.about.facts.map((f) => (
              <div className="fact" key={f.k}>
                <dt className="fact__k">{f.k}</dt>
                <dd className="fact__v">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}

/* =========================================================== METALS ===== */
export function Metals() {
  return (
    <Section id="metals" className="explorer" tone="midnight" labelledBy="metalsTitle">
      <div className="explorer__head">
        <div>
          <Eyebrow style={{ marginBottom: "1.75rem" }}>Our products</Eyebrow>
          <DisplayLines id="metalsTitle" lines={["The Platinum Group"]} />
        </div>
        <p className="body-copy" data-reveal style={{ ...delay(160), maxWidth: "34ch" }}>
          Six metals form our principal focus. Select one to see its forms
          and the applications it serves.
        </p>
      </div>

      <MetalExplorer />
    </Section>
  );
}

/* ======================================================== CHEMICALS ===== */
export function Chemicals() {
  const c = COMPANY.chemicals;
  return (
    <Section id="chemicals" tone="mist" tight labelledBy="chemicalsTitle">
      <div className="explorer__head">
        <div>
          <Eyebrow style={{ marginBottom: "1.75rem" }}>{c.eyebrow}</Eyebrow>
          <DisplayLines id="chemicalsTitle" size="md" lines={c.title} />
        </div>
        <p className="body-copy" data-reveal style={{ ...delay(160), maxWidth: "34ch" }}>
          {c.copy}
        </p>
      </div>

      <ul className="chem-list" data-reveal style={delay(120)}>
        {c.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Section>
  );
}

/* ===================================================== CAPABILITIES ===== */
export function Capabilities() {
  return (
    <Section id="capabilities" tone="ivory" tight labelledBy="capsTitle">
      <div className="explorer__head">
        <div>
          <Eyebrow style={{ marginBottom: "1.5rem" }}>Capabilities</Eyebrow>
          <DisplayLines id="capsTitle" size="md" lines={["From source", "to specification."]} />
        </div>
      </div>

      <div className="caps caps--compact">
        {COMPANY.capabilities.map((c, i) => (
          <article className="cap" key={c.id} data-reveal style={delay(i * 90)}>
            <span className="cap__idx">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="cap__name">{c.name}</h3>
            <p className="cap__copy">{c.copy}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* ============================================ SECONDARY MATERIALS ======= */
export function SecondaryMaterials() {
  const s = COMPANY.secondary;
  return (
    <Section
      id="secondary"
      labelledBy="secondaryTitle"
      tone="graphite"
    >
      <div className="explorer__head">
        <div>
          <Eyebrow style={{ marginBottom: "1.75rem" }}>{s.eyebrow}</Eyebrow>
          <DisplayLines id="secondaryTitle" lines={s.title} />
        </div>
        <p className="body-copy" data-reveal style={{ ...delay(160), maxWidth: "34ch" }}>
          {s.copy}
        </p>
      </div>

      <div style={{ marginBottom: "clamp(2.5rem,1.5rem + 3vw,4rem)" }} data-reveal>
        <p className="spec__label" style={{ marginBottom: "1.25rem" }}>
          Materials considered
        </p>
        <ul className="material-list">
          {s.materials.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
        <p className="caveat">{s.caveat}</p>
      </div>

      <div data-reveal style={delay(120)}>
        <p className="spec__label" style={{ marginBottom: "1.25rem" }}>
          Route
        </p>
        <div className="flow">
          {s.flow.map((step, i) => (
            <div
              className={`flow__step${step.terminal ? " flow__step--terminal" : ""}`}
              key={step.name}
            >
              <span className="flow__idx">{String(i + 1).padStart(2, "0")}</span>
              <span className="flow__name">{step.name}</span>
              <span className="flow__note">{step.note}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ========================================================= APPROACH ===== */
export function Approach() {
  return (
    <Section id="approach" tone="mist" tight labelledBy="approachTitle">
      {/* Compact by design: four short commitments in one row, not four
          full-height sections. */}
      <div className="approach">
        <div className="approach__head">
          <Eyebrow style={{ marginBottom: "1rem" }}>Our approach</Eyebrow>
          <h2 className="approach__title" id="approachTitle">
            Precision begins with knowing exactly what the material is.
          </h2>
        </div>
        <div className="principles">
          {COMPANY.principles.map((p, i) => (
            <article className="principle" key={p.name} data-reveal style={delay(i * 90)}>
              <h3 className="principle__name">{p.name}</h3>
              <p className="principle__copy">{p.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ========================================================== CONTACT ===== */
/**
 * @param enquiryHref where the CTA points. Defaults to the in-page form; pages
 * that do not carry the form pass the dedicated /contact route instead.
 */
export function Contact() {
  return (
    <Section id="contact" className="hairline-top" labelledBy="contactTitle">
      <div className="contact__grid">
        <div>
          <Eyebrow style={{ marginBottom: "2rem" }}>{COMPANY.contact.eyebrow}</Eyebrow>
          <DisplayLines
            id="contactTitle"
            className="contact__title"
            lines={COMPANY.contact.title}
          />
        </div>

        {/* The address is the action — set at display size rather than buried
            in a row of channels, since it is the only one. */}
        <div className="contact__channels" data-reveal style={delay(160)}>
          <a className="contact__email link" href={`mailto:${COMPANY.email}`}>
            {COMPANY.email}
          </a>

          <div className="contact__hq">
            <h3 className="contact__hq-title">Headquarters</h3>
            <address className="contact__hq-address">
              {COMPANY.headquarters.lines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
          </div>
        </div>
      </div>
    </Section>
  );
}
