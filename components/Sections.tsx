import type { CSSProperties } from "react";
import Image from "next/image";
import { COMPANY } from "@/data/company";
import { Arrow, DisplayLines, Eyebrow, Section } from "@/components/ui";
import MetalExplorer from "@/components/MetalExplorer";
import TradeGraticule from "@/components/TradeGraticule";

const delay = (ms: number) =>
  ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

/* ======================================================== STATEMENT ===== */
export function Statement() {
  return (
    <Section id="about" labelledBy="statementTitle">
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

          <ul className="milestones" data-reveal style={delay(280)}>
            {COMPANY.milestones.map((m) => (
              <li className="milestone" key={m.year}>
                <span className="milestone__year">{m.year}</span>
                <span className="milestone__label">{m.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

/* ========================================================== COMPANY ===== */
export function About() {
  return (
    <Section light labelledBy="companyTitle">
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
        </div>

        <div data-reveal style={delay(220)}>
          <TradeGraticule />
          <dl className="facts">
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
    <Section id="metals" className="explorer" labelledBy="metalsTitle">
      <div className="explorer__head">
        <div>
          <Eyebrow style={{ marginBottom: "1.75rem" }}>Our products</Eyebrow>
          <DisplayLines id="metalsTitle" lines={["The Platinum Group"]} />
        </div>
        <p className="body-copy" data-reveal style={{ ...delay(160), maxWidth: "34ch" }}>
          Six metals form our principal focus. Select one to see the forms we
          supply and the applications it serves.
        </p>
      </div>

      <MetalExplorer />
    </Section>
  );
}

/* ======================================================== SPECIMENS ===== */
export function Specimens() {
  return (
    <Section light labelledBy="formsTitle">
      <div className="explorer__head">
        <div>
          <Eyebrow style={{ marginBottom: "1.75rem" }}>Forms</Eyebrow>
          <DisplayLines
            id="formsTitle"
            size="md"
            lines={["Supplied to the form", "the process requires."]}
          />
        </div>
        <p className="body-copy" data-reveal style={{ ...delay(160), maxWidth: "32ch" }}>
          Sponge, powder, wire, sheet, plate, metal and scrap — availability
          varies by metal, specification and market conditions.
        </p>
      </div>

      <div className="specimens">
        {COMPANY.specimens.map((s, i) => (
          <figure className="specimen" key={s.src} data-reveal style={delay(i * 110)}>
            <div className="specimen__frame mask-reveal">
              <span className="specimen__tag">{s.tag}</span>
              <Image
                src={s.src}
                alt={s.alt}
                width={900}
                height={675}
                sizes="(min-width: 48em) 33vw, 100vw"
              />
            </div>
            <figcaption className="specimen__caption">
              <span className="specimen__title">{s.title}</span>
              <span className="specimen__note">{s.note}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

/* ===================================================== CAPABILITIES ===== */
export function Capabilities() {
  return (
    <Section id="capabilities" labelledBy="capsTitle">
      <div className="explorer__head">
        <div>
          <Eyebrow style={{ marginBottom: "1.75rem" }}>Capabilities</Eyebrow>
          <DisplayLines id="capsTitle" lines={["From source", "to specification."]} />
        </div>
      </div>

      <div className="caps">
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
      style={{ background: "var(--graphite)" }}
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
    <Section id="approach" labelledBy="approachTitle">
      <div className="explorer__head">
        <div>
          <Eyebrow style={{ marginBottom: "1.75rem" }}>Our approach</Eyebrow>
          <DisplayLines id="approachTitle" lines={["Four principles."]} />
        </div>
        <p className="body-copy" data-reveal style={{ ...delay(160), maxWidth: "32ch" }}>
          Precision begins with knowing exactly what the material is.
        </p>
      </div>

      <div className="principles">
        {COMPANY.principles.map((p, i) => (
          <article className="principle" key={p.name} style={delay(i * 120)}>
            <span className="principle__line" aria-hidden="true" />
            <span className="principle__idx">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="principle__name">{p.name}</h3>
            <p className="principle__copy">{p.copy}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* ========================================================== CONTACT ===== */
/**
 * @param enquiryHref where the CTA points. Defaults to the in-page form; pages
 * that do not carry the form pass the dedicated /contact route instead.
 */
export function Contact({ enquiryHref = "#enquiry" }: { enquiryHref?: string }) {
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
          <p
            className="lede"
            data-reveal
            style={{ ...delay(200), marginTop: "2rem" }}
          >
            {COMPANY.contact.copy}
          </p>
          <div data-reveal style={{ ...delay(300), marginTop: "2.5rem" }}>
            <a className="btn" href={enquiryHref}>
              Tell us your requirements
              <Arrow />
            </a>
          </div>
        </div>

        {/* One published address, so one channel. The three-way split
            (Enquiries / General / Direct) existed only to distinguish three
            different addresses. */}
        <div className="contact__channels" data-reveal style={delay(160)}>
          <div className="channel">
            <span className="channel__k">Email</span>
            <a className="channel__v link" href={`mailto:${COMPANY.email}`}>
              {COMPANY.email}
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
