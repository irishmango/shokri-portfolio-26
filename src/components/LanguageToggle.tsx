"use client";

import { useLanguage } from "@/context/LanguageContext";
import posthog from "posthog-js";
import styles from "./LanguageToggle.module.css";

export function LanguageToggle() {
  const { locale, setLocale } = useLanguage();

  const handleToggle = () => {
    const newLocale = locale === "en" ? "de" : "en";
    setLocale(newLocale);
    posthog.capture("language_changed", {
      from_locale: locale,
      to_locale: newLocale,
    });
  };

  return (
    <button
      onClick={handleToggle}
      className={styles.toggle}
      aria-label={`Switch to ${locale === "en" ? "German" : "English"}`}
    >
      {locale === "en" ? "DE" : "EN"}
    </button>
  );
}
