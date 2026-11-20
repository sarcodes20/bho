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
 * Sends the enquiry through Resend (resend.com). The message goes to the
 * company inbox with Reply-To set to the visitor, so hitting Reply in Outlook
 * answers the customer directly.
 *
 * RESEND_API_KEY  required — enables delivery
 * ENQUIRY_FROM    optional — sender, must be on a domain verified in Resend
 *                 (default: "BH Overseas Website <website@bhoverseas.com>")
 * ENQUIRY_TO      optional — recipient (default: the company address)
 */
async function sendWithResend(
  apiKey: string,
  values: Enquiry,
  subject: string,
  body: string
): Promise<boolean> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from:
        process.env.ENQUIRY_FROM ??
        "BH Overseas Website <website@bhoverseas.com>",
      to: [process.env.ENQUIRY_TO ?? COMPANY.email],
      reply_to: values.email,
      subject,
      text: body,
    }),
  });
  if (!res.ok) {
    console.error("Resend rejected the enquiry:", res.status, await res.text());
    return false;
  }
  return true;
}

/** Legacy path: any JSON endpoint (Zapier/Make hook, own SMTP relay). */
async function sendWithWebhook(
  url: string,
  values: Enquiry,
  subject: string,
  body: string
): Promise<boolean> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      to: COMPANY.email,
      replyTo: values.email,
      subject,
      text: body,
      enquiry: values,
    }),
  });
  return res.ok;
}

/**
 * Receives an enquiry and emails it to the company.
 *
 * With neither RESEND_API_KEY nor ENQUIRY_WEBHOOK_URL set, the route still
 * validates and reports `delivered: false`, and the form falls back to opening
 * the visitor's mail client with the enquiry composed, so nothing is lost.
 * A failed send is reported the same way rather than as a success.
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
  const resendKey = process.env.RESEND_API_KEY;
  const webhook = process.env.ENQUIRY_WEBHOOK_URL;

  try {
    let delivered = false;
    if (resendKey) delivered = await sendWithResend(resendKey, values, subject, body);
    else if (webhook) delivered = await sendWithWebhook(webhook, values, subject, body);
    return NextResponse.json({ ok: true, delivered });
  } catch (error) {
    console.error("Enquiry delivery failed:", error);
    return NextResponse.json({ ok: true, delivered: false });
  }
}
