"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import posthog from "posthog-js";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageToggle } from "@/components/LanguageToggle";
import styles from "./MainLayout.module.css";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();
  const [showRecruiterModal, setShowRecruiterModal] = useState(false);
  const { t } = useLanguage();

  const ROUTES = [
    { href: "/", label: t.common.nav.profile, shortLabel: t.common.nav.profileShort },
    { href: "/case-studies", label: t.common.nav.caseStudies, shortLabel: t.common.nav.caseStudiesShort },
    { href: "/cv", label: t.common.nav.cv, shortLabel: t.common.nav.cvShort },
    { href: "/my-work", label: t.common.nav.myWork, shortLabel: t.common.nav.myWorkShort },
    { href: "/contact", label: t.common.nav.contact, shortLabel: t.common.nav.contactShort },
  ];

  const isActiveRoute = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const isCompact = pathname !== "/";
  const isProfilePage = pathname === "/";

  const handleSecretButton = () => {
    posthog.capture("recruiter_modal_opened", {
      source_page: pathname,
    });
    setShowRecruiterModal(true);
  };

  const handleRecruiterContactClick = () => {
    posthog.capture("recruiter_contact_clicked", {
      destination_url: "mailto:shokrifrancis.r@gmail.com",
    });
  };

  const handleNavClick = (route: { href: string; label: string }) => {
    posthog.capture("nav_clicked", {
      from_page: pathname,
      to_page: route.href,
      nav_label: route.label,
    });
  };

  return (
    <main className={styles.main}>
      {/* Recruiter Easter Egg Modal */}
      {showRecruiterModal && (
        <div className={styles.modalOverlay} onClick={() => setShowRecruiterModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.modalClose}
              onClick={() => setShowRecruiterModal(false)}
              aria-label="Close modal"
            >
              ×
            </button>
            <h2 className={styles.modalTitle}>{t.common.recruiterModal.title}</h2>
            <div>
              <p className={styles.modalLabel}>{t.common.recruiterModal.tldr}</p>
              <ul className={styles.modalList}>
                {t.common.recruiterModal.bullets.map((bullet, index) => (
                  <li key={index}>{bullet}</li>
                ))}
              </ul>
              <a
                href="mailto:shokrifrancis.r@gmail.com"
                className={styles.modalContactButton}
                onClick={handleRecruiterContactClick}
              >
                {t.common.recruiterModal.contactButton}
              </a>
            </div>
          </div>
        </div>
      )}

      <section className={styles.page}>
        <div className={`${styles.headerContainer} ${isCompact ? styles.headerCompact : ""}`}>
          <LanguageToggle />
          <div className={styles.header}>
            <h1 className={`${styles.title} ${isCompact ? styles.titleCompact : ""}`}>
              SHOKRI FRANCIS<br className={`${styles.titleBreak} ${isCompact ? styles.titleBreakHidden : ""}`} /> RAOOF
            </h1>
            <h3 className={`${styles.subtitle} ${isCompact ? styles.subtitleCompact : ""}`}>Technical Product Owner / Software Developer</h3>
          </div>
          <div className={styles.avatar}></div>
        </div>
      </section>

      <nav className={`${styles.nav} ${isCompact ? styles.navCompact : ""}`}>
        {ROUTES.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={`${styles.navItem} ${isActiveRoute(route.href) ? styles.navItemActive : ""}`}
            onClick={() => handleNavClick(route)}
          >
            <span className={styles.navLabelFull}>{route.label}</span>
            <span className={styles.navLabelShort}>{route.shortLabel}</span>
          </Link>
        ))}
      </nav>

      <section className={styles.content}>{children}</section>

      {isProfilePage && (
        <button className={styles.secretButton} onClick={handleSecretButton}>
          {t.common.recruiterButton}
        </button>
      )}
    </main>
  );
}
