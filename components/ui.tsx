import type { CSSProperties, ReactNode } from "react";

/** The technical micro-label used above every section heading. */
export function Eyebrow({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <p className={`eyebrow ${className}`.trim()} data-reveal style={style}>
      {children}
    </p>
  );
}

/**
 * A display heading whose lines rise into place independently.
 *
 * Lines are authored explicitly rather than measured at runtime: the break
 * points are a typographic decision, and letting the browser choose them would
 * animate whatever ragged shape the viewport happened to produce.
 */
export function DisplayLines({
  lines,
  as: Tag = "h2",
  size = "lg",
  id,
  className = "",
}: {
  lines: readonly string[];
  as?: "h1" | "h2" | "h3";
  size?: "xl" | "lg" | "md" | "sm";
  id?: string;
  className?: string;
}) {
  return (
    <Tag
      id={id}
      className={`display display--${size} reveal-lines ${className}`.trim()}
    >
      {lines.map((line, i) => (
        <span className="line" key={line}>
          {/* Custom properties are not in CSSProperties, hence the assertion. */}
          <span style={{ "--i": i } as CSSProperties}>{line}</span>
        </span>
      ))}
    </Tag>
  );
}

/** Right-pointing arrow used inside buttons. */
export function Arrow() {
  return (
    <span className="btn__arrow" aria-hidden="true">
      &#8594;
    </span>
  );
}

/** Section wrapper: consistent vertical rhythm and shell width. */
export function Section({
  id,
  children,
  light = false,
  tight = false,
  className = "",
  style,
  labelledBy,
}: {
  id?: string;
  children: ReactNode;
  light?: boolean;
  tight?: boolean;
  className?: string;
  style?: CSSProperties;
  labelledBy?: string;
}) {
  const classes = [
    "section",
    tight ? "section--tight" : "",
    light ? "ctx-light" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section id={id} className={classes} style={style} aria-labelledby={labelledBy}>
      <div className="shell">{children}</div>
    </section>
  );
}
