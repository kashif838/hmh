import { setRequestLocale } from "next-intl/server";
import { Shell } from "@/components/Shell";
import { Legal } from "@/components/Legal";
import { company } from "@/content/company";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/privacy-policy">) {
  const { locale } = await params;
  return pageMeta({ title: "Privacy Policy", description: "How HMH General Trading handles information submitted through this website.", path: "/privacy-policy", locale });
}

export default async function PrivacyPage({ params }: PageProps<"/[locale]/privacy-policy">) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <Shell>
      <Legal name="Privacy Policy" path="/privacy-policy" sections={[
        ["Who we are", `This website is operated by ${company.legalName}, ${company.city}, ${company.country}. Questions about this policy can be sent to ${company.email}.`],
        ["What we collect", "When you send an enquiry we receive the details you enter: your name, company, email address, optional phone number, and the details of your request. We do not ask for payment details and there are no user accounts."],
        ["How we use it", "Enquiry details are used only to respond to your request, prepare quotations and continue the business conversation you started. We do not sell or rent your information."],
        ["Analytics", "If analytics are enabled, we use Google Analytics to understand how the site is used in aggregate, such as which pages are visited and whether enquiries are sent."],
        ["Spam protection", "Forms may use Cloudflare Turnstile to tell people and automated scripts apart. Turnstile processes technical signals from your browser for that purpose only."],
        ["Your choices", `You can ask us to access, correct or delete the enquiry information we hold about you by writing to ${company.email}.`],
      ]} />
    </Shell>
  );
}
