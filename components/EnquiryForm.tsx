"use client";

import { useRef, useState } from "react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";
import { COMPANY } from "@/data/company";
import {
  EMPTY_ENQUIRY,
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

/** One cell of the enquiry grid. */
function Field({
  id,
  label,
  children,
  error,
  span,
}: {
  id: string;
  label: string;
  children: ReactNode;
  error?: string;
  span?: boolean;
}) {
  return (
    <div className={`field${span ? " field--span2" : ""}${error ? " has-error" : ""}`}>
      <label className="field__label" htmlFor={id}>
        {label}{" "}
        <span className="field__req" aria-hidden="true">
          *
        </span>
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

  const set = (key: keyof Enquiry) => (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setValues((v) => {
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
    formRef.current?.querySelector<HTMLElement>(`#f-${first}`)?.focus();
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
      </div>

      <form className="enquiry__form" ref={formRef} onSubmit={onSubmit} noValidate>
        <div className="field-grid">
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

          <Field id="f-phone" label="Phone number" error={errors.phone}>
            <input
              className="field__control"
              id="f-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="Include country code"
              value={values.phone}
              onChange={set("phone")}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={describedBy("phone")}
            />
          </Field>

          <Field id="f-email" label="Email" error={errors.email}>
            <input
              className="field__control"
              id="f-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="name@company.com"
              value={values.email}
              onChange={set("email")}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={describedBy("email")}
            />
          </Field>

          <Field id="f-message" label="Message" error={errors.message} span>
            <textarea
              className="field__control"
              id="f-message"
              name="message"
              rows={5}
              placeholder="Tell us the metal, purity, form and quantity you require, and anything else relevant."
              value={values.message}
              onChange={set("message")}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={describedBy("message")}
            />
          </Field>
        </div>

        <div className="enquiry__foot">
          <p className="enquiry__note">{COMPANY.enquiry.note}</p>
          <button
            className={`btn btn--accent${busy ? " is-busy" : ""}`}
            type="submit"
            disabled={busy}
          >
            <span className="btn__spinner" aria-hidden="true" />
            <span className="btn__text">{busy ? "Submitting" : "Submit enquiry"}</span>
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
          <b>Thank you — your enquiry has been received.</b> We will respond by
          email.
        </>
      )}

      {status.kind === "mailto" && (
        <>
          <b>Your enquiry is ready to send.</b> Your email application has opened
          with the details composed. If nothing opened, email{" "}
          <a className="link" href={`mailto:${COMPANY.email}`}>
            {COMPANY.email}
          </a>{" "}
          directly.
        </>
      )}

      {status.kind === "error" && (
        <>
          <b>Your enquiry could not be submitted.</b> Please try again, or email{" "}
          <a className="link" href={`mailto:${COMPANY.email}`}>
            {COMPANY.email}
          </a>{" "}
          directly.
        </>
      )}
    </div>
  );
}
