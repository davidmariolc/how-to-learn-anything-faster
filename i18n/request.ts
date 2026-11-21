import { notFound } from "next/navigation";
import { locale as getLocale } from "next/root-params";
import { hasLocale } from "next-intl";
import english from "@/messages/en.json";
import spanish from "@/messages/es.json";
import { locales } from "./locales";
import type { GetRequestConfigParams } from "next-intl/server";

const messages = { en: english, es: spanish };

export default async function getRequestConfig({
  locale: localeOverride,
}: GetRequestConfigParams) {
  const locale = localeOverride ?? (await getLocale());

  if (!hasLocale(locales, locale)) {
    notFound();
  }

  return { locale, messages: messages[locale] };
}
