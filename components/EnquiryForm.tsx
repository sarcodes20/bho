"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";
import { COMPANY } from "@/data/company";
import {
  EMPTY_ENQUIRY,
  FORM_OPTIONS,
  METAL_OPTIONS,
  PREFILL_METAL_EVENT,
  mailtoHref,
  validateEnquiry,
  type Enquiry,
  type RequiredField,
} from "@/lib/enquiry";

type Status =
  | { kind: "idle" }
  | { kind: "invalid"; count: number }
  | { kind: "sent" }
  | { kind: "mailto" }
  | { kind: "error" };

type Errors = Partial<Record<RequiredField, string>>;

/** One cell of the specification grid. */
function Field({
  id,
  label,
  children,
  error,
  span,
  optional,
}: {
  id: string;
  label: string;
  children: ReactNode;
  error?: string;
  span?: boolean;
  optional?: boolean;
}) {
  return (
    <div className={`field${span ? " field--span2" : ""}${error ? " has-error" : ""}`}>
      <label className="field__label" htmlFor={id}>
        {label}{" "}
        {optional ? (
          <span className="field__opt">optional</span>
        ) : (
          <span className="field__req" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      <p className="field__error" id={`${id}-error`}>
        {error}
      </p>
    </div>
  );
}

export default function EnquiryForm() {
  const [values, setValues] = useState<Enquiry>(EMPTY_ENQUIRY);
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const formRef = useRef<HTMLFormElement>(null);

  /** The metal explorer can pre-select a metal before scrolling here. */
  useEffect(() => {
    const onPrefill = (e: Event) => {
      const metal = (e as CustomEvent<string>).detail;
      if (!METAL_OPTIONS.includes(metal)) return;
      setValues((v) => {
        const next: Enquiry = { ...v };
        next.metal = metal;
        return next;
      });
      setErrors((prev) => {
        const next = { ...prev };
        delete next.metal;
        return next;
      });
    };
    window.addEventListener(PREFILL_METAL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_METAL_EVENT, onPrefill);
  }, []);

  const set = (key: keyof Enquiry) => (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setValues((v) => {
      // Written through a typed local rather than a computed-key spread, which
      // widens to an index signature and no longer satisfies Enquiry.
      const next: Enquiry = { ...v };
      next[key] = value;
      return next;
    });

    // Clear the error as soon as the field is corrected, never on every keypress.
    const required = key as RequiredField;
    if (errors[required] && value.trim()) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[required];
        return next;
      });
    }
  };

  const focusFirstError = (found: Errors) => {
    const first = Object.keys(found)[0];
    if (!first) return;
    const el = formRef.current?.querySelector<HTMLElement>(`#f-${first}`);
    el?.focus();
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const found = validateEnquiry(values);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      setStatus({ kind: "invalid", count: Object.keys(found).length });
      focusFirstError(found);
      return;
    }

    setBusy(true);
    setStatus({ kind: "idle" });

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json()) as {
        ok: boolean;
        delivered?: boolean;
        errors?: Errors;
      };

      if (!res.ok || !data.ok) {
        if (data.errors) {
          setErrors(data.errors);
          setStatus({ kind: "invalid", count: Object.keys(data.errors).length });
          focusFirstError(data.errors);
        } else {
          setStatus({ kind: "error" });
        }
        return;
      }

      if (data.delivered) {
        setStatus({ kind: "sent" });
        setValues(EMPTY_ENQUIRY);
      } else {
        // No transport configured — hand the composed enquiry to the visitor's
        // mail client rather than claiming it was sent.
        window.location.href = mailtoHref(values);
        setStatus({ kind: "mailto" });
      }
    } catch {
      setStatus({ kind: "error" });
    } finally {
      setBusy(false);
    }
  }

  const describedBy = (key: RequiredField) =>
    errors[key] ? `f-${key}-error` : undefined;

  return (
    <div className="enquiry">
      <div className="enquiry__head">
        <div>
          <p className="eyebrow" style={{ marginBottom: "1.25rem" }}>
            {COMPANY.enquiry.eyebrow}
          </p>
          <h2 className="display display--md" id="enquiryTitle">
            Tell us what you need.
          </h2>
        </div>
        <p className="enquiry__spec-line">
          {COMPANY.enquiry.subtitle.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </p>
      </div>

      <form className="enquiry__form" ref={formRef} onSubmit={onSubmit} noValidate>
        <div className="field-grid">
          <Field id="f-metal" label="Metal" error={errors.metal}>
            <select
              className="field__control"
              id="f-metal"
              name="metal"
              value={values.metal}
              onChange={set("metal")}
              aria-invalid={Boolean(errors.metal)}
              aria-describedby={describedBy("metal")}
            >
              <option value="">Select a metal</option>
              {METAL_OPTIONS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </Field>

          <Field id="f-purity" label="Purity" error={errors.purity}>
            <input
              className="field__control"
              id="f-purity"
              name="purity"
              type="text"
              placeholder="e.g. 99.95%"
              value={values.purity}
              onChange={set("purity")}
              aria-invalid={Boolean(errors.purity)}
              aria-describedby={describedBy("purity")}
            />
          </Field>

          <Field id="f-form" label="Form" error={errors.form}>
            <select
              className="field__control"
              id="f-form"
              name="form"
              value={values.form}
              onChange={set("form")}
              aria-invalid={Boolean(errors.form)}
              aria-describedby={describedBy("form")}
            >
              <option value="">Select a form</option>
              {FORM_OPTIONS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </Field>

          <Field id="f-quantity" label="Quantity" error={errors.quantity}>
            <input
              className="field__control"
              id="f-quantity"
              name="quantity"
              type="text"
              placeholder="e.g. 500 g"
              value={values.quantity}
              onChange={set("quantity")}
              aria-invalid={Boolean(errors.quantity)}
              aria-describedby={describedBy("quantity")}
            />
          </Field>

          <Field id="f-application" label="Application" optional span>
            <input
              className="field__control"
              id="f-application"
              name="application"
              type="text"
              placeholder="e.g. thermocouple wire, catalyst, electroplating"
              value={values.application}
              onChange={set("application")}
            />
          </Field>

          <Field id="f-company" label="Company" error={errors.company}>
            <input
              className="field__control"
              id="f-company"
              name="company"
              type="text"
              autoComplete="organization"
              value={values.company}
              onChange={set("company")}
              aria-invalid={Boolean(errors.company)}
              aria-describedby={describedBy("company")}
            />
          </Field>

          <Field id="f-name" label="Name" error={errors.name}>
            <input
              className="field__control"
              id="f-name"
              name="name"
              type="text"
              autoComplete="name"
              value={values.name}
              onChange={set("name")}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={describedBy("name")}
            />
          </Field>

          <Field id="f-email" label="Email" error={errors.email}>
            <input
              className="field__control"
              id="f-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="name@company.com"
              value={values.email}
              onChange={set("email")}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={describedBy("email")}
            />
          </Field>

          <Field id="f-phone" label="Phone" optional>
            <input
              className="field__control"
              id="f-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="Include country code"
              value={values.phone}
              onChange={set("phone")}
            />
          </Field>

          <Field id="f-notes" label="Further detail" optional span>
            <textarea
              className="field__control"
              id="f-notes"
              name="notes"
              rows={4}
              placeholder="Delivery timeline, documentation, assay requirements, or anything else relevant to the specification."
              value={values.notes}
              onChange={set("notes")}
            />
          </Field>
        </div>

        <div className="enquiry__foot">
          <p className="enquiry__note">{COMPANY.enquiry.note}</p>
          <button className={`btn${busy ? " is-busy" : ""}`} type="submit" disabled={busy}>
            <span className="btn__spinner" aria-hidden="true" />
            <span className="btn__text">
              {busy ? "Submitting" : "Submit enquiry"}
            </span>
            <span className="btn__arrow" aria-hidden="true">
              &#8594;
            </span>
          </button>
        </div>

        <StatusPanel status={status} />
      </form>
    </div>
  );
}

function StatusPanel({ status }: { status: Status }) {
  if (status.kind === "idle") return null;

  const isError = status.kind === "invalid" || status.kind === "error";

  return (
    <div
      className={`form-status${isError ? " form-status--error" : ""}`}
      role="status"
      aria-live="polite"
    >
      {status.kind === "invalid" && (
        <>
          <b>
            {status.count} {status.count === 1 ? "field needs" : "fields need"}{" "}
            attention.
          </b>{" "}
          Please complete the highlighted fields and submit again.
        </>
      )}

      {status.kind === "sent" && (
        <>
          <b>Thank you — your enquiry has been received.</b> We will respond to
          your specification by email.
        </>
      )}

      {status.kind === "mailto" && (
        <>
          <b>Your specification is ready to send.</b> Your email application has
          opened with the details composed. If nothing opened, email{" "}
          <a className="link" href={`mailto:${COMPANY.emails.sales}`}>
            {COMPANY.emails.sales}
          </a>{" "}
          with the metal, purity, form and quantity you require.
        </>
      )}

      {status.kind === "error" && (
        <>
          <b>Your enquiry could not be submitted.</b> Please try again, or email{" "}
          <a className="link" href={`mailto:${COMPANY.emails.sales}`}>
            {COMPANY.emails.sales}
          </a>{" "}
          directly.
        </>
      )}
    </div>
  );
}
