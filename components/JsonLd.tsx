import { company } from "@/content/company";

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is escaped against a closing </script> sequence.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.legalName,
  url: company.url,
  email: company.email,
  telephone: company.phone,
  address: { "@type": "PostalAddress", addressLocality: company.city, addressCountry: "AE" },
  brand: [{ "@type": "Brand", name: "Boon" }, { "@type": "Brand", name: "Abu Koora" }],
};

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${company.url}${it.path}`,
    })),
  };
}
