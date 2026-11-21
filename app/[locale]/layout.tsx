import { Geist } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { locales } from "@/i18n/locales";
import type { Metadata } from "next";
import "../globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const generateStaticParams = () => locales.map((locale) => ({ locale }));

export const generateMetadata = async ({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> => {
  const { locale } = await params;
  if (!hasLocale(locales, locale)) {
    notFound();
  }

  const translate = await getTranslations({ locale, namespace: "metadata" });
  return {
    description: translate("description"),
    title: translate("title"),
  };
};

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} className={geist.variable}>
      <body>{children}</body>
    </html>
  );
}
