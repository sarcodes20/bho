import { METALS } from "@/data/metals";
import { COMPANY } from "@/data/company";

/**
 * Dispatched when a visitor taps "Enquire about X" in the metal explorer, so
 * the form can pre-select that metal. A DOM event rather than shared state:
 * the two components never need to know about each other, and the form stays
 * a properly controlled React component.
 */
export const PREFILL_METAL_EVENT = "bh:prefill-metal";

export interface Enquiry {
  metal: string;
  purity: string;
  form: string;
  quantity: string;
  application: string;
  company: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
}

export const EMPTY_ENQUIRY: Enquiry = {
  metal: "",
  purity: "",
  form: "",
  quantity: "",
  application: "",
  company: "",
  name: "",
  email: "",
  phone: "",
  notes: "",
};

export const REQUIRED_FIELDS = [
  "metal",
  "purity",
  "form",
  "quantity",
  "company",
  "name",
  "email",
] as const;

export type RequiredField = (typeof REQUIRED_FIELDS)[number];

export const FIELD_MESSAGES: Record<RequiredField, string> = {
  metal: "Select a metal",
  purity: "Enter the purity required",
  form: "Select a form",
  quantity: "Enter the quantity required",
  company: "Enter your company name",
  name: "Enter your name",
  email: "Enter a valid email address",
};

export const METAL_OPTIONS = [...METALS.map((m) => m.name), "Other"];
export const FORM_OPTIONS = [...COMPANY.enquiry.forms];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Shared by the browser and the API route, so a field can never be accepted on
 * the server that the form would have rejected (or the reverse).
 */
export function validateEnquiry(values: Partial<Enquiry>): Partial<Record<RequiredField, string>> {
  const errors: Partial<Record<RequiredField, string>> = {};

  for (const field of REQUIRED_FIELDS) {
    const value = (values[field] ?? "").trim();
    if (!value) {
      errors[field] = FIELD_MESSAGES[field];
      continue;
    }
    if (field === "email" && !EMAIL_RE.test(value)) {
      errors[field] = FIELD_MESSAGES.email;
    }
  }

  return errors;
}

/** Human-readable specification, used for the email subject and body. */
export function formatEnquiry(v: Enquiry) {
  const subject = `Enquiry — ${v.metal} · ${v.purity} · ${v.form} · ${v.quantity}`;

  const body = [
    `Metal: ${v.metal}`,
    `Purity: ${v.purity}`,
    `Form: ${v.form}`,
    `Quantity: ${v.quantity}`,
    v.application ? `Application: ${v.application}` : "",
    "",
    `Company: ${v.company}`,
    `Name: ${v.name}`,
    `Email: ${v.email}`,
    v.phone ? `Phone: ${v.phone}` : "",
    v.notes ? `\nFurther detail:\n${v.notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return { subject, body };
}

/** mailto: fallback used when no mail transport is configured. */
export function mailtoHref(v: Enquiry) {
  const { subject, body } = formatEnquiry(v);
  return `mailto:${COMPANY.emails.sales}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}
