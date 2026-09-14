import type { MetadataRoute } from "next";
import { COMPANY } from "@/data/company";

/**
 * Set NEXT_PUBLIC_NOINDEX=1 on any deployment that is not the real launch —
 * a client demo, a staging URL, a preview link. A site carrying the company's
 * name should not be indexable before it is live, and de-indexing after the
 * fact is far slower than never being indexed.
 */
export const NOINDEX = process.env.NEXT_PUBLIC_NOINDEX === "1";

export default function robots(): MetadataRoute.Robots {
  if (NOINDEX) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: `${COMPANY.meta.url}/sitemap.xml`,
  };
}
