"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

  const isActiveRoute = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const isCompact = pathname !== "/";

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
        {ROUTES.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={`${styles.navItem} ${isActiveRoute(route.href) ? styles.navItemActive : ""}`}
          >
            <span className={styles.navLabelFull}>{route.label}</span>
            <span className={styles.navLabelShort}>{route.shortLabel}</span>
          </Link>
        ))}
      </nav>

      <section className={styles.content}>{children}</section>
    </main>
  );
}
