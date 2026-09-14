import type { MetadataRoute } from "next";
import { COMPANY } from "@/data/company";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = COMPANY.meta.url;
  const lastModified = new Date();

  return [
    { url: base, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/metals`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/capabilities`, lastModified, changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/about`, lastModified, changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/contact`, lastModified, changeFrequency: "yearly", priority: 0.8 },
  ];
}
