"use client";

import { useLanguage } from "@/context/LanguageContext";
import styles from "./page.module.css";

export default function Home() {
  const { t } = useLanguage();
  return <div className={styles.profile}>{t.profile.content}</div>;
}
