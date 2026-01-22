"use client"

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import en from "../locales/en.json";
import de from "../locales/de.json";
import CaseStudiesPage from "./case-studies/page";
import ContactPage from "./contact/page";
import CVPage from "./cv/page";
import MyWork from "./my-work/page";

type Translations = typeof en;

const translations: Record<"en" | "de", Translations> = { en, de };

export default function Home() {
  const [activeSection, setActiveSection] = useState("profile");
  const [language, setLanguage] = useState<"en" | "de">("en");
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<string | null>(null);

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
        return (
          <CaseStudiesPage
            selectedStudy={selectedCaseStudy}
            onStudySelect={setSelectedCaseStudy}
          />
        );
      case "My Work":
        return <MyWork />;
      case "cv":
        return <CVPage />;
      case "contact":
        return <ContactPage />;
      default:
        return null;
    }
  };

  const isCompact = activeSection === "cv" || selectedCaseStudy !== null;

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
          onClick={() => { setActiveSection("profile"); setSelectedCaseStudy(null); }}
        >
          <span className={styles.navLabelFull}>PROFILE</span>
          <span className={styles.navLabelShort}>PROFILE</span>
        </a>
        <a
          href="#casestudies"
          className={`${styles.navItem} ${activeSection === "casestudies" ? styles.navItemActive : ""}`}
          onClick={() => { setActiveSection("casestudies"); setSelectedCaseStudy(null); }}
        >
          <span className={styles.navLabelFull}>CASE STUDIES</span>
          <span className={styles.navLabelShort}>CASES</span>
        </a>
        <a
          href="#cv"
          className={`${styles.navItem} ${activeSection === "cv" ? styles.navItemActive : ""}`}
          onClick={() => { setActiveSection("cv"); setSelectedCaseStudy(null); }}
        >
          <span className={styles.navLabelFull}>CV</span>
          <span className={styles.navLabelShort}>CV</span>
        </a>
        <a
          href="#mywork"
          className={`${styles.navItem} ${activeSection === "mywork" ? styles.navItemActive : ""}`}
          onClick={() => { setActiveSection("mywork"); setSelectedCaseStudy(null); }}
        >
          <span className={styles.navLabelFull}>MY WORK</span>
          <span className={styles.navLabelShort}>WORK</span>
        </a>
        <a
          href="#contact"
          className={`${styles.navItem} ${activeSection === "contact" ? styles.navItemActive : ""}`}
          onClick={() => { setActiveSection("contact"); setSelectedCaseStudy(null); }}
        >
          <span className={styles.navLabelFull}>CONTACT</span>
          <span className={styles.navLabelShort}>CONTACT</span>
        </a>
      </nav>

      <section className={styles.content}>{renderContent()}</section>

      <div className={styles.viewportDebug}>
        {viewport.width} x {viewport.height}
      </div>
    </main>
  );
}
