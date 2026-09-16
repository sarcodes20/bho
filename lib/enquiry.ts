import { COMPANY } from "@/data/company";

export interface Enquiry {
  name: string;
  company: string;
  phone: string;
  email: string;
  message: string;
}

export const EMPTY_ENQUIRY: Enquiry = {
  name: "",
  company: "",
  phone: "",
  email: "",
  message: "",
};

/** All five fields are required — the form has nothing optional left. */
export const REQUIRED_FIELDS = [
  "name",
  "company",
  "phone",
  "email",
  "message",
] as const;

export type RequiredField = (typeof REQUIRED_FIELDS)[number];

export const FIELD_MESSAGES: Record<RequiredField, string> = {
  name: "Enter your name",
  company: "Enter your company name",
  phone: "Enter a valid phone number",
  email: "Enter a valid email address",
  message: "Enter your message",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Deliberately permissive: international numbers vary far too much to pattern
 * match strictly, so this only requires 7–15 digits once punctuation, spaces
 * and a leading + are discounted.
 */
const PHONE_RE = /^\+?[\d\s().-]{7,}$/;
const PHONE_DIGITS = /\d/g;

/**
 * Shared by the browser and the API route, so a field can never be accepted on
 * the server that the form would have rejected (or the reverse).
 */
export function validateEnquiry(
  values: Partial<Enquiry>
): Partial<Record<RequiredField, string>> {
  const errors: Partial<Record<RequiredField, string>> = {};

  for (const field of REQUIRED_FIELDS) {
    const value = (values[field] ?? "").trim();

    if (!value) {
      errors[field] = FIELD_MESSAGES[field];
      continue;
    }
    if (field === "email" && !EMAIL_RE.test(value)) {
      errors.email = FIELD_MESSAGES.email;
    }
    if (field === "phone") {
      const digits = value.match(PHONE_DIGITS)?.length ?? 0;
      if (!PHONE_RE.test(value) || digits < 7 || digits > 15) {
        errors.phone = FIELD_MESSAGES.phone;
      }
    }
    if (field === "message" && value.length < 10) {
      errors.message = "Enter a little more detail";
    }
  }

  return errors;
}

/** Human-readable enquiry, used for the email subject and body. */
export function formatEnquiry(v: Enquiry) {
  const subject = `Enquiry — ${v.company} (${v.name})`;

  const body = [
    `Name: ${v.name}`,
    `Company: ${v.company}`,
    `Phone: ${v.phone}`,
    `Email: ${v.email}`,
    "",
    "Message:",
    v.message,
  ].join("\n");

  return { subject, body };
}

/** mailto: fallback used when no mail transport is configured. */
export function mailtoHref(v: Enquiry) {
  const { subject, body } = formatEnquiry(v);
  return `mailto:${COMPANY.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}
