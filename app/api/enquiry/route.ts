import { NextResponse } from "next/server";
import { COMPANY } from "@/data/company";
import {
  EMPTY_ENQUIRY,
  formatEnquiry,
  validateEnquiry,
  type Enquiry,
} from "@/lib/enquiry";

export const runtime = "nodejs";

/** Trim and cap every field before it goes anywhere near a mail body. */
function sanitise(input: Record<string, unknown>): Enquiry {
  const out = { ...EMPTY_ENQUIRY };
  (Object.keys(out) as (keyof Enquiry)[]).forEach((key) => {
    const raw = input[key];
    out[key] = typeof raw === "string" ? raw.trim().slice(0, 2000) : "";
  });
  return out;
}

/**
 * Receives a specification enquiry.
 *
 * Delivery is intentionally not wired to a provider: no mail credentials were
 * supplied with the brief, and guessing one would mean enquiries silently
 * failing in production. Until `ENQUIRY_WEBHOOK_URL` is set the route validates
 * and reports `delivered: false`, and the form falls back to opening the
 * visitor's mail client with the specification already composed — so an
 * enquiry is never lost.
 *
 * To deliver server-side, set ENQUIRY_WEBHOOK_URL to any endpoint that accepts
 * JSON (Resend, Postmark, a Zapier/Make hook, or your own SMTP service).
 */
export async function POST(request: Request) {
  let payload: Record<string, unknown>;

  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Malformed request." },
      { status: 400 }
    );
  }

  const values = sanitise(payload);
  const errors = validateEnquiry(values);

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const { subject, body } = formatEnquiry(values);
  const webhook = process.env.ENQUIRY_WEBHOOK_URL;

  if (!webhook) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: COMPANY.emails.sales,
        replyTo: values.email,
        subject,
        text: body,
        enquiry: values,
      }),
    });

    if (!res.ok) throw new Error(`Upstream responded ${res.status}`);
    return NextResponse.json({ ok: true, delivered: true });
  } catch (error) {
    console.error("Enquiry delivery failed:", error);
    // Reported as undelivered rather than as a success, so the form can fall
    // back to the mail client instead of telling the visitor it was sent.
    return NextResponse.json({ ok: true, delivered: false });
  }
}
