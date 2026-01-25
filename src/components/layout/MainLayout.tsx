"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import posthog from "posthog-js";
import styles from "./MainLayout.module.css";

interface MainLayoutProps {
  children: React.ReactNode;
}

const ROUTES = [
  { href: "/", label: "PROFILE", shortLabel: "PROFILE" },
  { href: "/case-studies", label: "CASE STUDIES", shortLabel: "CASES" },
  { href: "/cv", label: "CV", shortLabel: "CV" },
  { href: "/my-work", label: "MY WORK", shortLabel: "WORK" },
  { href: "/contact", label: "CONTACT", shortLabel: "CONTACT" },
];

export default function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();
  const [showRecruiterModal, setShowRecruiterModal] = useState(false);

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
            <h2 className={styles.modalTitle}>Recruiter mode activated.</h2>
            <div>
              <p className={styles.modalLabel}>TL;DR:</p>
              <ul className={styles.modalList}>
                <li>I ship</li>
                <li>I make decisions</li>
                <li>I work well with engineers</li>
                <li>I don&apos;t overbuild</li>
              </ul>
              <a
                href="mailto:shokrifrancis.r@gmail.com"
                className={styles.modalContactButton}
                onClick={handleRecruiterContactClick}
              >
                Contact me
              </a>
            </div>
          </div>
        </div>
      )}

      <section className={styles.page}>
        <div className={`${styles.headerContainer} ${isCompact ? styles.headerCompact : ""}`}>
          <div className={styles.header}>
            <h1 className={`${styles.title} ${isCompact ? styles.titleCompact : ""}`}>
              SHOKRI FRANCIS<br className={`${styles.titleBreak} ${isCompact ? styles.titleBreakHidden : ""}`} /> RAOOF
            </h1>
            <h3 className={`${styles.subtitle} ${isCompact ? styles.subtitleCompact : ""}`}>TECHNICAL PRODUCT OWNER / DEVELOPER</h3>
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
          Recruiter?
        </button>
      )}
    </main>
  );
}
