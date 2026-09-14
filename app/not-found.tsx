import Link from "next/link";
import { Arrow, DisplayLines, Eyebrow, Section } from "@/components/ui";

export default function NotFound() {
  return (
    <main id="main" style={{ paddingTop: "var(--nav-h)", minHeight: "70svh" }}>
      <Section>
        <Eyebrow style={{ marginBottom: "2rem" }}>404</Eyebrow>
        <DisplayLines as="h1" lines={["This page", "is not in stock."]} />
        <p className="lede" style={{ marginTop: "2rem" }}>
          The page you asked for does not exist. The metals, capabilities and
          enquiry form are all a click away.
        </p>
        <div style={{ marginTop: "2.5rem", display: "flex", gap: "0.85rem", flexWrap: "wrap" }}>
          <Link className="btn" href="/">
            Return home
            <Arrow />
          </Link>
          <Link className="btn btn--ghost" href="/metals">
            View the metals
          </Link>
        </div>
      </Section>
    </main>
  );
}
