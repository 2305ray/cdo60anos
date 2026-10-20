import type { Metadata } from "next";
import { Barlow, Barlow_Condensed, Bebas_Neue } from "next/font/google";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocale, LOCALE_LABELS, LOCALES } from "@/i18n/config";
import "../globals.css";

const bebas = Bebas_Neue({ variable: "--font-bebas", weight: "400", subsets: ["latin"] });
const barlow = Barlow({
  variable: "--font-barlow",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});
const condensed = Barlow_Condensed({
  variable: "--font-condensed",
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta } = getDictionary(lang);
  return {
    title: meta.title,
    description: meta.description,
    icons: { icon: "/favicon.ico" },
    alternates: {
      canonical: `/${lang}`,
      languages: Object.fromEntries(LOCALES.map((l) => [LOCALE_LABELS[l].htmlLang, `/${l}`])),
    },
    openGraph: {
      title: meta.title,
      description: meta.ogDescription,
      images: ["/hero.jpg"],
      locale: LOCALE_LABELS[lang].og,
      type: "website",
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html
      lang={LOCALE_LABELS[lang].htmlLang}
      className={`${bebas.variable} ${barlow.variable} ${condensed.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
