"use client"

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import en from "../locales/en.json";
import de from "../locales/de.json";
import CaseStudiesPage from "./case-studies/page";
import ContactPage from "./contact/page";

type Translations = typeof en;

const translations: Record<"en" | "de", Translations> = { en, de };

export default function Home() {
  const [activeSection, setActiveSection] = useState("profile");
  const [language, setLanguage] = useState<"en" | "de">("en");
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateViewport = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };
    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  const t = translations[language];

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return <div className={styles.profile}>{t.profile.content}</div>;
      case "casestudies":
        return <CaseStudiesPage />;
      case "cv":
        return <div className={styles.cvSection}>CV content goes here.</div>;
      case "contact":
        return <ContactPage />;
      default:
        return null;
    }
  };

  const isCompact = activeSection === "cv";

  return (
    <main className={styles.main}>
      <section className={styles.page}>
        <div className={`${styles.headerContainer} ${isCompact ? styles.headerCompact : ""}`}>
          <div className={styles.header}>
            <h1 className={`${styles.title} ${isCompact ? styles.titleCompact : ""}`}>
              SHOKRI FRANCIS<br className={`${styles.titleBreak} ${isCompact ? styles.titleBreakHidden : ""}`} /> RAOOF
            </h1>
            <h3 className={`${styles.subtitle} ${isCompact ? styles.subtitleCompact : ""}`}>TECHNICAL PRODUCT OWNER</h3>
          </div>
          <div className={styles.avatar}></div>
        </div>
      </section>

      <nav className={`${styles.nav} ${isCompact ? styles.navCompact : ""}`}>
        <a
          href="#profile"
          className={`${styles.navItem} ${activeSection === "profile" ? styles.navItemActive : ""}`}
          onClick={() => setActiveSection("profile")}
        >
          PROFILE
        </a>
        <a
          href="#casestudies"
          className={`${styles.navItem} ${activeSection === "casestudies" ? styles.navItemActive : ""}`}
          onClick={() => setActiveSection("casestudies")}
        >
          CASE STUDIES
        </a>
        <a
          href="#cv"
          className={`${styles.navItem} ${activeSection === "cv" ? styles.navItemActive : ""}`}
          onClick={() => setActiveSection("cv")}
        >
          CV
        </a>
        <a
          href="#contact"
          className={`${styles.navItem} ${activeSection === "contact" ? styles.navItemActive : ""}`}
          onClick={() => setActiveSection("contact")}
        >
          CONTACT
        </a>
      </nav>

      <section className={styles.content}>{renderContent()}</section>

      <div className={styles.viewportDebug}>
        {viewport.width} x {viewport.height}
      </div>
    </main>
  );
}
